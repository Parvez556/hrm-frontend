import React, { useState } from "react";
import CreateEmployeeForm from "./CreateEmployeeForm"; // Aapka Add Form wala component
import GetEmployee from "./GetEmployee";     // Aapka Table/List wala component
import "./GetEmployee.css";                    // Aapki purani CSS file
import LeaveDashboard from "./components/LeaveDashboard";
function Home() {
  // 🌟 Yeh state track karegi ki screen par kaunsa component dikhana hai
  // Default value humne 'list' rakhi hai taaki pehle table dikhe
  const [currentView, setCurrentView] = useState("list");

  return (
    <div className="container">
      
      {/* 🌐 NAVIGATION BAR */}
      <nav className="navbar">
        <div className="nav-logo">
          <img src="https://cdn-icons-png.flaticon.com/512/912/912318.png" alt="HRM Logo" />
          <span>HRM Dashboard</span>
        </div>
        
        <div className="nav-links">
          {/* Button 1: Click karne par 'list' view set hoga */}
          <button 
            className={`nav-btn ${currentView === "list" ? "active" : ""}`} 
            onClick={() => setCurrentView("list")}
          >
            View Employees
          </button>

          {/* Button 2: Click karne par 'create' view set hoga */}
          <button 
            className={`nav-btn ${currentView === "create" ? "active" : ""}`} 
            onClick={() => setCurrentView("create")}
          >
            Create Employee
          </button>
          <button 
            className={`nav-btn ${currentView === "leaves" ? "active" : ""}`} 
            onClick={() => setCurrentView("leaves")}
          >
            Leave Portal
          </button>
        </div>
      </nav>

      {/* 🧩 DYNAMIC COMPONENT RENDERING AREA */}
      <div className="content-area">
        
        {/* Agar currentView 'list' hai, toh GetEmployees component load hoga */}
        {currentView === "list" && <GetEmployee />}

        {/* Agar currentView 'create' hai, toh CreateEmployee component load hoga */}
        {currentView === "create" && <CreateEmployeeForm />}
        {currentView === "leaves" && <LeaveDashboard />}
      </div>

    </div>
  );
}

export default Home;