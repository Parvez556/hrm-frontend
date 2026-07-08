import React, { useState, useEffect } from "react";
// import "./GetEmployee.css";
const API_URL = import.meta.env.VITE_API_URL;
function HRLeavePanel() {
  const [leaves, setLeaves] = useState([]);
  const [searchId, setSearchId] = useState("");

  const fetchMasterData = async () => {
    try {
      let url = `${API_URL}/leaves/hr/all`;
      // If user typed an ID, use employee route context natively
      if (searchId.trim() !== "") {
        url = `${API_URL}/leaves/employee/${searchId}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setLeaves(data);
    } catch (error) {
      console.error("Error loading admin system mapping:", error);
    }
  };

  useEffect(() => {
    fetchMasterData();
  }, [searchId]);

  const processStatus = async (id, decision) => {
    try {
      const response = await fetch(`${API_URL}/leaves/hr/review/${id}?status=${decision}`, {
        method: "PUT"
      });
      if (response.ok) {
        alert(`Request status updated to ${decision}`);
        fetchMasterData();
      }
    } catch (error) {
      console.error("Error modifying workflow status:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "between", alignItems: "center", marginBottom: "15px" }}>
        <h2>HR Global Leave Management</h2>
        <input 
          type="number" 
          placeholder="Search by Employee ID..." 
          value={searchId} 
          onChange={(e) => setSearchId(e.target.value)}
          style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc", width: "220px" }}
        />
      </div>

      <table className="employee-table">
        <thead>
          <tr>
            <th>Emp Name (ID)</th>
            <th>Type</th>
            <th>Dates</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Review Decision</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((l) => (
            <tr key={l.id}>
              <td><strong>{l.employeeName}</strong> (ID: {l.employeeId})</td>
              <td>{l.leaveType}</td>
              <td>{l.startDate} to {l.endDate}</td>
              <td>{l.reason}</td>
              <td><span className={`badge badge-${l.status.toLowerCase()}`}>{l.status}</span></td>
              <td>
                {l.status === "PENDING" ? (
                  <>
                    <button className="btn-approve" onClick={() => processStatus(l.id, "APPROVED")}>Approve</button>
                    <button className="btn-reject" onClick={() => processStatus(l.id, "REJECTED")}>Reject</button>
                  </>
                ) : (
                  <span style={{ color: "#aaa" }}>Settled</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HRLeavePanel;