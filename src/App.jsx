import React, { useState } from 'react';
import ConverterGrid from './components/ConverterGrid';
import Converter from './components/Converter';
import SearchBar from './components/SearchBar';
import './index.css';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title" onClick={() => setSelectedCategory(null)} style={{ cursor: 'pointer' }}>
          Unit<span className="title-accent">Shift</span>
        </h1>
        <p className="app-subtitle">Advanced Universal Converter</p>
      </header>

      <main className="app-main">
        {selectedCategory ? (
          <Converter
            category={selectedCategory}
            onBack={() => setSelectedCategory(null)}
          />
        ) : (
          <>
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
            <ConverterGrid
              onSelect={setSelectedCategory}
              searchTerm={searchTerm}
            />
          </>
        )}
      </main>

      <footer className="app-footer">
        <p>© 2025 UnitShift. Design by fun-geek.</p>
      </footer>
    </div>
  );
}

export default App;
