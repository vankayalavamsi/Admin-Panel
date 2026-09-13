import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("adminUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (email, password) => {
    if (!email || !password) {
      return {
        success: false,
        message: "Please enter email and password."
      };
    }

    const loggedInUser = {
      id: 1,
      name: "Admin User",
      email
    };

    localStorage.setItem("adminUser", JSON.stringify(loggedInUser));
    setUser(loggedInUser);

    return {
      success: true
    };
  };

  const logout = () => {
    localStorage.removeItem("adminUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: Boolean(user)
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}