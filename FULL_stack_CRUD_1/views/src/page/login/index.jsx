import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "./loginUser";

const Login = () => {

  const [userDetails, setUserDetails] = useState({
    pass: "",
    email: "",
  });

  const navigate = useNavigate()

  const handleUserDetails = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

const handleSubmit= async()=>{
  if(userDetails){
    try {
      const result=await loginUser(userDetails)
      console.log(result);
      if(result.token){
        alert("user has been logged in successfully")
        navigate("/")
      }else{
        alert("wrong password")
      }

    } catch (error) {
      console.log(error);
      alert(error)
    }
  }
}

  return (
    <div>
      <h2>Please Login here!</h2>
      <div>
        <input
          type="email"
          placeholder="Enter Email"
          name="email"
          value={userDetails.email}
          onChange={(e) => handleUserDetails(e)}
        />
        <br></br>
        <br></br>


        <input
          type="password"
          placeholder="Enter Password"
          name="pass"
          value={userDetails.pass}
          onChange={(e) => handleUserDetails(e)}
        />
        <br></br>
        <br></br>

        <div>
          <button style={{cursor:"pointer"}} onClick={handleSubmit}>
            LOGIN
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
