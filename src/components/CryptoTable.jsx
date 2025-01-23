import React, { useEffect } from 'react';
import './CryptoTable.css';
import { CRYPTO_META } from '../data/cryptoMeta';
import { useWebSocket } from '../hooks/useWebSocket';
import { WS_URL } from '../data/cryptoMeta';

function CryptoTable() {
  const { data: wsData, isConnected, error } = useWebSocket(WS_URL);

  useEffect(() => {
    console.log('Current WebSocket data:', wsData);
  }, [wsData]);

  const cryptos = CRYPTO_META.map(crypto => {
    const wsKey = `${crypto.prefix}_CAD`;
    const marketData = wsData[wsKey];
    
    if (marketData) {
      console.log(`Found data for ${wsKey}:`, marketData);
    }

    const formatNumber = (num) => {
      return num ? num.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }) : '0.00';
    };

    return {
      name: crypto.name,
      symbol: `${crypto.prefix}/CAD`,
      change: marketData ? `${formatNumber(marketData.change)}%` : '0.00%',
      price: marketData ? `$${formatNumber(marketData.spot)}` : '$0.00',
      sellPrice: marketData ? `$${formatNumber(marketData.bid)}` : '$0.00',
      buyPrice: marketData ? `$${formatNumber(marketData.ask)}` : '$0.00',
      iconUrl: crypto.iconUrl,
      hasData: !!marketData,
      rawData: marketData // for debugging
    };
  });

  // Debug output
  useEffect(() => {
    const dataAvailable = cryptos.filter(c => c.hasData);
    if (dataAvailable.length > 0) {
      console.log('Cryptos with data:', dataAvailable);
    }
  }, [cryptos]);

  return (
    <div className="crypto-table">
      <div className="connection-status">
        {error ? (
          <span className="status-error">{error}</span>
        ) : isConnected ? (
          <span className="status-connected">
            Connected {Object.keys(wsData).length > 0 ? `(${Object.keys(wsData).length} pairs)` : ''}
          </span>
        ) : (
          <span className="status-disconnected">Disconnected</span>
        )}
      </div>
      <div className="table-header">
        <div className="col">Coin</div>
        <div className="col">24h change</div>
        <div className="col">Live price</div>
        <div className="col">Sell price</div>
        <div className="col">Buy price</div>
        <div className="col">Watch</div>
      </div>
      {cryptos.map((crypto) => (
        <div key={crypto.symbol} className={`table-row ${crypto.hasData ? 'has-data' : ''}`}>
          <div className="col coin-col">
            <div className="coin-icon">
              <img src={crypto.iconUrl} alt={crypto.name} />
            </div>
            <div className="coin-info">
              <div className="coin-name">{crypto.name}</div>
              <div className="coin-symbol">{crypto.symbol}</div>
            </div>
          </div>
          <div className={`col change-col ${parseFloat(crypto.change) >= 0 ? 'positive' : 'negative'}`}>
            {crypto.change}
          </div>
          <div className="col price-col">{crypto.price}</div>
          <div className="col price-col">{crypto.sellPrice}</div>
          <div className="col price-col">{crypto.buyPrice}</div>
          <div className="col">
            <button className="watch-btn">★</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CryptoTable; 