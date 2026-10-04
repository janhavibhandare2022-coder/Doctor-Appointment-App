import React, { useState } from 'react';

function ExchangeCoins({ cryptos }) {
  const [sellCoin, setSellCoin] = useState('bitcoin');
  const [buyCoin, setBuyCoin] = useState('ethereum');
  const [sellAmount, setSellAmount] = useState(1);
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleExchange = () => {
    if (!sellAmount || isNaN(sellAmount) || Number(sellAmount) <= 0) {
      setErrorMsg('Please enter a valid numeric value');
      setResult(null);
      return;
    }
    setErrorMsg('');

    const sellData = cryptos?.find((c) => c.id === sellCoin);
    const buyData = cryptos?.find((c) => c.id === buyCoin);

    if (sellData && buyData && buyData.current_price > 0) {
      const converted = (Number(sellAmount) * sellData.current_price) / buyData.current_price;
      setResult(converted.toFixed(4));
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm h-full flex flex-col justify-between">
      <h3 className="text-sm font-bold text-gray-800 mb-3 pb-2 border-b">Exchange Coins</h3>

      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <label className="text-xs font-semibold text-gray-600 w-12">Sell:</label>
          <select
            value={sellCoin}
            onChange={(e) => setSellCoin(e.target.value)}
            className="flex-1 px-2 py-1 border rounded text-xs"
          >
            {cryptos?.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <input
            type="number"
            min="0"
            value={sellAmount}
            onChange={(e) => setSellAmount(e.target.value)}
            className="w-24 px-2 py-1 border rounded text-xs text-right"
            placeholder="Amount"
          />
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-xs font-semibold text-gray-600 w-12">Buy:</label>
          <select
            value={buyCoin}
            onChange={(e) => setBuyCoin(e.target.value)}
            className="flex-1 px-2 py-1 border rounded text-xs"
          >
            {cryptos?.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <div className="w-24 px-2 py-1 bg-gray-100 rounded text-xs text-right font-semibold">
            {result !== null ? result : '0.00'}
          </div>
        </div>

        {errorMsg && <p className="text-[11px] text-red-500 font-medium">{errorMsg}</p>}
      </div>

      <button
        onClick={handleExchange}
        className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1.5 rounded-lg text-xs transition"
      >
        Exchange
      </button>
    </div>
  );
}

export default ExchangeCoins;