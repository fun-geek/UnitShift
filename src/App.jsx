import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import ConverterGrid from './components/ConverterGrid';
import Converter from './components/Converter';
import SearchBar from './components/SearchBar';
import { AnimatePresence } from 'framer-motion';
import './index.css';

function AppContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          Unit<span className="title-accent">Shift</span>
        </h1>
        <p className="app-subtitle">Advanced Universal Converter</p>
      </header>

      <main className="app-main">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <>
                  <SearchBar value={searchTerm} onChange={setSearchTerm} />
                  <ConverterGrid searchTerm={searchTerm} />
                </>
              }
            />
            <Route
              path="/converter/:categoryId"
              element={<Converter />}
            />
          </Routes>
        </AnimatePresence>
      </main>

      <footer className="app-footer">
        <p>© 2025 UnitShift. Design by fun-geek.</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
