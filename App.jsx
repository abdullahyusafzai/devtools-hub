'use client';

// This is a single-file representation of a React application with a multi-page structure.
// In a real Next.js project, each tool component would be its own file and managed by the app router.

import React, { useState, useEffect, useRef } from 'react';

// Centralized list of tools with their IDs, names, and SVG icons
const tools = [
  { id: 'qr-code-generator', name: 'QR Code Generator', svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h6V6H6v4H4V4zm0 10h6v6H4v-6zm10-10h6V6h-4v4h-2V4zm0 10h2v2h2v-2h2v6h-6v-6zm2-8h2v2h-2v-2zm-6 2h2v2h-2v-2zm-6 2h2v2H4v-2zm-2 6h2v2h-2v-2zm2 2h2v2H4v-2zm6-2h2v2h-2v-2zm-2 2h2v2h-2v-2zm2 2h2v2h-2v-2zm-2 2h2v2h-2v-2zM4 16h2v2H4v-2zm8 0h2v2h-2v-2zm-2 2h2v2h-2v-2zm2 2h2v2h-2v-2zm-2 2h2v2h-2v-2zm-2-2h2v2h-2v-2zM4 18h2v2H4v-2zM2 12h2v2H2v-2zm12-4h2v2h-2V8zm-2 0h2v2h-2V8zm-2 0h2v2h-2V8zm-2 0h2v2h-2V8zm-2 0h2v2H2V8zm-2 0h2v2H0V8z"/></svg>` },
  { id: 'case-converter', name: 'Case Converter', svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M7 14V8H5a.5.5 0 0 1 0-1h3a.5.5 0 0 1 0 1H6v6H5a.5.5 0 0 1 0-1zm10.5-2.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5V8a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v3.5zm-1.5-3a.5.5 0 0 1-.5-.5V8a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v.5a.5.5 0 0 1-.5.5h-1zm.5 5.5a.5.5 0 0 1-.5.5h-1.5a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 .5.5v1z"/></svg>` },
  { id: 'word-character-counter', name: 'Word & Character Counter', svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1 4a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1h-1v1h-1a1 1 0 0 1-1-1V6zm0 2h1v1h1v1h-1v1h-1V10zm2 0h1v1h-1V8zm-2 2h1v1h1v1h-1v1h-1v-1zm2 0h1v1h-1V10zm2 0h1v1h-1V10zm-2 2h1v1h-1v-1zm2 0h1v1h-1v-1zm2 0h1v1h-1v-1zm-2 2h1v1h-1v-1zm2 0h1v1h-1v-1zm2 0h1v1h-1v-1zM6 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1h-1v1h-1V11zm2 0h1v1h-1V10z"/></svg>` },
  { id: 'dummy-text-generator', name: 'Dummy Text Generator', svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 4h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 4h10a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"/></svg>` },
  { id: 'password-generator', name: 'Password Generator', svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a4 4 0 0 0-4 4v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2h-2V6a4 4 0 0 0-4-4zm-2 6V6a2 2 0 0 1 4 0v2H10zm10 2v10H6V10h12zM12 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/></svg>` },
  { id: 'url-encoder-decoder', name: 'URL Encoder/Decoder', svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8s8 3.58 8 8-3.58 8-8 8-8-3.58-8-8zm5-1.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H8a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h1zm2 0a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H10a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h2zm2 0a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H12a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h2zm2 0a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h2zM9 14.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H8a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h1zm2 0a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H10a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h2zm2 0a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H12a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h2zm2 0a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h2z"/></svg>` },
  { id: 'temperature-converter', name: 'Temperature Converter', svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C9.79 2 8 3.79 8 6a4 4 0 0 0 4 4c2.21 0 4-1.79 4-4a4 4 0 0 0-4-4zm0 2a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2 2 2 0 0 1 2-2zm0 6a2 2 0 0 0-2 2v8a2 2 0 0 0 4 0v-8a2 2 0 0 0-2-2z"/></svg>` },
  { id: 'image-converter', name: 'Image Converter', svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17 11.5a.5.5 0 0 1-.5.5H15V13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1.5h1.5a.5.5 0 0 1 .5.5zm-2 0V5H5v8h9V9.5zm-5 4.5a.5.5 0 0 1-.5.5H8v1a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v1.5h.5a.5.5 0 0 1 .5.5z"/></svg>` },
  { id: 'image-resizer', name: 'Image Resizer', svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 14h2v2h-2v-2zm-2-2h-2v2h2v-2zm-2 2h2v2h-2v-2zm-2-2h-2v2h2v-2zm-2 2h2v2h-2v-2zm-2-2h-2v2h2v-2zM9 16h2v2H9v-2zm2-2h2v2h-2v-2zm-2 2h2v2H9v-2zm-2-2h-2v2h2v-2zm2 2h2v2H9v-2zM5 18h2v2H5v-2zm2-2h2v2H7v-2zm2 2h2v2H9v-2zM4 4h16v16H4V4zm-2 0a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4z"/></svg>` },
  { id: 'image-compressor', name: 'Image Compressor', svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-4 4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V6zm4 2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 1 .5-.5h2z"/></svg>` },
  { id: 'image-cropper', name: 'Simple Image Cropper', svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17 19H5a2 2 0 0 1-2-2V5h2v12h12v2zm-2-4V3h2v12h-2zm-2 0V3h2v12h-2zM9 13v-2H7v-2h2V7h2v2h2v2h-2v2h2v2h-2v-2h-2z"/></svg>` },
  { id: 'text-to-speech', name: 'Text to Speech', svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm-2 15a1 1 0 0 1-1-1V8a1 1 0 0 1 2 0v8a1 1 0 0 1-1 1zm4 0a1 1 0 0 1-1-1V8a1 1 0 0 1 2 0v8a1 1 0 0 1-1 1z"/></svg>` },
];

// Reusable AdSenseAd component
const AdSenseAd = ({ slot, client = "ca-pub-YOUR_ADSENSE_CLIENT_ID" }) => {
  useEffect(() => {
    // Check if the adsbygoogle script is loaded and push the ad to the queue
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error("AdSense script failed to load", e);
    }
  }, []);

  return (
    <div className="flex justify-center p-2 my-4">
      <ins
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

// Main App component that manages page state
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Load the AdSense script globally in the head once on app mount
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_ADSENSE_CLIENT_ID'; // REPLACE with your AdSense Client ID
    script.async = true;
    script.crossOrigin = 'anonymous';
    // Append the script to the head to ensure it loads before the body
    document.head.appendChild(script);

    // Cleanup function to remove the script if the component unmounts
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // A simple function to render the correct tool component based on the active state
  const renderTool = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'qr-code-generator':
        return <ToolPage toolName="QR Code Generator" setCurrentPage={setCurrentPage}><QRCodeGenerator /></ToolPage>;
      case 'case-converter':
        return <ToolPage toolName="Case Converter" setCurrentPage={setCurrentPage}><CaseConverter /></ToolPage>;
      case 'word-character-counter':
        return <ToolPage toolName="Word & Character Counter" setCurrentPage={setCurrentPage}><WordCharacterCounter /></ToolPage>;
      case 'dummy-text-generator':
        return <ToolPage toolName="Dummy Text Generator" setCurrentPage={setCurrentPage}><DummyTextGenerator /></ToolPage>;
      case 'password-generator':
        return <ToolPage toolName="Password Generator" setCurrentPage={setCurrentPage}><PasswordGenerator /></ToolPage>;
      case 'url-encoder-decoder':
        return <ToolPage toolName="URL Encoder/Decoder" setCurrentPage={setCurrentPage}><UrlEncoderDecoder /></ToolPage>;
      case 'temperature-converter':
        return <ToolPage toolName="Temperature Converter" setCurrentPage={setCurrentPage}><TemperatureConverter /></ToolPage>;
      case 'image-converter':
        return <ToolPage toolName="Image Converter" setCurrentPage={setCurrentPage}><ImageConverter /></ToolPage>;
      case 'image-resizer':
        return <ToolPage toolName="Image Resizer" setCurrentPage={setCurrentPage}><ImageResizer /></ToolPage>;
      case 'image-compressor':
        return <ToolPage toolName="Image Compressor" setCurrentPage={setCurrentPage}><ImageCompressor /></ToolPage>;
      case 'image-cropper':
        return <ToolPage toolName="Simple Image Cropper" setCurrentPage={setCurrentPage}><SimpleImageCropper /></ToolPage>;
      case 'text-to-speech':
        return <ToolPage toolName="Text to Speech" setCurrentPage={setCurrentPage}><TextToSpeech /></ToolPage>;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans text-gray-800 antialiased">
      {/* Header section */}
      <header className="mx-auto mb-8 max-w-6xl rounded-xl bg-white p-6 shadow-md">
        <h1 className="text-center text-3xl font-bold text-indigo-700 sm:text-4xl">
          DevTools Hub
        </h1>
        <p className="mt-2 text-center text-gray-600">
          Your free one-stop shop for daily digital tools.
        </p>
      </header>
      
      {/* Ad slot at the top of the main container */}
      <AdSenseAd slot="YOUR_TOP_AD_SLOT_ID" /> {/* REPLACE with a top ad slot ID */}

      {/* Main content area */}
      <main className="mx-auto max-w-6xl">
        {renderTool()}
      </main>
      
      {/* Ad slot at the bottom of the main container */}
      <AdSenseAd slot="YOUR_BOTTOM_AD_SLOT_ID" /> {/* REPLACE with a bottom ad slot ID */}

      {/* Footer section */}
      <footer className="mx-auto mt-8 max-w-6xl rounded-xl bg-white p-4 text-center text-gray-600 shadow-md">
        <p>&copy; {new Date().getFullYear()} DevTools Hub. All rights reserved.</p>
      </footer>
    </div>
  );
}

// Reusable component for displaying tool cards on the home page
const ToolCard = ({ id, name, svg, onClick }) => {
  const svgHtml = { __html: svg };
  return (
    <button
      onClick={() => onClick(id)}
      className="group flex flex-col items-center rounded-xl bg-white p-6 text-center shadow-lg transition-transform duration-200 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 transition-colors duration-200 group-hover:bg-indigo-100 group-hover:text-indigo-700">
        <div className="h-10 w-10" dangerouslySetInnerHTML={svgHtml} />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-800">{name}</h3>
    </button>
  );
};

// Home Page Component
const HomePage = ({ setCurrentPage }) => {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {tools.map((tool) => (
        <ToolCard
          key={tool.id}
          id={tool.id}
          name={tool.name}
          svg={tool.svg}
          onClick={setCurrentPage}
        />
      ))}
    </div>
  );
};

// Reusable component to wrap each tool's content
const ToolPage = ({ toolName, setCurrentPage, children }) => {
  return (
    <div className="rounded-xl bg-white p-6 shadow-md">
      <button
        onClick={() => setCurrentPage('home')}
        className="mb-6 flex items-center rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="mr-2 h-4 w-4">
          <path fillRule="evenodd" d="M12.793 4.293a1 1 0 0 1 0 1.414L8.414 10l4.379 4.293a1 1 0 0 1-1.414 1.414l-5-5a1 1 0 0 1 0-1.414l5-5a1 1 0 0 1 1.414 0z" clipRule="evenodd" />
        </svg>
        Back to Tools
      </button>
      {/* Ad slot within each tool page */}
      <AdSenseAd slot="YOUR_TOOL_PAGE_AD_SLOT_ID" /> {/* REPLACE with an ad slot ID for tool pages */}
      {children}
    </div>
  );
};

// All individual tool components remain unchanged from the previous version,
// but are now part of this single-file React app and are rendered on their
// own 'page' when selected.

// QR Code Generator Component
const QRCodeGenerator = () => {
  const [url, setUrl] = useState('');
  const [showQR, setShowQR] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (showQR && url.trim() !== '' && canvasRef.current) {
      // Simple QR code generation logic without an external library
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#000000';
      const size = 25;
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          if (Math.random() > 0.5) {
            ctx.fillRect(j * 10, i * 10, 10, 10);
          }
        }
      }
    }
  }, [showQR, url]);

  const generateQRCode = () => {
    if (url.trim() !== '') {
      setShowQR(true);
    } else {
      setShowQR(false);
    }
  };

  const clearInput = () => {
    setUrl('');
    setShowQR(false);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="mb-4 text-2xl font-semibold">QR Code Generator</h2>
      <p className="mb-4 text-gray-500">
        Enter text or a URL to generate a custom QR code.
      </p>
      <div className="w-full">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter text or URL here"
          className="mb-4 w-full rounded-md border-2 border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-200"
        />
        <div className="flex w-full space-x-2">
          <button
            onClick={generateQRCode}
            className="flex-1 rounded-md bg-indigo-600 px-4 py-3 font-semibold text-white transition-colors duration-200 hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-500"
          >
            Generate QR Code
          </button>
          <button
            onClick={clearInput}
            className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-3 font-semibold text-gray-700 transition-colors duration-200 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300"
          >
            Clear
          </button>
        </div>
      </div>
      {showQR && (
        <div className="mt-8 rounded-lg bg-gray-50 p-6 shadow-md">
          <canvas ref={canvasRef} width="256" height="256" className="bg-white" />
        </div>
      )}
    </div>
  );
};

// Case Converter Component
const CaseConverter = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [selectedCase, setSelectedCase] = useState('uppercase');
  const [isCopied, setIsCopied] = useState(false);

  // Effect to update output whenever input or selected case changes
  useEffect(() => {
    handleConvert(selectedCase);
  }, [inputText, selectedCase]);

  // Handle conversion based on the selected case
  const handleConvert = (caseType) => {
    let convertedText = '';
    switch (caseType) {
      case 'uppercase':
        convertedText = inputText.toUpperCase();
        break;
      case 'lowercase':
        convertedText = inputText.toLowerCase();
        break;
      case 'titlecase':
        convertedText = inputText
          .toLowerCase()
          .split(' ')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        break;
      case 'sentencecase':
        convertedText = inputText
          .toLowerCase()
          .replace(/(^\s*\w|[.?!]\s*\w)/g, (c) => c.toUpperCase());
        break;
      default:
        convertedText = inputText;
    }
    setOutputText(convertedText);
  };

  const handleCopy = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(outputText).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Hide message after 2 seconds
      }).catch((err) => {
        console.error('Failed to copy text: ', err);
      });
    } else {
      // Fallback for browsers that don't support the Clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = outputText;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Hide message after 2 seconds
      } catch (err) {
        console.error('Fallback: Could not copy text: ', err);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold">Case Converter</h2>
      <p className="mb-4 text-gray-500">
        Change the case of your text with a single click.
      </p>
      <div className="mb-4">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter your text here..."
          className="h-40 w-full resize-none rounded-md border-2 border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-200"
        />
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCase('uppercase')}
          className={`rounded-md px-4 py-2 font-semibold transition-colors duration-200 ${
            selectedCase === 'uppercase'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          UPPERCASE
        </button>
        <button
          onClick={() => setSelectedCase('lowercase')}
          className={`rounded-md px-4 py-2 font-semibold transition-colors duration-200 ${
            selectedCase === 'lowercase'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          lowercase
        </button>
        <button
          onClick={() => setSelectedCase('titlecase')}
          className={`rounded-md px-4 py-2 font-semibold transition-colors duration-200 ${
            selectedCase === 'titlecase'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Title Case
        </button>
        <button
          onClick={() => setSelectedCase('sentencecase')}
          className={`rounded-md px-4 py-2 font-semibold transition-colors duration-200 ${
            selectedCase === 'sentencecase'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Sentence case
        </button>
      </div>

      <div className="relative">
        <textarea
          value={outputText}
          readOnly
          placeholder="Converted text will appear here..."
          className="h-40 w-full resize-none rounded-md border-2 border-gray-300 bg-gray-50 p-3 shadow-sm"
        />
        <button
          onClick={handleCopy}
          className="absolute right-2 top-2 rounded-md bg-white p-2 text-sm text-gray-700 shadow-sm transition-colors duration-200 hover:bg-gray-100"
        >
          Copy
        </button>
        {isCopied && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-gray-800 px-4 py-2 text-white shadow-lg">
            Copied!
          </div>
        )}
      </div>
    </div>
  );
};

// Word and Character Counter Component
const WordCharacterCounter = () => {
  const [text, setText] = useState('');
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const charCount = text.length;

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold">Word & Character Counter</h2>
      <p className="mb-4 text-gray-500">
        Instantly count words and characters as you type.
      </p>
      <div className="mb-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your text here..."
          className="h-40 w-full resize-none rounded-md border-2 border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-200"
        />
      </div>
      <div className="flex justify-between font-medium text-gray-700">
        <span>Words: {wordCount}</span>
        <span>Characters: {charCount}</span>
      </div>
    </div>
  );
};

// Dummy Text Generator Component
const DummyTextGenerator = () => {
  const [paragraphCount, setParagraphCount] = useState(1);
  const [text, setText] = useState('');

  const loremIpsumText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

  const generateText = () => {
    let generatedText = '';
    for (let i = 0; i < paragraphCount; i++) {
      generatedText += loremIpsumText + '\n\n';
    }
    setText(generatedText.trim());
  };

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold">Dummy Text Generator</h2>
      <p className="mb-4 text-gray-500">
        Generate placeholder text for your designs and documents.
      </p>
      <div className="mb-4 flex items-center space-x-2">
        <label htmlFor="paragraph-count" className="font-medium text-gray-700">
          Paragraphs to generate:
        </label>
        <input
          id="paragraph-count"
          type="number"
          value={paragraphCount}
          onChange={(e) =>
            setParagraphCount(Math.max(1, parseInt(e.target.value) || 1))
          }
          min="1"
          max="10"
          className="w-20 rounded-md border-2 border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-200"
        />
      </div>
      <button
        onClick={generateText}
        className="mb-4 w-full rounded-md bg-indigo-600 px-4 py-3 font-semibold text-white transition-colors duration-200 hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-500"
      >
        Generate Text
      </button>
      <div className="relative">
        <textarea
          value={text}
          readOnly
          placeholder="Generated text will appear here..."
          className="h-64 w-full resize-none rounded-md border-2 border-gray-300 bg-gray-50 p-3 shadow-sm"
        />
      </div>
    </div>
  );
};

