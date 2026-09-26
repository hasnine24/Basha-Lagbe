import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { useToast } from "../pages/tahmid/Toast";

const AuthContext = createContext(null);


export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used inside AuthProvider");
  }

  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    let active = true;

    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get("/users/profile");
        if (active) setUser(response.data);
      } catch {
        if (active) setUser(null);
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchProfile();

    return () => {
      active = false;
    };
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axiosInstance.post("/auth/login", { email, password });
      setUser(response.data);
      showSuccess("Login successful.");
      navigate("/");
    } catch (error) {
      showError(error.response?.data?.error || "Login failed. Please try again.");
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      setUser(null);
      showSuccess("Logout successful.");
      navigate("/login");
    } catch (error) {
      showError(error.response?.data?.error || "Logout failed. Please try again.");
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
