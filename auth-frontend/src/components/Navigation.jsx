/**
 * Navigation Component
 * Displays user navigation with logout functionality
 * Shows different content based on authentication status
 */

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { logout, getCurrentUser, isAuthenticated } from '../utils/auth';

const Navigation = () => {
  // React Router hooks for navigation and current location
  const navigate = useNavigate(); // Function to programmatically navigate
  const location = useLocation(); // Current page location/path
  
  // Get current user information from JWT token
  const user = getCurrentUser();
  const isLoggedIn = isAuthenticated();

  /**
   * Handle logout button click
   * This function demonstrates the complete logout flow
   */
  const handleLogout = () => {
    try {
      // Show confirmation dialog (optional but good UX)
      const confirmLogout = window.confirm(
        'Are you sure you want to logout?'
      );
      
      if (!confirmLogout) {
        return; // User cancelled logout
      }
      
      // Perform logout using our utility function
      // This will:
      // 1. Remove token from localStorage
      // 2. Clear user session data
      // 3. Redirect to login page
      const logoutSuccess = logout(navigate, '/login');
      
      if (logoutSuccess) {
        // Optional: Show success message
        alert('You have been logged out successfully!');
      }
      
    } catch (error) {
      console.error('🚨 Logout error:', error);
      alert('Error during logout. Please try again.');
    }
  };

  /**
   * Navigation Links Helper
   * Determines which links to show based on authentication status
   */
  const getNavigationLinks = () => {
    if (isLoggedIn) {
      // User is authenticated - show authenticated navigation
      return (
        <>
          <a 
            href="/dashboard" 
            className={location.pathname === '/dashboard' ? 'active' : ''}
          >
            Dashboard
          </a>
          <a 
            href="/test" 
            className={location.pathname === '/test' ? 'active' : ''}
          >
            Test Protected
          </a>
        </>
      );
    } else {
      // User is not authenticated - show public navigation
      return (
        <>
          <a 
            href="/login" 
            className={location.pathname === '/login' ? 'active' : ''}
          >
            Login
          </a>
          <a 
            href="/signup" 
            className={location.pathname === '/signup' ? 'active' : ''}
          >
            Sign Up
          </a>
          <a 
            href="/forgot-password" 
            className={location.pathname === '/forgot-password' ? 'active' : ''}
          >
            Forgot Password
          </a>
        </>
      );
    }
  };

  return (
    <nav style={styles.navbar}>
      {/* Left side - App title and navigation links */}
      <div style={styles.leftSection}>
        <h3 style={styles.logo}>🔐 Auth System</h3>
        
        <div style={styles.navLinks}>
          {getNavigationLinks()}
        </div>
      </div>

      {/* Right side - User info and logout */}
      <div style={styles.rightSection}>
        {isLoggedIn ? (
          // Authenticated user section
          <div style={styles.userSection}>
            {/* Display user information */}
            <div style={styles.userInfo}>
              <span style={styles.userEmail}>
                👤 {user?.email || 'User'}
              </span>
              <small style={styles.userDetails}>
                Logged in
              </small>
            </div>
            
            {/* Logout button */}
            <button 
              onClick={handleLogout}
              style={styles.logoutButton}
              title="Click to logout"
            >
              🚪 Logout
            </button>
          </div>
        ) : (
          // Non-authenticated user section
          <div style={styles.guestSection}>
            <span style={styles.guestText}>Welcome, Guest</span>
          </div>
        )}
      </div>
    </nav>
  );
};

/**
 * Component Styles
 * Inline styles for demonstration - in a real app, use CSS modules or styled-components
 */
const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#f8f9fa',
    borderBottom: '1px solid #dee2e6',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
  },
  logo: {
    margin: 0,
    color: '#495057',
    fontSize: '1.5rem',
  },
  navLinks: {
    display: 'flex',
    gap: '1rem',
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  userEmail: {
    fontWeight: 'bold',
    color: '#495057',
  },
  userDetails: {
    color: '#6c757d',
    fontSize: '0.8rem',
  },
  logoutButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    transition: 'background-color 0.2s',
  },
  guestSection: {
    color: '#6c757d',
  },
  guestText: {
    fontSize: '0.9rem',
  },
};

// Add hover effect for logout button
styles.logoutButton[':hover'] = {
  backgroundColor: '#c82333',
};

export default Navigation; 