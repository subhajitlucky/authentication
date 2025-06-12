// Import axios HTTP client library
import axios from 'axios';

/**
 * Centralized API Configuration
 * This file creates a configured axios instance that automatically handles:
 * - Base URL configuration
 * - Authentication headers
 * - Token expiration
 * - Error handling
 */

// Create axios instance with base configuration
const api = axios.create({
  // Use environment variable for API URL, fallback to localhost for development
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  timeout: 10000, // 10 second timeout for all requests
  headers: {
    'Content-Type': 'application/json', // Default content type for requests
  },
});

/**
 * Request Interceptor
 * Automatically adds JWT token to all outgoing requests
 * This runs before every API request is sent
 */
api.interceptors.request.use(
  (config) => {
    // Retrieve JWT token from browser's localStorage
    const token = localStorage.getItem('authToken');
    
    // If token exists, add it to Authorization header in Bearer format
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Return the modified config to proceed with the request
    return config;
  },
  (error) => {
    // Handle request setup errors
    console.error('🚨 Request setup error:', error);
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * Handles responses and errors globally
 * Automatically manages token expiration and cleanup
 */
api.interceptors.response.use(
  (response) => {
    // For successful responses, just return the response
    return response;
  },
  (error) => {
    // Handle authentication errors (401 Unauthorized, 403 Forbidden)
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Remove invalid/expired token from localStorage
      localStorage.removeItem('authToken');
      
      // Log the issue for debugging
      console.log('🔒 Token expired or invalid. Please login again.');
      
      // In a real app, you might redirect to login page here:
      // window.location.href = '/login';
    }
    
    // Re-throw the error so components can handle it
    return Promise.reject(error);
  }
);

export default api; 