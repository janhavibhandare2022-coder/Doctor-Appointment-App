import React, { useState } from 'react';

function CurrencyConverter({ cryptos = [], currentCurrency = 'usd' }) {
  const [cryptoAmount, setCryptoAmount] = useState(1);
  const [selectedCoinId, setSelectedCoinId] = useState(cryptos[0]?.id || 'bitcoin');

  const selectedCoin = cryptos.find((c) => c.id === selectedCoinId) || cryptos[0];
  const convertedValue = selectedCoin ? (cryptoAmount * selectedCoin.current_price).toFixed(2) : 0;

  return (
    <div style={{ background: '#ffffff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', marginBottom: '24px' }}>
      <h3 style={{ margin: '0 0 16px 0', color: '#1f2937' }}>Currency Converter</h3>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#6b7280' }}>Crypto Amount</label>
          <input
            type="number"
            min="0"
            value={cryptoAmount}
            onChange={(e) => setCryptoAmount(Number(e.target.value))}
            style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '15px' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#6b7280' }}>Select Coin</label>
          <select
            value={selectedCoinId}
            onChange={(e) => setSelectedCoinId(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '15px' }}
          >
            {cryptos.map((coin) => (
              <option key={coin.id} value={coin.id}>
                {coin.name} ({coin.symbol.toUpperCase()})
              </option>
            ))}
          </select>
        </div>

        <div style={{ alignSelf: 'flex-end', paddingBottom: '8px' }}>
          <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#059669' }}>
            = {convertedValue} {currentCurrency.toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CurrencyConverter;