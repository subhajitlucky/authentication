import React, { useState } from "react";
import axios from "axios";



const Login = () => {
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
        //extract jwt token from response
        const {token} = response.data;

        //save token in local storage
        localStorage.setItem("authToken", token);

        setSuccess("Login successful!");
        setEmail("");
        setPassword("");
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
