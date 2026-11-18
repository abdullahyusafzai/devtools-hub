import { parsePdfPageSelection } from './additional-tool-utils.js';

const React = window.React;
const h = React.createElement;

const inputClass = 'w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-200';
const buttonClass = 'rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50';
const MAX_FILE_SIZE = 30 * 1024 * 1024;
const MAX_TOTAL_SIZE = 80 * 1024 * 1024;
const MAX_FILES = 20;

function saveBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function FileLabel({ file }) {
  return h('div', { className: 'flex min-w-0 items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm' },
    h('span', { className: 'truncate text-gray-800' }, file.name),
    h('span', { className: 'shrink-0 text-xs text-gray-500' }, `${(file.size / 1024 / 1024).toFixed(1)} MB`));
}

export function PdfTool({ toolName }) {
  const [files, setFiles] = React.useState([]);
  const [pages, setPages] = React.useState('1');
  const [rotation, setRotation] = React.useState('90');
  const [watermark, setWatermark] = React.useState('CONFIDENTIAL');
  const [downloads, setDownloads] = React.useState([]);
  const [message, setMessage] = React.useState('');
  const [error, setError] = React.useState('');
  const [busy, setBusy] = React.useState(false);
  const isMerge = toolName === 'PDF Merger';
  const isMetadata = toolName === 'PDF Metadata Viewer';
  const needsSelection = ['PDF Splitter', 'PDF Page Extractor', 'PDF Page Remover', 'PDF Page Reorder'].includes(toolName);

  const selectFiles = (event) => {
    const selected = [...event.target.files];
    event.target.value = '';
    const combined = isMerge ? [...files, ...selected] : selected.slice(0, 1);
    const totalSize = combined.reduce((sum, file) => sum + file.size, 0);
    if (combined.length > MAX_FILES || combined.some((file) => file.size > MAX_FILE_SIZE) || totalSize > MAX_TOTAL_SIZE) {
      setError(`Choose up to ${MAX_FILES} PDFs, each no larger than 30 MB, with a combined size under 80 MB.`);
      return;
    }
    if (selected.some((file) => file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf'))) {
      setError('Only PDF files are accepted.');
      return;
    }
    setFiles(combined);
    setDownloads([]);
    setMessage('');
    setError('');
  };

  const process = async () => {
    if (!files.length) { setError(isMerge ? 'Choose at least two PDF files.' : 'Choose a PDF file first.'); return; }
    if (isMerge && files.length < 2) { setError('Choose at least two PDF files to merge.'); return; }
    setBusy(true);
    setError('');
    setMessage('');
    setDownloads([]);
    try {
      const { PDFDocument, StandardFonts, degrees, rgb } = await import('pdf-lib');
      if (isMerge) {
        const merged = await PDFDocument.create();
        for (const file of files) {
          const source = await PDFDocument.load(await file.arrayBuffer());
          const copied = await merged.copyPages(source, source.getPageIndices());
          copied.forEach((page) => merged.addPage(page));
        }
        setDownloads([{ filename: 'merged-document.pdf', blob: new Blob([await merged.save()], { type: 'application/pdf' }) }]);
        setMessage(`Merged ${files.length} PDFs into ${merged.getPageCount()} pages.`);
        return;
      }

      const source = await PDFDocument.load(await files[0].arrayBuffer());
      const pageCount = source.getPageCount();
      if (isMetadata) {
        const metadata = [
          `File: ${files[0].name}`,
          `Pages: ${pageCount}`,
          `Title: ${source.getTitle() || 'Not set'}`,
          `Author: ${source.getAuthor() || 'Not set'}`,
          `Subject: ${source.getSubject() || 'Not set'}`,
          `Creator: ${source.getCreator() || 'Not set'}`,
          `Producer: ${source.getProducer() || 'Not set'}`,
          `Creation date: ${source.getCreationDate()?.toISOString() || 'Not set'}`,
          `Modification date: ${source.getModificationDate()?.toISOString() || 'Not set'}`
        ].join('\n');
        setMessage(metadata);
        return;
      }

      let selectedPages = needsSelection ? parsePdfPageSelection(pages, pageCount) : source.getPageIndices();
      if (toolName === 'PDF Page Remover') {
        const removed = new Set(selectedPages);
        selectedPages = source.getPageIndices().filter((index) => !removed.has(index));
        if (!selectedPages.length) throw new Error('Removing those pages would leave an empty PDF.');
      }
      if (toolName === 'PDF Splitter') {
        const splitResults = [];
        for (const index of selectedPages) {
          const part = await PDFDocument.create();
          const [page] = await part.copyPages(source, [index]);
          part.addPage(page);
          splitResults.push({ filename: `page-${index + 1}.pdf`, blob: new Blob([await part.save()], { type: 'application/pdf' }) });
        }
        setDownloads(splitResults);
        setMessage(`Created ${splitResults.length} individual PDF page${splitResults.length === 1 ? '' : 's'}.`);
        return;
      }

      let outputDocument = source;
      if (toolName === 'PDF Page Extractor' || toolName === 'PDF Page Remover' || toolName === 'PDF Page Reorder') {
        if (toolName === 'PDF Page Reorder') {
          const order = pages.split(',').map((part) => Number(part.trim()) - 1);
          if (order.some((index) => !Number.isInteger(index) || index < 0 || index >= pageCount) || new Set(order).size !== pageCount || order.length !== pageCount) {
            throw new Error(`Enter every page exactly once, from 1 to ${pageCount}, in the desired order.`);
          }
          selectedPages = order;
        }
        outputDocument = await PDFDocument.create();
        const copied = await outputDocument.copyPages(source, selectedPages);
        copied.forEach((page) => outputDocument.addPage(page));
      }
      if (toolName === 'PDF Page Rotator') {
        const amount = Number(rotation);
        if (![90, 180, 270].includes(amount)) throw new Error('Choose a rotation of 90, 180, or 270 degrees.');
        for (const page of outputDocument.getPages()) page.setRotation(degrees((page.getRotation().angle + amount) % 360));
      }
      if (toolName === 'PDF Watermark') {
        if (!watermark.trim() || watermark.length > 80) throw new Error('Enter watermark text (up to 80 characters).');
        const font = await outputDocument.embedFont(StandardFonts.HelveticaBold);
        for (const page of outputDocument.getPages()) {
          const { width, height } = page.getSize();
          const fontSize = Math.min(36, Math.max(18, width / Math.max(12, watermark.length)));
          page.drawText(watermark, { x: Math.max(24, (width - font.widthOfTextAtSize(watermark, fontSize)) / 2), y: height / 2, size: fontSize, font, color: rgb(0.45, 0.45, 0.55), opacity: 0.32, rotate: degrees(-30) });
        }
      }
      const result = new Blob([await outputDocument.save()], { type: 'application/pdf' });
      const filename = `${toolName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.pdf`;
      setDownloads([{ filename, blob: result }]);
      setMessage(`Processed successfully. Output: ${(result.size / 1024).toFixed(0)} KB.`);
    } catch (processingError) {
      setError(processingError?.message?.includes('encrypted') ? 'This PDF is encrypted. Password-protected files are not supported by this tool.' : processingError.message || 'Could not process this PDF.');
    } finally {
      setBusy(false);
    }
  };

  return h('section', { className: 'max-w-3xl' },
    h('div', { className: 'mb-6' },
      h('h1', { className: 'mb-2 text-2xl font-bold tracking-tight text-gray-900' }, toolName),
      h('p', { className: 'max-w-2xl text-sm leading-6 text-gray-500' }, `${toolName} runs locally in your browser using pdf-lib. Files are not uploaded. Encrypted PDFs are not supported.`)),
    h('label', { className: 'block space-y-2' },
      h('span', { className: 'text-sm font-semibold text-gray-800' }, isMerge ? 'Choose PDF files (up to 20)' : 'Choose a PDF file'),
      h('input', { type: 'file', accept: 'application/pdf,.pdf', multiple: isMerge, onChange: selectFiles, className: `${inputClass} file:mr-3 file:rounded-lg file:border-0 file:bg-violet-50 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-violet-700` })),
    files.length > 0 && h('div', { className: 'mt-3 grid gap-2' }, files.map((file, index) => h(FileLabel, { key: `${file.name}-${index}`, file }))),
    needsSelection && h('label', { className: 'mt-4 block space-y-2' }, h('span', { className: 'text-sm font-semibold text-gray-800' }, toolName === 'PDF Page Reorder' ? 'New page order (comma-separated)' : toolName === 'PDF Page Remover' ? 'Pages to remove' : 'Pages to include'), h('input', { value: pages, onChange: (event) => setPages(event.target.value), placeholder: 'Example: 1,3-5', className: inputClass, 'aria-describedby': 'pdf-page-help' }), h('span', { id: 'pdf-page-help', className: 'block text-xs text-gray-500' }, toolName === 'PDF Page Reorder' ? 'List every page once, in the desired order. Example: 3,1,2.' : 'Use page numbers and ranges, for example 1,3-5.')),
    toolName === 'PDF Page Rotator' && h('label', { className: 'mt-4 block space-y-2' }, h('span', { className: 'text-sm font-semibold text-gray-800' }, 'Rotation'), h('select', { value: rotation, onChange: (event) => setRotation(event.target.value), className: inputClass }, h('option', { value: '90' }, '90° clockwise'), h('option', { value: '180' }, '180°'), h('option', { value: '270' }, '270° clockwise'))),
    toolName === 'PDF Watermark' && h('label', { className: 'mt-4 block space-y-2' }, h('span', { className: 'text-sm font-semibold text-gray-800' }, 'Watermark text'), h('input', { value: watermark, maxLength: 80, onChange: (event) => setWatermark(event.target.value), className: inputClass })),
    h('div', { className: 'mt-4 flex flex-wrap gap-2' }, h('button', { type: 'button', className: buttonClass, onClick: process, disabled: busy || !files.length }, busy ? 'Processing locally…' : isMetadata ? 'Read metadata' : 'Process PDF'), h('button', { type: 'button', className: 'rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:border-violet-300', onClick: () => { setFiles([]); setDownloads([]); setMessage(''); setError(''); }, disabled: busy }, 'Reset')),
    error && h('p', { className: 'mt-3 text-sm text-red-700', role: 'alert' }, error),
    message && h('pre', { className: 'safe-wrap mt-4 whitespace-pre-wrap rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-emerald-900', role: 'status', 'aria-live': 'polite' }, message),
    downloads.length > 0 && h('div', { className: 'mt-3 flex flex-wrap gap-2' }, downloads.map((item) => h('button', { type: 'button', key: item.filename, className: buttonClass, onClick: () => saveBlob(item.blob, item.filename) }, `Download ${item.filename}`)))
  );
}
