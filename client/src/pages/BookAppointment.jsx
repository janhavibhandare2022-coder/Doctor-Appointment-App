import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function BookAppointment() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  const [formData, setFormData] = useState({
    patientName: user.name || '',
    department: 'General Physician',
    date: '',
    time: '',
    comments: ''
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user._id) {
      alert('Please log in first to book an appointment.');
      return navigate('/login');
    }

    const data = new FormData();
    data.append('patientId', user._id);
    data.append('patientName', formData.patientName);
    data.append('department', formData.department);
    data.append('date', formData.date);
    data.append('time', formData.time);
    data.append('comments', formData.comments);
    if (file) data.append('reportFile', file);

    try {
      setLoading(true);
      await axios.post('https://doctor-appointment-app-3xse.onrender.com/api/appointments/book', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Appointment booked successfully!');
      navigate('/appointments');
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to book appointment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white border rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">Book an Appointment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Patient Name</label>
          <input
            type="text"
            required
            value={formData.patientName}
            onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
            className="w-full mt-1 p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Department</label>
          <select
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            className="w-full mt-1 p-2 border rounded-md"
          >
            <option>General Physician</option>
            <option>Cardiology</option>
            <option>Neurology</option>
            <option>Orthopedics</option>
            <option>Gynecology</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              required
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full mt-1 p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Time</label>
            <input
              type="time"
              required
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="w-full mt-1 p-2 border rounded-md"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Upload Past Report (Optional)</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full mt-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Comments / Symptoms</label>
          <textarea
            rows="3"
            onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
            className="w-full mt-1 p-2 border rounded-md"
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Booking...' : 'Confirm Appointment'}
        </button>
      </form>
    </div>
  );
}