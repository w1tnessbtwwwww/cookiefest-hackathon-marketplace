import { jwtDecode } from "jwt-decode";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const getCookies = (): Record<string, string> => {
    return document.cookie.split("; ").reduce((acc, cookie) => {
      const [key, value] = cookie.split("=");
      acc[key] = decodeURIComponent(value);
      return acc;
    }, {} as Record<string, string>);
  };

  // Проверка токена в cookies
  useEffect(() => {
    const checkAuth = () => {
      const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
        const [key, value] = cookie.split("=");
        acc[key] = decodeURIComponent(value || "");
        return acc;
      }, {} as Record<string, string>);
  
      const rawToken = cookies["jwt_token"];
  
      if (rawToken) {
        try {
          // Проверяем, что токен состоит из трех частей
          if (rawToken.split(".").length === 3) {
            const decodedToken = jwtDecode(rawToken);
            console.log("Decoded Token:", decodedToken);
  
            // Проверка на истечение токена
            if (decodedToken && typeof decodedToken === "object" && "exp" in decodedToken) {
              const currentTime = Math.floor(Date.now() / 1000);
              if ((decodedToken as { exp: number }).exp < currentTime) {
                console.warn("Token expired");
                setIsAuthenticated(false);
                return;
              }
            }
  
            setIsAuthenticated(true);
          } else {
            console.error("Invalid JWT format");
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error("Invalid JWT token:", error);
          setIsAuthenticated(false);
        }
      } else {
        console.log("JWT token not found");
        setIsAuthenticated(false);
      }
    };
  
    checkAuth();
  
    const interval = setInterval(checkAuth, 60000); // Проверка каждые 1 сек.
    return () => clearInterval(interval);
  }, []);
  

  const login = () => setIsAuthenticated(true);

  const logout = () => {
    document.cookie = "jwt_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax; Secure";
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