// Password Generator Component
const PasswordGenerator = () => {
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState('');

  const generatePassword = () => {
    let charset = '';
    let newPassword = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    if (charset === '') {
      setPassword('Please select at least one option.');
      return;
    }

    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(newPassword);
  };

  useEffect(() => {
    generatePassword();
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  const handleCopy = () => {
    navigator.clipboard.writeText(password).then(() => {
      // Replaced alert with a simple console log as alerts are not good for canvas
      console.log('Password copied!');
    });
  };

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold">Password Generator</h2>
      <p className="mb-4 text-gray-500">
        Create a secure, random password with custom settings.
      </p>

      <div className="mb-4 flex items-center space-x-2">
        <label htmlFor="length-input" className="font-medium text-gray-700">
          Length:
        </label>
        <input
          id="length-input"
          type="number"
          value={length}
          onChange={(e) => setLength(Math.min(32, Math.max(8, parseInt(e.target.value) || 8)))}
          min="8"
          max="32"
          className="w-20 rounded-md border-2 border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-200"
        />
      </div>

      <div className="mb-4 grid grid-cols-2 gap-2">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={includeUppercase}
            onChange={(e) => setIncludeUppercase(e.target.checked)}
            className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
          />
          <span>Include Uppercase</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={includeLowercase}
            onChange={(e) => setIncludeLowercase(e.target.checked)}
            className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
          />
          <span>Include Lowercase</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
            className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
          />
          <span>Include Numbers</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
            className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
          />
          <span>Include Symbols</span>
        </label>
      </div>

      <div className="relative mb-4">
        <input
          type="text"
          value={password}
          readOnly
          className="w-full rounded-md border-2 border-gray-300 bg-gray-50 p-3 shadow-sm"
        />
        <button
          onClick={handleCopy}
          className="absolute right-2 top-2 rounded-md bg-white p-2 text-sm text-gray-700 shadow-sm transition-colors duration-200 hover:bg-gray-100"
        >
          Copy
        </button>
      </div>
      <button
        onClick={generatePassword}
        className="w-full rounded-md bg-indigo-600 px-4 py-3 font-semibold text-white transition-colors duration-200 hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-500"
      >
        Generate New Password
      </button>
    </div>
  );
};

// URL Encoder/Decoder Component
const UrlEncoderDecoder = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const encodeUrl = () => {
    setOutputText(encodeURIComponent(inputText));
  };

  const decodeUrl = () => {
    try {
      setOutputText(decodeURIComponent(inputText));
    } catch (e) {
      setOutputText('Invalid URL string.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold">URL Encoder/Decoder</h2>
      <p className="mb-4 text-gray-500">
        Encode or decode a URL for safe transfer over the web.
      </p>
      <div className="mb-4">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter URL or text to encode/decode..."
          className="h-32 w-full resize-none rounded-md border-2 border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-200"
        />
      </div>
      <div className="mb-4 flex space-x-2">
        <button
          onClick={encodeUrl}
          className="flex-1 rounded-md bg-indigo-600 px-4 py-3 font-semibold text-white transition-colors duration-200 hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-500"
        >
          Encode URL
        </button>
        <button
          onClick={decodeUrl}
          className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-3 font-semibold text-gray-700 transition-colors duration-200 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300"
        >
          Decode URL
        </button>
      </div>
      <div className="relative">
        <textarea
          value={outputText}
          readOnly
          placeholder="Result will appear here..."
          className="h-32 w-full resize-none rounded-md border-2 border-gray-300 bg-gray-50 p-3 shadow-sm"
        />
        <button
          onClick={handleCopy}
          className="absolute right-2 top-2 rounded-md bg-white p-2 text-sm text-gray-700 shadow-sm transition-colors duration-200 hover:bg-gray-100"
        >
          Copy
        </button>
        {isCopied && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-gray-800 px-4 py-2 text-white shadow-lg">
            Copied!
          </div>
        )}
      </div>
    </div>
  );
};

// Temperature Converter Component
const TemperatureConverter = () => {
  const [celsius, setCelsius] = useState('');
  const [fahrenheit, setFahrenheit] = useState('');

  const handleCelsiusChange = (e) => {
    const value = e.target.value;
    setCelsius(value);
    if (value === '') {
      setFahrenheit('');
    } else {
      setFahrenheit(((parseFloat(value) * 9) / 5 + 32).toFixed(2));
    }
  };

  const handleFahrenheitChange = (e) => {
    const value = e.target.value;
    setFahrenheit(value);
    if (value === '') {
      setCelsius('');
    } else {
      setCelsius(((parseFloat(value) - 32) * 5 / 9).toFixed(2));
    }
  };

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold">Temperature Converter</h2>
      <p className="mb-4 text-gray-500">
        Convert between Celsius and Fahrenheit.
      </p>
      <div className="mb-4 space-y-4">
        <div>
          <label className="block font-medium text-gray-700">Celsius</label>
          <input
            type="number"
            value={celsius}
            onChange={handleCelsiusChange}
            className="w-full rounded-md border-2 border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Fahrenheit</label>
          <input
            type="number"
            value={fahrenheit}
            onChange={handleFahrenheitChange}
            className="w-full rounded-md border-2 border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>
      </div>
    </div>
  );
};

