import React, { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

import './CreateEmployeeForm.css';
function CreateEmployeeForm(){

    const [formData, setFormData]=useState(
        {
            name:"",
            email:"",
            designation:"",
            salary:0
        }
    )

    const handleChange=(e)=>{
        const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    }

    const handleSubmit=async (e)=>{
       e.preventDefault();

       try {
        const response=await fetch(`${API_URL}/employees/add`,{
            method:'POST',
            headers:{
          'Content-Type': 'application/json', // Tells the backend we are sending JSON data
        },
        body: JSON.stringify(formData),
        });
       if (response.ok) {
        alert('Employee added successfully!');
        // 3. Clear the form fields after successful insert
        setEmployee({ name: '', email: '', designation: '',salary:'' });
      } else {
        alert('Failed to add employee.');
      }
       } catch (error) {
        console.error('Error connecting to backend:', error);
       }
    }
    return(
        <>
<div className="form-container">
      <h2>Add New Employee</h2>
      
      <form onSubmit={handleSubmit}>
        {/* 🌟 2. Har row ko 'form-group' class di hai perfect spacing ke liye */}
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-input" required placeholder="Enter Employee name:" />
        </div>
        
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-input" required placeholder="Enter Employee email id:"/>
        </div>
        
        <div className="form-group">
          <label>Designation:</label>
          {/* 💡 FIXED VALUE: Yahan value={formData.designation} kiya hai */}
          <input type="text" name="designation" value={formData.designation} onChange={handleChange} className="form-input" required placeholder="Enter Employee designation:"/>
        </div>
        
        <div className="form-group">
          <label>Salary:</label>
          <input type="number" name="salary" value={formData.salary} onChange={handleChange} className="form-input" required placeholder="Enter Employee salary:"/>
        </div>
        
        {/* 🌟 3. Button ko 'btn-submit' class di hai dynamic active state ke sath */}
        <button type="submit" className="btn-submit">Add Employee</button>
      </form>
    </div>
        </>
    )
}
export default CreateEmployeeForm;