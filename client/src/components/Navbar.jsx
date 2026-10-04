import React from 'react';

function Navbar({ currency, setCurrency, search, setSearch }) {
  return (
    <nav className="flex flex-wrap items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
      <div className="flex items-center space-x-2">
        <span className="text-xl font-bold text-blue-600">AlmaBetter</span>
        <span className="text-sm font-semibold text-gray-500">Crypto Dashboard</span>
      </div>

      <div className="flex items-center space-x-4 mt-2 sm:mt-0">
        <input
          type="text"
          placeholder="Search by coin name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex items-center space-x-1">
          <label className="text-sm font-medium text-gray-600">Currency:</label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="px-2 py-1.5 border border-gray-300 rounded-md text-sm font-semibold bg-white cursor-pointer"
          >
            <option value="usd">USD ($)</option>
            <option value="inr">INR (₹)</option>
          </select>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;