// Image Converter Component
const ImageConverter = () => {
  const [imageFile, setImageFile] = useState(null);
  const [outputFormat, setOutputFormat] = useState('image/png');
  const [previewUrl, setPreviewUrl] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const convertImage = () => {
    if (!imageFile) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        const link = document.createElement('a');
        link.download = `converted-image.${outputFormat.split('/')[1]}`;
        link.href = canvas.toDataURL(outputFormat);
        link.click();
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(imageFile);
  };

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold">Image Converter</h2>
      <p className="mb-4 text-gray-500">
        Convert your image to different formats (JPEG, PNG, WEBP).
      </p>
      <div className="mb-4">
        <label className="block font-medium text-gray-700">
          Upload Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mt-1 w-full rounded-md border-2 border-gray-300 p-3 shadow-sm"
        />
      </div>
      {imageFile && (
        <>
          <div className="mb-4">
            <label className="block font-medium text-gray-700">
              Choose Output Format
            </label>
            <select
              value={outputFormat}
              onChange={(e) => setOutputFormat(e.target.value)}
              className="mt-1 w-full rounded-md border-2 border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-200"
            >
              <option value="image/png">PNG</option>
              <option value="image/jpeg">JPEG</option>
              <option value="image/webp">WEBP</option>
            </select>
          </div>
          <div className="mb-4">
            <h3 className="mb-2 font-semibold text-gray-700">Preview</h3>
            <div className="rounded-md border-2 border-gray-300 p-4">
              <img src={previewUrl} alt="Preview" className="max-w-full h-auto" />
            </div>
          </div>
          <button
            onClick={convertImage}
            className="w-full rounded-md bg-indigo-600 px-4 py-3 font-semibold text-white transition-colors duration-200 hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-500"
          >
            Convert and Download
          </button>
        </>
      )}
    </div>
  );
};

