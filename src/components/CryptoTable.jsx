import React from 'react';
import './CryptoTable.css';
import { CRYPTO_META } from '../data/cryptoMeta';

function CryptoTable() {
  const cryptos = CRYPTO_META.map(crypto => ({
    name: crypto.name,
    symbol: `${crypto.prefix}/CAD`,
    change: '0.00%',
    price: '$0.00',
    sellPrice: '$0.00',
    buyPrice: '$0.00',
    iconUrl: crypto.iconUrl
  }));

  return (
    <div className="crypto-table">
      <div className="table-header">
        <div className="col">Coin</div>
        <div className="col">24h change</div>
        <div className="col">Live price</div>
        <div className="col">Sell price</div>
        <div className="col">Buy price</div>
        <div className="col">Watch</div>
      </div>
      {cryptos.map((crypto) => (
        <div key={crypto.symbol} className="table-row">
          <div className="col coin-col">
            <div className="coin-icon">
              <img src={crypto.iconUrl} alt={crypto.name} />
            </div>
            <div className="coin-info">
              <div className="coin-name">{crypto.name}</div>
              <div className="coin-symbol">{crypto.symbol}</div>
            </div>
          </div>
          <div className="col change-col">{crypto.change}</div>
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