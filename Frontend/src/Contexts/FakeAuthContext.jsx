import axios from "axios";
import { createContext, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
const BASE_URL = "https://travel-management-worldwise-backend.onrender.com";

const AuthContext = createContext();

const initialState = { user: null, isAuthenticated: false, error: "" };

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    case "setError":
      return { ...state, error: action.payload };

    default:
      throw new Error("Unknown action");
  }
}

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }) {
  async function login(email, password) {
    // if (email === FAKE_USER.email && password === FAKE_USER.password) {
    //   dispatch({ type: "login", payload: FAKE_USER });
    // }

    try {
      if (email && password) {
        const data = { email, password };
        const result = await axios.post(`${BASE_URL}/login`, data, {
          withCredentials: true,
        });

        if (result.data.success === "true") {
          dispatch({ type: "login", payload: result.data.user });
        }
      }
    } catch (err) {
      console.log("Could not login", err);
    }
  }

  async function logout() {
    try {
      await axios.post(
        `${BASE_URL}/user/logout`,
        {},
        { withCredentials: true }
      );
      dispatch({ type: "logout" });
    } catch (err) {
      console.error("Logout failed", err);
    }
  }

  async function signup({ name, email, password }) {
    try {
      const response = await axios.post(`${BASE_URL}/user/signup`, {
        name,
        email,
        password,
      });

      console.log("rsponse data hai bhai", response.data.message);
      if (response.data.success === "true") {
        await login(email, password); // Automatically log the user in after successful signup
      } else {
        dispatch({
          type: "setError",
          payload: response.data.message || "Signup failed. Please try again.",
        });
      }
    } catch (err) {
      console.log("Could not create account");
      if (err.response && err.response.data) {
        // If the error response contains a message, dispatch it
        dispatch({
          type: "setError",
          payload:
            err.response.data.message || "Signup failed. Please try again.",
        });
      } else {
        dispatch({
          type: "setError",
          payload: "Signup failed. Please try again.",
        });
      }
    }
  }

  const [{ user, isAuthenticated, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  return (
    <AuthContext.Provider
      value={{ user, login, isAuthenticated, logout, signup, error }}
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
