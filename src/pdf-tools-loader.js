let pdfLibraryPromise;

window.createImagePdf = async (files, onProgress = () => {}) => {
  const { PDFDocument } = await (pdfLibraryPromise ||= import('pdf-lib'));
  const document = await PDFDocument.create();
  const pageWidth = 612;
  const pageHeight = 792;
  const maxImageWidth = 540;
  const maxImageHeight = 720;

  for (const [index, file] of files.entries()) {
    const imageBytes = await file.arrayBuffer();
    const image = file.type === 'image/png'
      ? await document.embedPng(imageBytes)
      : await document.embedJpg(imageBytes);
    const dimensions = image.scale(1);
    const scale = Math.min(maxImageWidth / dimensions.width, maxImageHeight / dimensions.height, 1);
    const width = dimensions.width * scale;
    const height = dimensions.height * scale;
    const page = document.addPage([pageWidth, pageHeight]);

    page.drawImage(image, {
      x: (pageWidth - width) / 2,
      y: (pageHeight - height) / 2,
      width,
      height
    });
    onProgress(index + 1, files.length);
  }

  return new Blob([await document.save()], { type: 'application/pdf' });
};

window.dispatchEvent(new Event('pdf-tools-ready'));
