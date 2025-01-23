import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CryptoTable from './components/CryptoTable';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showUSD, setShowUSD] = useState(false);

  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Hero />
        <div className="search-section">
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Search coin"
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="display-usd">
            <span>Display USD pricing</span>
            <label className="switch">
              <input 
                type="checkbox"
                checked={showUSD}
                onChange={(e) => setShowUSD(e.target.checked)}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
        <CryptoTable searchQuery={searchQuery} showUSD={showUSD} />
      </main>
    </div>
  );
}

export default App; 