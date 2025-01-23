import React from 'react';
import './TopCards.css';
import { CRYPTO_META } from '../data/cryptoMeta';
import { useWebSocket } from '../hooks/useWebSocket';
import { WS_URL } from '../data/cryptoMeta';

function TopCards({ showUSD }) {
  const { data: wsData } = useWebSocket(WS_URL);

  const topCryptos = ['BTC', 'ETH', 'DOT'].map(symbol => {
    const crypto = CRYPTO_META.find(c => c.prefix === symbol);
    const wsKey = `${symbol}_CAD`;
    const marketData = wsData[wsKey];
    
    const formatNumber = (num) => {
      if (!num) return '0.00';
      const value = showUSD ? num * 0.7 : num;
      return value.toFixed(2);
    };

    return {
      symbol: crypto.prefix,
      name: crypto.name,
      change: marketData ? `${formatNumber(marketData.change)}%` : '0%',
      iconUrl: crypto.iconUrl,
      isPositive: marketData ? marketData.change >= 0 : true
    };
  });

  return (
    <div className="top-cards">
      {topCryptos.map((crypto) => (
        <div key={crypto.symbol} className="card">
          <div className="card-icon">
            <img src={crypto.iconUrl} alt={crypto.name} />
          </div>
          <div className="card-content">
            <div className="symbol">{crypto.symbol}</div>
            <div className={`change ${crypto.isPositive ? 'positive' : 'negative'}`}>
              {crypto.change}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TopCards; 