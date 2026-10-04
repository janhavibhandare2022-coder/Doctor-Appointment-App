import React from 'react';

function Sidebar({ cryptos, currency, onSelectCoin, selectedCoin }) {
  const symbol = currency === 'usd' ? '$' : '₹';

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm h-full">
      <h3 className="text-base font-bold text-gray-800 mb-3 pb-2 border-b">
        Cryptocurrency by Market Cap
      </h3>
      <div className="flex flex-col space-y-3 overflow-y-auto max-h-[600px] pr-1">
        {cryptos && cryptos.map((coin) => {
          const isSelected = selectedCoin === coin.id;
          const isUp = coin.price_change_percentage_24h >= 0;
          return (
            <div
              key={coin.id}
              onClick={() => onSelectCoin(coin.id)}
              className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition ${
                isSelected ? 'bg-blue-50 border border-blue-400' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-2">
                <img src={coin.image} alt={coin.name} className="w-6 h-6 rounded-full" />
                <div>
                  <p className="text-xs font-semibold text-gray-900">{coin.name}</p>
                  <p className="text-[10px] text-gray-500 uppercase">{coin.symbol}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-gray-800">
                  {symbol}{coin.current_price?.toLocaleString()}
                </p>
                <p className={`text-[10px] font-semibold ${isUp ? 'text-green-600' : 'text-red-500'}`}>
                  {isUp ? '▲' : '▼'} {Math.abs(coin.price_change_percentage_24h || 0).toFixed(2)}%
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;