import React from 'react';
import './Hero.css';
import TopCards from './TopCards';

function Hero() {
  return (
    <div className="hero">
      <div className="hero-left">
        <h1 className="hero-title">Welcome to Newton!</h1>
        <p className="hero-subtitle">Crypto for Canadians</p>
        <button className="hero-signup-btn">SIGN UP</button>
      </div>
      <div className="hero-cards">
        <TopCards />
      </div>
    </div>
  );
}

export default Hero; 