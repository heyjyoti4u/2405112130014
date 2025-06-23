 
import React, { useState } from 'react';
import { useLogger } from '../../LoggingMiddleware/LoggerContext'; 
import { getUrlMap } from '../data/urlMap'; 
import { useNavigate } from 'react-router-dom';
const generateShortcode = () => Math.random().toString(36).substring(2, 8);

export default function Home() {
  const { logEvent } = useLogger();
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortcode, setShortcode] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [error, setError] = useState('');
  const urlMap = getUrlMap();

  const handleShorten = () => {
    const code = customCode || generateShortcode();
    if (urlMap.has(code)) {
      setError('Shortcode already exists. Try another.');
      logEvent('shortcode_conflict', { code });
      return;
    }
    urlMap.set(code, { url: originalUrl, hits: 0 });
    setShortcode(code);
    setError('');
    logEvent('url_shortened', { originalUrl, code });
  };

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">URL Shortener</h1>
      <input
        className="border p-2 mr-2"
        placeholder="Enter URL"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
      />
      <input
        className="border p-2 mr-2"
        placeholder="Custom shortcode (optional)"
        value={customCode}
        onChange={(e) => setCustomCode(e.target.value)}
      />
      <button className="bg-blue-500 text-white p-2" onClick={handleShorten}>
        Shorten
      </button>
      {error && <div className="text-red-500 mt-2">{error}</div>}
      {shortcode && (
        <div className="mt-2">
          Short URL: <a href={`/${shortcode}`}>/{shortcode}</a><br />
          Stats: <a href={`/stats/${shortcode}`}>/stats/{shortcode}</a>
        </div>
      )}
    </div>
  );
}
