import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import CryptoTable from './components/CryptoTable';
import TopCards from './components/TopCards';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <div className="welcome-section">
          <h1>Welcome to Newton!</h1>
          <p>Crypto for Canadians</p>
          <button className="sign-up-btn">SIGN UP</button>
        </div>
        <TopCards />
        <div className="search-section">
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Search coin"
              className="search-input"
            />
          </div>
          <div className="display-usd">
            <span>Display USD pricing</span>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
        <CryptoTable />
      </main>
    </div>
  );
}

export default App; 