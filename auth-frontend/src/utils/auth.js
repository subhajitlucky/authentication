/**
 * Authentication Utilities
 * This file contains all client-side authentication logic
 * Handles token management, user state, and authentication helpers
 */

/**
 * Token Management Functions
 * These functions handle JWT token storage and retrieval
 */

/**
 * Get the current JWT token from localStorage
 * @returns {string|null} JWT token or null if not found
 */
export const getToken = () => {
  try {
    // Retrieve token from browser's localStorage
    // localStorage is persistent storage that survives browser restarts
    return localStorage.getItem('authToken');
  } catch (error) {
    // Handle cases where localStorage is not available (private browsing, etc.)
    console.error('🚨 Error accessing localStorage:', error);
    return null;
  }
};

/**
 * Store JWT token in localStorage
 * @param {string} token - JWT token to store
 */
export const setToken = (token) => {
  try {
    if (!token) {
      console.error('🚨 Attempted to store empty token');
      return;
    }
    
    // Store token in localStorage for persistence
    localStorage.setItem('authToken', token);
    console.log('✅ Token stored successfully');
  } catch (error) {
    console.error('🚨 Error storing token:', error);
  }
};

/**
 * Remove JWT token from localStorage (Logout)
 * This is the core logout function
 */
export const removeToken = () => {
  try {
    // Remove token from localStorage
    localStorage.removeItem('authToken');
    console.log('🗑️ Token removed successfully');
  } catch (error) {
    console.error('🚨 Error removing token:', error);
  }
};

/**
 * Check if user is currently authenticated
 * @returns {boolean} True if user has a valid token
 */
export const isAuthenticated = () => {
  const token = getToken();
  
  if (!token) {
    return false;
  }
  
  // Optional: Check if token is expired
  // For now, we just check if token exists
  // In a more advanced implementation, we'd decode and check expiry
  try {
    // Split JWT token to check structure (header.payload.signature)
    const parts = token.split('.');
    if (parts.length !== 3) {
      console.warn('⚠️ Invalid token format');
      removeToken(); // Clean up invalid token
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('🚨 Error validating token:', error);
    removeToken(); // Clean up corrupted token
    return false;
  }
};

/**
 * Decode JWT payload (without verification)
 * @param {string} token - JWT token to decode
 * @returns {object|null} Decoded payload or null if invalid
 */
export const decodeToken = (token = null) => {
  try {
    // Use provided token or get from storage
    const jwtToken = token || getToken();
    
    if (!jwtToken) {
      return null;
    }
    
    // JWT structure: header.payload.signature
    // We want the payload (middle part)
    const parts = jwtToken.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid JWT structure');
    }
    
    // Decode the base64-encoded payload
    const payload = parts[1];
    
    // Add padding if needed (base64 requires padding)
    const paddedPayload = payload + '='.repeat((4 - payload.length % 4) % 4);
    
    // Decode base64 and parse JSON
    const decodedPayload = JSON.parse(atob(paddedPayload));
    
    return decodedPayload;
  } catch (error) {
    console.error('🚨 Error decoding token:', error);
    return null;
  }
};

/**
 * Get current user information from token
 * @returns {object|null} User info or null if not authenticated
 */
export const getCurrentUser = () => {
  const payload = decodeToken();
  
  if (!payload) {
    return null;
  }
  
  // Extract user information from JWT payload
  return {
    id: payload.id,
    email: payload.email,
    // Add other user fields as they become available
    tokenExpiry: new Date(payload.exp * 1000), // Convert Unix timestamp to Date
    issuedAt: new Date(payload.iat * 1000),
  };
};

/**
 * Check if token is expired
 * @returns {boolean} True if token is expired
 */
export const isTokenExpired = () => {
  const payload = decodeToken();
  
  if (!payload || !payload.exp) {
    return true; // Consider missing/invalid tokens as expired
  }
  
  // JWT exp is in seconds, Date.now() is in milliseconds
  const currentTime = Math.floor(Date.now() / 1000);
  const expirationTime = payload.exp;
  
  return currentTime >= expirationTime;
};

/**
 * Complete logout function
 * Removes token and optionally redirects user
 * @param {function} navigate - React Router navigate function (optional)
 * @param {string} redirectTo - Where to redirect after logout (default: '/login')
 */
export const logout = (navigate = null, redirectTo = '/login') => {
  try {
    // 1. Remove token from storage
    removeToken();
    
    // 2. Clear any cached user data (if you have any)
    // For example, you might clear user preferences, etc.
    
    // 3. Log the logout action
    console.log('👋 User logged out successfully');
    
    // 4. Optional: Redirect to login page
    if (navigate && typeof navigate === 'function') {
      navigate(redirectTo);
    }
    
    // 5. Optional: Show success message
    // You could dispatch a notification here
    
    return true;
  } catch (error) {
    console.error('🚨 Error during logout:', error);
    return false;
  }
}; 