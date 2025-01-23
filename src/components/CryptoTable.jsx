import React, { useEffect, useState } from 'react';
import './CryptoTable.css';
import { CRYPTO_META } from '../data/cryptoMeta';
import { useWebSocket } from '../hooks/useWebSocket';
import { WS_URL } from '../data/cryptoMeta';

function CryptoTable({ searchQuery, showUSD }) {
  const { data: wsData, isConnected, error } = useWebSocket(WS_URL);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending'
  });

  const formatNumber = (num, isPrice = true) => {
    if (!num) return '0.00';
    const value = isPrice && showUSD ? num * 0.7 : num;
    return value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortData = (data) => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      // Remove special characters for numeric comparison
      if (typeof aValue === 'string' && aValue.includes('$')) {
        aValue = parseFloat(aValue.replace(/[$,%]/g, ''));
        bValue = parseFloat(bValue.replace(/[$,%]/g, ''));
      }

      if (aValue < bValue) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  };

  const cryptos = CRYPTO_META
    .filter(crypto => 
      crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crypto.prefix.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .map(crypto => {
      const wsKey = `${crypto.prefix}_CAD`;
      const marketData = wsData[wsKey];
      
      if (marketData) {
        console.log(`Found data for ${wsKey}:`, marketData);
      }

      return {
        name: crypto.name,
        symbol: `${crypto.prefix}/${showUSD ? 'USD' : 'CAD'}`,
        change: marketData ? `${formatNumber(marketData.change, false)}%` : '0.00%',
        price: marketData ? `$${formatNumber(marketData.spot)}` : '$0.00',
        sellPrice: marketData ? `$${formatNumber(marketData.bid)}` : '$0.00',
        buyPrice: marketData ? `$${formatNumber(marketData.ask)}` : '$0.00',
        iconUrl: crypto.iconUrl,
        hasData: !!marketData,
        rawData: marketData // for debugging
      };
    });

  const sortedCryptos = sortData(cryptos);

  // Debug output
  useEffect(() => {
    const dataAvailable = sortedCryptos.filter(c => c.hasData);
    if (dataAvailable.length > 0) {
      console.log('Cryptos with data:', dataAvailable);
    }
  }, [sortedCryptos]);

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
        <div className="col" onClick={() => handleSort('name')}>
          Coin {sortConfig.key === 'name' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
        </div>
        <div className="col" onClick={() => handleSort('change')}>
          24h change {sortConfig.key === 'change' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
        </div>
        <div className="col" onClick={() => handleSort('price')}>
          Live price {sortConfig.key === 'price' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
        </div>
        <div className="col" onClick={() => handleSort('sellPrice')}>
          Sell price {sortConfig.key === 'sellPrice' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
        </div>
        <div className="col" onClick={() => handleSort('buyPrice')}>
          Buy price {sortConfig.key === 'buyPrice' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
        </div>
        <div className="col">Watch</div>
      </div>
      {sortedCryptos.map((crypto) => (
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