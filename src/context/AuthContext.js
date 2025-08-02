import { createContext, useContext, useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (err) {
        console.error('Invalid token');
        setUser(null);
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