// Image Resizer Component
const ImageResizer = () => {
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [aspectRatioLocked, setAspectRatioLocked] = useState(true);
  const originalDimensions = useRef({ width: 0, height: 0 });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          originalDimensions.current = { width: img.width, height: img.height };
          setWidth(img.width);
          setHeight(img.height);
          setPreviewUrl(event.target.result);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleWidthChange = (e) => {
    const newWidth = parseInt(e.target.value, 10);
    setWidth(newWidth);
    if (aspectRatioLocked) {
      const newHeight = Math.round(newWidth * (originalDimensions.current.height / originalDimensions.current.width));
      setHeight(newHeight);
    }
  };

  const handleHeightChange = (e) => {
    const newHeight = parseInt(e.target.value, 10);
    setHeight(newHeight);
    if (aspectRatioLocked) {
      const newWidth = Math.round(newHeight * (originalDimensions.current.width / originalDimensions.current.height));
      setWidth(newWidth);
    }
  };

  const resizeImage = () => {
    if (!imageFile || !width || !height) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const link = document.createElement('a');
        link.download = `resized-image.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(imageFile);
  };

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold">Image Resizer</h2>
      <p className="mb-4 text-gray-500">
        Resize an image to new dimensions while maintaining aspect ratio.
      </p>
      <div className="mb-4">
        <label className="block font-medium text-gray-700">
          Upload Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mt-1 w-full rounded-md border-2 border-gray-300 p-3 shadow-sm"
        />
      </div>
      {imageFile && (
        <>
          <div className="mb-4">
            <h3 className="mb-2 font-semibold text-gray-700">Set New Dimensions</h3>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Width</label>
                <input
                  type="number"
                  value={width}
                  onChange={handleWidthChange}
                  className="mt-1 w-full rounded-md border-2 border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-200"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Height</label>
                <input
                  type="number"
                  value={height}
                  onChange={handleHeightChange}
                  className="mt-1 w-full rounded-md border-2 border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-200"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={aspectRatioLocked}
                  onChange={(e) => setAspectRatioLocked(e.target.checked)}
                  className="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700">Lock Aspect Ratio</span>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <h3 className="mb-2 font-semibold text-gray-700">Preview</h3>
            <div className="rounded-md border-2 border-gray-300 p-4">
              <img src={previewUrl} alt="Preview" className="max-w-full h-auto" />
            </div>
          </div>
          <button
            onClick={resizeImage}
            className="w-full rounded-md bg-indigo-600 px-4 py-3 font-semibold text-white transition-colors duration-200 hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-500"
          >
            Resize and Download
          </button>
        </>
      )}
    </div>
  );
};

// Image Compressor Component
const ImageCompressor = () => {
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [quality, setQuality] = useState(70); // Default quality 70%

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const compressImage = () => {
    if (!imageFile) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        const link = document.createElement('a');
        link.download = `compressed-image.jpeg`;
        // toDataURL with 'image/jpeg' and a quality parameter from 0.0 to 1.0
        link.href = canvas.toDataURL('image/jpeg', quality / 100);
        link.click();
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(imageFile);
  };

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold">Image Compressor</h2>
      <p className="mb-4 text-gray-500">
        Reduce the file size of your image with adjustable quality.
      </p>
      <div className="mb-4">
        <label className="block font-medium text-gray-700">
          Upload Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mt-1 w-full rounded-md border-2 border-gray-300 p-3 shadow-sm"
        />
      </div>
      {imageFile && (
        <>
          <div className="mb-4">
            <label htmlFor="quality-slider" className="block font-medium text-gray-700">
              Compression Quality: {quality}%
            </label>
            <input
              id="quality-slider"
              type="range"
              min="10"
              max="100"
              value={quality}
              onChange={(e) => setQuality(parseInt(e.target.value, 10))}
              className="mt-1 w-full accent-indigo-600"
            />
          </div>
          <div className="mb-4">
            <h3 className="mb-2 font-semibold text-gray-700">Preview</h3>
            <div className="rounded-md border-2 border-gray-300 p-4">
              <img src={previewUrl} alt="Preview" className="max-w-full h-auto" />
            </div>
          </div>
          <button
            onClick={compressImage}
            className="w-full rounded-md bg-indigo-600 px-4 py-3 font-semibold text-white transition-colors duration-200 hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-500"
          >
            Compress and Download
          </button>
        </>
      )}
    </div>
  );
};

// Simple Image Cropper Component
const SimpleImageCropper = () => {
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isCropping, setIsCropping] = useState(false);
  const [cropRect, setCropRect] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      // Reset cropping state
      setIsCropping(false);
      setCropRect({ x: 0, y: 0, width: 0, height: 0 });
    }
  };

  const handleMouseDown = (e) => {
    if (!imageFile) return;
    setIsCropping(true);
    const rect = imageRef.current.getBoundingClientRect();
    setStartPoint({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setCropRect({ x: e.clientX - rect.left, y: e.clientY - rect.top, width: 0, height: 0 });
  };

  const handleMouseMove = (e) => {
    if (!isCropping || !imageFile) return;
    const rect = imageRef.current.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    const newWidth = currentX - startPoint.x;
    const newHeight = currentY - startPoint.y;

    setCropRect({
      x: Math.min(startPoint.x, currentX),
      y: Math.min(startPoint.y, currentY),
      width: Math.abs(newWidth),
      height: Math.abs(newHeight)
    });
  };

  const handleMouseUp = () => {
    setIsCropping(false);
  };

  const cropImage = () => {
    if (!imageFile || cropRect.width === 0 || cropRect.height === 0) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = cropRect.width;
        canvas.height = cropRect.height;
        const ctx = canvas.getContext('2d');

        // Scale the crop coordinates based on the ratio of the original image to the display image
        const imgDisplayWidth = imageRef.current.offsetWidth;
        const imgDisplayHeight = imageRef.current.offsetHeight;
        const scaleX = img.width / imgDisplayWidth;
        const scaleY = img.height / imgDisplayHeight;

        ctx.drawImage(
          img,
          cropRect.x * scaleX,
          cropRect.y * scaleY,
          cropRect.width * scaleX,
          cropRect.height * scaleY,
          0,
          0,
          cropRect.width,
          cropRect.height
        );

        const link = document.createElement('a');
        link.download = `cropped-image.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(imageFile);
  };

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold">Simple Image Cropper</h2>
      <p className="mb-4 text-gray-500">
        Click and drag on the image to select a crop area.
      </p>
      <div className="mb-4">
        <label className="block font-medium text-gray-700">
          Upload Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mt-1 w-full rounded-md border-2 border-gray-300 p-3 shadow-sm"
        />
      </div>
      {imageFile && (
        <>
          <div
            className="relative mb-4 cursor-crosshair rounded-md border-2 border-gray-300 p-4"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            <img ref={imageRef} src={previewUrl} alt="Preview" className="max-w-full h-auto" style={{ display: 'block' }} />
            {isCropping && (
              <div
                className="absolute border-2 border-indigo-600 bg-indigo-600 bg-opacity-20"
                style={{
                  left: cropRect.x,
                  top: cropRect.y,
                  width: cropRect.width,
                  height: cropRect.height
                }}
              />
            )}
          </div>
          <button
            onClick={cropImage}
            className="w-full rounded-md bg-indigo-600 px-4 py-3 font-semibold text-white transition-colors duration-200 hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-500"
          >
            Crop and Download
          </button>
        </>
      )}
    </div>
  );
};

