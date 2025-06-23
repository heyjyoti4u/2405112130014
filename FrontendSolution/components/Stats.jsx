 
import React from 'react';
import { useParams } from 'react-router-dom';
import { getUrlMap } from '../data/urlMap';
import { useLogger } from '../../LoggingMiddleware/LoggerContext'; 

export default function Stats() {
  const { shortcode } = useParams();
  const urlMap = getUrlMap();
  const { logEvent } = useLogger();

  const entry = urlMap.get(shortcode);
  if (!entry) {
    logEvent('stats_failed', { shortcode });
    return <div>Shortcode not found</div>;
  }

  logEvent('view_stats', { shortcode });

  return (
    <div className="p-4">
      <h2 className="text-lg">Stats for: {shortcode}</h2>
      <p><strong>Original URL:</strong> {entry.url}</p>
      <p><strong>Hits:</strong> {entry.hits}</p>
      <a href={`/${shortcode}`} className="text-blue-700">Visit URL</a>
    </div>
  );
}
