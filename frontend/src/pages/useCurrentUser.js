import { useState, useEffect } from 'react';

export function useCurrentUser() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    setCurrentUser(user);
  }, []);

  return currentUser;
}