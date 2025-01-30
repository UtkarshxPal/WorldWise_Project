import axios from "axios";
import { createContext, useContext, useReducer } from "react";

const BASE_URL = "https://travel-management-worldwise-backend.onrender.com";

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  error: "",
  loading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: "",
      };
    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: "",
      };
    case "setError":
      return { ...state, error: action.payload, loading: false };
    case "setLoading":
      return { ...state, loading: action.payload };
    case "clearError":
      return { ...state, error: "" };
    default:
      throw new Error("Unknown action");
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated, error, loading }, dispatch] = useReducer(
    reducer,
    initialState
  );

  async function login(email, password) {
    try {
      dispatch({ type: "setLoading", payload: true });
      dispatch({ type: "clearError" });

      if (!email || !password) {
        throw new Error("Email and password are required");
      }

      const result = await api.post("/user/login", { email, password });

      if (result.data.success === "true") {
        dispatch({ type: "login", payload: result.data.user });
        return true;
      } else {
        throw new Error(result.data.message || "Login failed");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Could not login";
      dispatch({ type: "setError", payload: errorMessage });
      console.error("Login error:", errorMessage);
      return false;
    } finally {
      dispatch({ type: "setLoading", payload: false });
    }
  }

  async function logout() {
    try {
      dispatch({ type: "setLoading", payload: true });
      dispatch({ type: "clearError" });

      await api.post("/user/logout");
      dispatch({ type: "logout" });
      return true;
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Logout failed";
      dispatch({ type: "setError", payload: errorMessage });
      console.error("Logout error:", errorMessage);
      return false;
    } finally {
      dispatch({ type: "setLoading", payload: false });
    }
  }

  async function signup({ name, email, password }) {
    try {
      dispatch({ type: "setLoading", payload: true });
      dispatch({ type: "clearError" });

      if (!name || !email || !password) {
        throw new Error("Name, email, and password are required");
      }

      const response = await api.post("/user/signup", {
        name,
        email,
        password,
      });

      if (response.data.success === "true") {
        // Automatically log in after successful signup
        return await login(email, password);
      } else {
        throw new Error(response.data.message || "Signup failed");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Could not create account";
      dispatch({ type: "setError", payload: errorMessage });
      console.error("Signup error:", errorMessage);
      return false;
    } finally {
      dispatch({ type: "setLoading", payload: false });
    }
  }

  // Optional: Function to clear errors
  function clearError() {
    dispatch({ type: "clearError" });
  }

  const value = {
    user,
    isAuthenticated,
    error,
    loading,
    login,
    logout,
    signup,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
