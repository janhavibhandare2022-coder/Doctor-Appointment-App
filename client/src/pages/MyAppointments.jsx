import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = user._id || user.id;

      if (!userId) {
        console.error("User ID not found in localStorage");
        return;
      }

      const res = await axios.get(`https://doctor-appointment-app-3xse.onrender.com/api/appointments/user/${userId}`);
      console.log("Fetched appointments:", res.data);
      setAppointments(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) {
      return;
    }

    try {
      await axios.delete(`https://doctor-appointment-app-3xse.onrender.com/api/appointments/${id}`);
      setAppointments((prev) => prev.filter((item) => item._id !== id));
      alert("Appointment cancelled successfully!");
    } catch (err) {
      console.error("Error cancelling appointment:", err);
      alert("Failed to cancel appointment");
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "30px auto", padding: "20px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px", color: "#333" }}>
        My Appointments
      </h2>

      {appointments.length === 0 ? (
        <p style={{ color: "#666" }}>No appointments found.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {appointments.map((apt) => (
            <div
              key={apt._id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                backgroundColor: "#ffffff",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
              }}
            >
              <div>
                <h4 style={{ margin: "0 0 6px 0", color: "#2563eb", fontSize: "18px" }}>
                  {apt.department || apt.doctorName || "General Consultation"}
                </h4>
                <p style={{ margin: "4px 0", color: "#475569", fontSize: "14px" }}>
                  <strong>Date:</strong> {apt.date || apt.appointmentDate || "N/A"} |{" "}
                  <strong>Time:</strong> {apt.time || apt.slot || "N/A"}
                </p>
                {apt.patientName && (
                  <p style={{ margin: "2px 0", color: "#64748b", fontSize: "13px" }}>
                    Patient: {apt.patientName}
                  </p>
                )}
                {apt.comments && (
                  <p style={{ margin: "2px 0", color: "#64748b", fontSize: "13px" }}>
                    Notes: {apt.comments}
                  </p>
                )}
              </div>

              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px" }}>
                <span
                  style={{
                    backgroundColor: "#dcfce7",
                    color: "#15803d",
                    padding: "4px 10px",
                    borderRadius: "12px",
                    fontSize: "12px",
                    fontWeight: "600",
                  }}
                >
                  Confirmed
                </span>
                <button
                  onClick={() => handleCancel(apt._id)}
                  style={{
                    backgroundColor: "#ef4444",
                    color: "#ffffff",
                    border: "none",
                    padding: "6px 14px",
                    borderRadius: "6px",
                    fontSize: "12px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}