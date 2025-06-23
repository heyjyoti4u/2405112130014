 
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLogger } from '../../LoggingMiddleware/LoggerContext'; 
import { getUrlMap } from '../data/urlMap';

export default function Redirector() {
  const { shortcode } = useParams();
  const navigate = useNavigate();
  const { logEvent } = useLogger();
  const urlMap = getUrlMap();

  useEffect(() => {
    const entry = urlMap.get(shortcode);
    if (entry) {
      entry.hits++;
      logEvent('url_redirected', { shortcode });
      window.location.href = entry.url;
    } else {
      logEvent('redirect_failed', { shortcode });
      navigate('/');
    }
  }, [shortcode]);

  return <div>Redirecting...</div>;
}
