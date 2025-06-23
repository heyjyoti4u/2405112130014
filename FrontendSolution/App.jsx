 
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Stats from './components/Stats';
import Redirector from './components/Redirector';
import { LoggerProvider } from '../LoggingMiddleware/LoggerContext'; // updated path

export default function App() {
  return (
    <LoggerProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stats/:shortcode" element={<Stats />} />
          <Route path="/:shortcode" element={<Redirector />} />
        </Routes>
      </Router>
    </LoggerProvider>
  );
}