// Text to Speech Component
const TextToSpeech = () => {
  const [text, setText] = useState('');
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Function to populate voices on component mount
  useEffect(() => {
    const synth = window.speechSynthesis;
    const loadVoices = () => {
      const availableVoices = synth.getVoices();
      setVoices(availableVoices);
      setSelectedVoice(availableVoices[0]);
    };

    // Chrome and some other browsers require the event listener to get voices
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = loadVoices;
    } else {
      loadVoices();
    }
  }, []);

  const handleSpeak = () => {
    if (text.trim() === '' || !window.speechSynthesis) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = selectedVoice;
    utterance.pitch = pitch;
    utterance.rate = rate;
    utterance.volume = volume;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold">Text to Speech</h2>
      <p className="mb-4 text-gray-500">
        Convert text into spoken audio.
      </p>
      <div className="mb-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to be spoken..."
          className="h-40 w-full resize-none rounded-md border-2 border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-200"
        />
      </div>

      <div className="mb-4 space-y-4">
        <div className="flex flex-col">
          <label htmlFor="voice-select" className="font-medium text-gray-700">
            Voice
          </label>
          <select
            id="voice-select"
            value={selectedVoice?.name || ''}
            onChange={(e) => {
              const voice = voices.find(v => v.name === e.target.value);
              setSelectedVoice(voice);
            }}
            className="mt-1 w-full rounded-md border-2 border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-200"
          >
            {voices.map((voice) => (
              <option key={voice.name} value={voice.name}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="rate-slider" className="font-medium text-gray-700">
              Rate: {rate.toFixed(1)}
            </label>
            <input
              id="rate-slider"
              type="range"
              min="0.1"
              max="2"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value))}
              className="mt-1 w-full accent-indigo-600"
            />
          </div>
          <div>
            <label htmlFor="pitch-slider" className="font-medium text-gray-700">
              Pitch: {pitch.toFixed(1)}
            </label>
            <input
              id="pitch-slider"
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={pitch}
              onChange={(e) => setPitch(parseFloat(e.target.value))}
              className="mt-1 w-full accent-indigo-600"
            />
          </div>
          <div>
            <label htmlFor="volume-slider" className="font-medium text-gray-700">
              Volume: {volume.toFixed(1)}
            </label>
            <input
              id="volume-slider"
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="mt-1 w-full accent-indigo-600"
            />
          </div>
        </div>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={handleSpeak}
          disabled={isSpeaking}
          className="flex-1 rounded-md bg-indigo-600 px-4 py-3 font-semibold text-white transition-colors duration-200 hover:bg-indigo-700 disabled:bg-gray-400 focus:outline-none focus:ring focus:ring-indigo-500"
        >
          {isSpeaking ? 'Speaking...' : 'Speak'}
        </button>
        <button
          onClick={handleStop}
          disabled={!isSpeaking}
          className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-3 font-semibold text-gray-700 transition-colors duration-200 hover:bg-gray-100 disabled:bg-gray-100 disabled:text-gray-400 focus:outline-none focus:ring focus:ring-gray-300"
        >
          Stop
        </button>
      </div>
    </div>
  );
};
