import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Recuperar el token de autenticación almacenado en localStorage
  const initialToken = localStorage.getItem('authToken');
  const [token, setToken] = useState(initialToken);
  const isAuthenticated = !!token; // Verificar si el token existe

  const login = (newToken) => {
    // Al iniciar sesión, actualiza el token y guárdalo en localStorage
    setToken(newToken);
    localStorage.setItem('authToken', newToken);
  };

  const logout = () => {
    // Al cerrar sesión, elimina el token de localStorage
    setToken(null);
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout,token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
