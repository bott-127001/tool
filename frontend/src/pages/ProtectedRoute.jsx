import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';

function ProtectedRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 5;
    const delay = 500; // 0.5 seconds

    const checkAuth = async () => {
      attempts++;
      try {
        const response = await axios.get('/api/auth/current-user');
        if (response.data.user) {
          // Success! Store the user and set authenticated state.
          localStorage.setItem('currentUser', response.data.user);
          setIsAuthenticated(true);
          return; 
        }
      } catch (error) {
        console.error(`Auth check attempt ${attempts} failed:`, error);
      }

      // If the check failed, decide whether to retry or fail.
      if (attempts < maxAttempts) {
        setTimeout(checkAuth, delay);
      } else {
        // All attempts failed, so we are not authenticated.
        setIsAuthenticated(false); // All attempts failed
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) return <div>Loading...</div>; // Or a spinner component
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;