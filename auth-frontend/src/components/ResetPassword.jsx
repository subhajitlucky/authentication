import React, { useState } from "react";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic Validation
    if (!email) {
      setError("Email is required.");
      return;
    }

    setError(""); // Clear errors
    console.log("Reset Password Request for:", email);

    // Simulate sending a reset link
    setMessage("If this email is registered, a reset link has been sent.");
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {error && <p>{error}</p>}
        {message && <p>{message}</p>}
        <button type="submit">Send Reset Link</button>
      </form>
      <p>
        Back to <a href="/login">Login</a>
      </p>
    </div>
  );
};

export default ResetPassword;
