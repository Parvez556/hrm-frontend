import React, { useState } from "react";
// import "./GetEmployee.css";

function ApplyLeaveForm() {
  const [formData, setFormData] = useState({
    employeeId: 1, // Simulating logged-in session ID
    employeeName: "Rahul Sharma",
    startDate: "",
    endDate: "",
    leaveType: "Sick Leave",
    reason: ""
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://hrm-backend-4dan.onrender.com/leaves/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        alert("Leave applied successfully!");
        setFormData({ ...formData, startDate: "", endDate: "", reason: "" }); // Reset
      } else {
        alert("Submission failed.");
      }
    } catch (error) {
      console.error("Error applying leave:", error);
    }
  };

  return (
    <div className="form-container" style={{ margin: "20px auto" }}>
      <h2>Apply for Leave</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Leave Type</label>
          <select name="leaveType" value={formData.leaveType} onChange={handleInputChange} className="form-input">
            <option value="Sick Leave">Sick Leave</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Paid Leave">Paid Leave</option>
          </select>
        </div>
        <div className="form-group">
          <label>Start Date</label>
          <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} className="form-input" required />
        </div>
        <div className="form-group">
          <label>End Date</label>
          <input type="date" name="endDate" value={formData.endDate} onChange={handleInputChange} className="form-input" required />
        </div>
        <div className="form-group">
          <label>Reason</label>
          <textarea name="reason" value={formData.reason} onChange={handleInputChange} className="form-input" rows="3" required />
        </div>
        <button type="submit" className="btn-submit">Submit Application</button>
      </form>
    </div>
  );
}

export default ApplyLeaveForm;