import React, { useState } from "react";
import ApplyLeaveForm from "./ApplyLeaveForm";
import ViewMyStatus from "./ViewMyStatus";
import HRLeavePanel from "./HRLeavePanel";

function LeaveDashboard() {
  const [view, setView] = useState("apply"); // Switching options: 'apply' | 'status' | 'hr'

  return (
    <div className="container">
      {/* Module Navbar Header */}
      <div className="navbar" style={{ backgroundColor: "#34495e" }}>
        <div className="nav-logo">
          <span>📅 Leave Portal</span>
        </div>
        <div className="nav-links">
          <button className={`nav-btn ${view === "apply" ? "active" : ""}`} onClick={() => setView("apply")}>Apply Leave</button>
          <button className={`nav-btn ${view === "status" ? "active" : ""}`} onClick={() => setView("status")}>My Status Tracker</button>
          <button className={`nav-btn ${view === "hr" ? "active" : ""}`} onClick={() => setView("hr")}>HR Portal</button>
        </div>
      </div>

      {/* Structural Isolated Shell injection */}
      <div className="content-area">
        {view === "apply" && <ApplyLeaveForm />}
        {view === "status" && <ViewMyStatus />}
        {view === "hr" && <HRLeavePanel />}
      </div>
    </div>
  );
}

export default LeaveDashboard;