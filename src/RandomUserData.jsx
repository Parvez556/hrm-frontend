import React, { useState, useEffect } from "react";

function RandomeUserData() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8084/employees/allEmployees')
      .then(response => response.json())
      .then(data => setUserData(data));
  }, [userData]);

  // 1. Loading Guard: If userData is still null, show a loading message instead of crashing
if(!userData){
    return "Data is loading"
}

  // 2. Once userData is loaded, render the specific properties
  return (
    <>
      <h1>Fetch api data using useEffect hooks</h1>
      <div>
        
        <p><strong>Name:</strong> {JSON.stringify(userData[1].name)}</p>
        <p><strong>Email:</strong> </p>
        <p><strong>Username:</strong> </p>
      </div>

      {/* <pre>{JSON.stringify(userData, null, 2)}</pre> */}
    </>
  );
}

export default RandomeUserData;