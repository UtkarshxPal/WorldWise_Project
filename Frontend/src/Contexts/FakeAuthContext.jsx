import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://worldwise-qg89.onrender.com";
// const BASE_URL = " http://localhost:3000";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  error: "",
  isLoading: true,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case "logout":
      return { ...state, user: null, isAuthenticated: false, isLoading: false };
    case "setError":
      return { ...state, error: action.payload, isLoading: false };
    case "loading":
      return { ...state, isLoading: false }; // Stop loading
    default:
      throw new Error("Unknown action");
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated, error, isLoading }, dispatch] = useReducer(
    reducer,
    initialState
  );
  useEffect(() => {
    async function checkAuthStatus() {
      try {
        const response = await axios.get(`${BASE_URL}/user/check-auth`, {
          withCredentials: true, // Send cookies
        });

        if (response.data.success === "true" && response.data.isAuthenticated) {
          dispatch({
            type: "login",
            payload: response.data.user,
          });
        }
      } catch (err) {
        console.log("Auth check error:", err);
      }
    }
    checkAuthStatus();
  }, []);

  async function login(email, password) {
    try {
      if (email && password) {
        const result = await axios.post(
          `${BASE_URL}/user/login`,
          { email, password },
          { withCredentials: true }
        );

        if (result.data.success === "true") {
          dispatch({ type: "login", payload: result.data.user });
          return true;
        } else {
          dispatch({
            type: "setError",
            payload: result.data.message || "Login failed",
          });
          return false;
        }
      }
    } catch (err) {
      console.log("Could not login", err);
      dispatch({
        type: "setError",
        payload: err.response?.data?.message || "Could not login",
      });
      return false;
    }
  }

  async function logout() {
    try {
      // Send a logout request to the backend to clear the cookie
      const result = await axios.post(
        `${BASE_URL}/user/logout`,
        {},
        { withCredentials: true } // Ensure cookies are sent with the request
      );

      // Dispatch logout action in context
      dispatch({ type: "logout" });

      console.log("Logout successful:", result.data);
    } catch (err) {
      console.error("Error in logging out:", err.response?.data || err.message);
    }
  }
  async function signup({ name, email, password }) {
    try {
      const response = await axios.post(
        `${BASE_URL}/user/signup`,
        { name, email, password },
        { withCredentials: true }
      );

      if (response.data.success === "true") {
        // Automatically log in after successful signup
        return await login(email, password);
      } else {
        dispatch({
          type: "setError",
          payload: response.data.message || "Signup failed. Please try again.",
        });
        return false;
      }
    } catch (err) {
      console.log("Could not create account");
      if (err.response?.data?.message) {
        dispatch({
          type: "setError",
          payload: err.response.data.message,
        });
      } else {
        dispatch({
          type: "setError",
          payload: "Signup failed. Please try again.",
        });
      }
      return false;
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, login, isAuthenticated, logout, signup, error, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("Authentication was used outside AuthProvider");
  return context;
}

export { AuthProvider, useAuth, AuthContext };
