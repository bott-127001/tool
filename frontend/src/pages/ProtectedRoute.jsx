import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';

function ProtectedRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 10; // Increased attempts for more resilience (5 seconds total wait)
    const delay = 500; // 0.5 seconds

    const checkAuth = async () => {
      attempts++;
      console.log(`[ProtectedRoute] Attempt ${attempts}/${maxAttempts} to check authentication...`);
      try {
        const response = await axios.get('/api/auth/current-user');
        console.log(`[ProtectedRoute] Response from /api/auth/current-user (Attempt ${attempts}):`, response.data);

        if (response.data && response.data.user) { // Ensure response.data exists and user is not null/undefined
          // Success! Store the user and set authenticated state.
          localStorage.setItem('currentUser', response.data.user);
          setIsAuthenticated(true);
          console.log(`[ProtectedRoute] Authentication successful for user: ${response.data.user}`);
          return; // Stop retrying on success
        }
        console.log(`[ProtectedRoute] No authenticated user found in response.data.user for attempt ${attempts}.`);
      } catch (error) {
        console.error(`[ProtectedRoute] Auth check attempt ${attempts} failed with error:`, error);
      }

      // If the check failed, decide whether to retry or fail.
      if (attempts < maxAttempts) {
        setTimeout(checkAuth, delay);
      } else {
        // All attempts failed, so we are not authenticated.
        console.log('[ProtectedRoute] Max attempts reached. User not authenticated. Redirecting to login.');
        localStorage.removeItem('currentUser'); // Clear any stale user
        setIsAuthenticated(false); // All attempts failed
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) return <div>Loading...</div>; // Or a spinner component
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;