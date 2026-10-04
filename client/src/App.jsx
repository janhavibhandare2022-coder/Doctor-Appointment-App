import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import BookAppointment from './pages/BookAppointment';
import MyAppointments from './pages/MyAppointments';

function Home() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-600 mb-2">Doctor Appointment System</h1>
      <p className="text-gray-600 mb-6">Book consultations and diagnostic tests easily.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 border rounded-lg shadow-sm bg-white">
          <h2 className="text-xl font-semibold mb-2">Book Appointment</h2>
          <p className="text-gray-500 mb-4">Select doctor department, schedule time, and upload past reports.</p>
          <Link to="/book" className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Book Now
          </Link>
        </div>
        <div className="p-6 border rounded-lg shadow-sm bg-white">
          <h2 className="text-xl font-semibold mb-2">My Appointments</h2>
          <p className="text-gray-500 mb-4">Check past history and upcoming booked slots.</p>
          <Link to="/appointments" className="inline-block px-4 py-2 bg-gray-100 text-blue-600 rounded border hover:bg-gray-200">
            View History
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <Router>
      <nav className="bg-white border-b px-8 py-4 flex justify-between items-center shadow-sm">
        <Link to="/" className="font-bold text-xl text-blue-600">HealthCare+</Link>
        <div className="space-x-4 flex items-center">
          <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
          <Link to="/appointments" className="text-gray-700 hover:text-blue-600">My Appointments</Link>
          {user ? (
            <div className="flex items-center space-x-3">
              <span className="text-sm font-semibold text-gray-700">Hi, {user.name}</span>
              <button onClick={handleLogout} className="text-sm text-red-600 hover:underline">Logout</button>
            </div>
          ) : (
            <Link to="/login" className="text-blue-600 font-medium hover:underline">Login</Link>
          )}
        </div>
      </nav>

      <main className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/book" element={<BookAppointment />} />
          <Route path="/appointments" element={<MyAppointments />} />
        </Routes>
      </main>
    </Router>
  );
}