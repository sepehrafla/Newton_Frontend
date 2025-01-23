import React from 'react';
import './TopCards.css';
import { CRYPTO_META } from '../data/cryptoMeta';

function TopCards() {
  const topCryptos = ['BTC', 'ETH', 'DOT'].map(symbol => {
    const crypto = CRYPTO_META.find(c => c.prefix === symbol);
    return {
      symbol: crypto.prefix,
      name: crypto.name,
      change: '0%',
      iconUrl: crypto.iconUrl
    };
  });

  return (
    <div className="top-cards">
      {topCryptos.map((card) => (
        <div key={card.symbol} className="card">
          <div className="card-content">
            <div className="card-icon">
              <img src={card.iconUrl} alt={card.name} />
            </div>
            <div className="card-info">
              <span className="symbol">{card.symbol}</span>
              <span className="change">{card.change}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TopCards; 