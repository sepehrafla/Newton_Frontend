import React from 'react';
import './TopCards.css';
import { CRYPTO_META } from '../data/cryptoMeta';
import { useWebSocket } from '../hooks/useWebSocket';
import { WS_URL } from '../data/cryptoMeta';

function TopCards() {
  const { data: wsData } = useWebSocket(WS_URL);

  const topCryptos = ['BTC', 'ETH', 'DOT'].map(symbol => {
    const crypto = CRYPTO_META.find(c => c.prefix === symbol);
    const wsKey = `${symbol}_CAD`;
    const marketData = wsData[wsKey];
    
    return {
      symbol: crypto.prefix,
      name: crypto.name,
      change: marketData ? `${marketData.change.toFixed(2)}%` : '0%',
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
              <span className={`change ${parseFloat(card.change) >= 0 ? 'positive' : 'negative'}`}>
                {card.change}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TopCards; 