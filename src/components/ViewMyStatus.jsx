import React, { useState, useEffect } from "react";

function ViewMyStatus() {
  const [myLeaves, setMyLeaves] = useState([]);
  const [mockId] = useState(1); // Employee Session ID
  
  // Edit workflow states
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ id: "", startDate: "", endDate: "", leaveType: "", reason: "" });

  const fetchHistory = async () => {
    try {
      const response = await fetch(`https://hrm-backend-4dan.onrender.com/leaves/employee/${mockId}`);
      const data = await response.json();
      setMyLeaves(data);
    } catch (error) {
      console.error("Error fetching individual tracks:", error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const openEditModal = (leave) => {
    setEditForm({ ...leave });
    setIsEditing(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8084/leaves/update/${editForm.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm)
      });
      if (response.ok) {
        alert("Leave documentation corrected successfully!");
        setIsEditing(false);
        fetchHistory(); // Refresh locally
      } else {
        const errorText = await response.text();
        alert(errorText || "Failed to update.");
      }
    } catch (error) {
      console.error("Error updating leave:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Leave Applications Status</h2>
      <table className="employee-table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Duration</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {myLeaves.map((leave) => (
            <tr key={leave.id}>
              <td>{leave.leaveType}</td>
              <td>{leave.startDate} to {leave.endDate}</td>
              <td>{leave.reason}</td>
              <td><span className={`badge badge-${leave.status.toLowerCase()}`}>{leave.status}</span></td>
              <td>
                {leave.status === "PENDING" ? (
                  <button className="btn-edit" onClick={() => openEditModal(leave)}>Modify</button>
                ) : (
                  <span style={{ color: "#aaa" }}>Locked</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Isolation Modal Wrapper */}
      {isEditing && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Correct Leave Details</h3>
            <form onSubmit={handleUpdateSubmit}>
              <div className="form-group">
                <label>Start Date</label>
                <input type="date" value={editForm.startDate} onChange={(e) => setEditForm({...editForm, startDate: e.target.value})} className="form-input" required />
              </div>
              <div className="form-group">
                <label>End Date</label>
                <input type="date" value={editForm.endDate} onChange={(e) => setEditForm({...editForm, endDate: e.target.value})} className="form-input" required />
              </div>
              <button type="submit" className="btn-update">Save Changes</button>
              <button type="button" className="btn-cancel" onClick={() => setIsEditing(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewMyStatus;