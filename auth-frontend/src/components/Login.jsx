import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setToken } from "../utils/auth";

const Login = () => {
  // React Router navigation hook
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic Validation
    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }

    setError(""); // Clear errors
    setSuccess(""); // Clear success message
    console.log("Login details:", { email, password });
    // API request will be added later
    try{
      
      const response = await axios.post("http://localhost:5000/login", { email, password });
      
      // Check if the response status is 200
      if(response.status === 200){
        // Extract JWT token from response
        const {token} = response.data;

        // Save token using our auth utility (better practice)
        setToken(token);

        setSuccess("Login successful!");
        
        // Clear form fields
        setEmail("");
        setPassword("");
        
        // Navigate to test page after successful login
        setTimeout(() => {
          navigate("/test");
        }, 1000); // Small delay to show success message
      }
    
    
    }catch(error){
      
      if(error.response && error.response.data){
        setError(error.response.data);
      }else{
        setError("Error logging in. Please try again.");
      }
    }

  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p>{error}</p>}
        {success && <p>{success}</p>}
        <button type="submit">Login</button>
      </form>
      <p>
        Don’t have an account? <a href="/signup">Sign up</a>
      </p>
        <p>
            Forgot password? <a href="/forgot-password">Forgot password</a>
        </p>
    </div>
  );
};

export default Login;
