 
import React, { createContext, useContext } from 'react';

const LoggerContext = createContext();

export function LoggerProvider({ children }) {
  const logEvent = (type, payload) => {
    const event = {
      type,
      payload,
      timestamp: new Date().toISOString(),
    };
    window.__customLogs = window.__customLogs || [];
    window.__customLogs.push(event);
  };

  return (
    <LoggerContext.Provider value={{ logEvent }}>
      {children}
    </LoggerContext.Provider>
  );
}

export const useLogger = () => useContext(LoggerContext);
