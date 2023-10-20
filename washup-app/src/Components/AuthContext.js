import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const login = (token) => {
    // Lógica de autenticación en el backend
    // Si la autenticación es exitosa, llama a setIsAuthenticated(true)
    setToken(token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Lógica para cerrar la sesión del usuario
    setToken(null);
    setIsAuthenticated(false);
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
