import React, { useState, useEffect } from "react";
import "./GetEmployee.css"; // 👈 1. Importing the CSS file here!
const API_URL = import.meta.env.VITE_API_URL;

function GetEmployee() {
  const [employees, setEmployees] = useState([]);
  const [isEditing, setIsEditing] = useState(false); 
  const [editId, setEditId] = useState(null);       
  const [formData, setFormData] = useState({        
    name: "",
    email: "",
    designation: "",
    salary: "",
  });

  // GET ALL EMPLOYEES
  const handleClick = async () => {
    try {
      const response = await fetch(`https://hrm-backend-4dan.onrender.com/employees/allEmployees`); 
      const data = await response.json();
      setEmployees(data); 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Automatically load data when component loads
  useEffect(() => {
    handleClick();
  }, []);

  // DELETE EMPLOYEE
  const deleteEmployee = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        const response = await fetch(`${API_URL}/employees/delete/${id}`, { method: "DELETE" });
        if (response.ok) {
          alert("Employee deleted successfully!");
          handleClick(); 
        }
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  // EDIT ACTION TRIGGER
  const editEmployee = (id) => {
    const selectedEmployee = employees.find((emp) => emp.id === id);
    if (selectedEmployee) {
      setEditId(id);
      setFormData({
        name: selectedEmployee.name,
        email: selectedEmployee.email,
        designation: selectedEmployee.designation,
        salary: selectedEmployee.salary,
      });
      setIsEditing(true); 
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // UPDATE EMPLOYEE (PUT)
  const handleUpdateSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const response = await fetch(`${API_URL}/employees/update/${editId}`, {
        method: "PUT", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), 
      });

      if (response.ok) {
        alert("Employee details updated successfully!");
        setIsEditing(false); 
        handleClick(); 
      }
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  return (
    <div className="container">
      <h2>All Employees Data</h2>
      <button className="btn-primary" onClick={handleClick}>Refresh Directory</button>

      {/* --- Upgraded from List to Clean Modern Table --- */}
      {employees.length > 0 ? (
        <table className="employee-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Designation</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, index) => (
              <tr key={emp.id || index}>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.designation}</td>
                <td>${emp.salary}</td>
                <td>
                  <button className="btn-edit" onClick={() => editEmployee(emp.id)}>Edit</button>
                  <button className="btn-delete" onClick={() => deleteEmployee(emp.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ marginTop: '20px' }}>No employee data loaded yet.</p>
      )}

      {/* --- POPUP MODAL FORM --- */}
      {isEditing && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Modify Details</h3>
            
            <form onSubmit={handleUpdateSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Designation</label>
                <input type="text" name="designation" value={formData.designation} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Salary</label>
                <input type="number" name="salary" value={formData.salary} onChange={handleInputChange} required />
              </div>

              <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                <button type="submit" className="btn-update">Update</button>
                <button type="button" className="btn-cancel" onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default GetEmployee;