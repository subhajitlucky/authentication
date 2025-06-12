import React, { useState } from 'react';
import api from '../utils/api';

const TestProtected = () => {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testProtectedRoute = async () => {
    setLoading(true);
    setResult('');

    try {
      const response = await api.get('/protected');
      setResult(`✅ Success: ${response.data}`);
    } catch (error) {
      if (error.response) {
        setResult(`❌ Error: ${error.response.data.error || error.response.data}`);
      } else {
        setResult(`❌ Network Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const clearToken = () => {
    localStorage.removeItem('authToken');
    setResult('🗑️ Token cleared from localStorage');
  };

  const checkToken = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setResult(`🔑 Token exists: ${token.substring(0, 30)}...`);
    } else {
      setResult('❌ No token found in localStorage');
    }
  };

  return (
    <div >
      <h3>🧪 JWT Authentication Test</h3>
      
      <div >
        <button onClick={testProtectedRoute} disabled={loading}>
          {loading ? 'Testing...' : 'Test Protected Route'}
        </button>
        
        <button onClick={checkToken} >
          Check Token
        </button>
        
        <button onClick={clearToken} >
          Clear Token
        </button>
      </div>

      {result && (
        <div >
          <pre>{result}</pre>
        </div>
      )}

      <div >
        <strong>How to test:</strong>
        <ol>
          <li>First login to get a token</li>
          <li>Click "Test Protected Route" - should work</li>
          <li>Click "Clear Token" then test again - should fail</li>
        </ol>
      </div>
    </div>
  );
};

export default TestProtected; 