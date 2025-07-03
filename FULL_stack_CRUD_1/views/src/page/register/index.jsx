import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { submitUserDetails } from "./submitUserDetails";

const Register = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    username: "",
    pass: "",
    email: "",
  });

  const handleUserDetails = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    // console.log(userDetails)
      const { username, pass, email } = userDetails;

    if (!username.trim() || !pass.trim() || !email.trim()) {
      alert("Please fill all the fields");
      return;
    }
      try {
        const result = await submitUserDetails(userDetails);
        alert("user has been registered successfully");
        console.log(result);
        navigate("/login");
      } catch (error) {
        console.log("error in registering");
      }
    
  };

  return (
    <div>
      <h2>Please Register here!</h2>
      <div>
        <input
          type="email"
          placeholder="Enter Email"
          name="email"
          value={userDetails.email}
          onChange={(e) => handleUserDetails(e)}
          required
        />
        <br></br>
        <br></br>

        <input
          type="text"
          placeholder="Enter Username"
          name="username"
          value={userDetails.username}
          onChange={(e) => handleUserDetails(e)}
          required
        />
        <br></br>
        <br></br>
        <input
          type="password"
          placeholder="Enter Password"
          name="pass"
          value={userDetails.pass}
          onChange={(e) => handleUserDetails(e)}
          required
        />
        <br></br>
        <br></br>
        
        <div>
          <button style={{cursor:"pointer"}} onClick={handleSubmit}>Register</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
