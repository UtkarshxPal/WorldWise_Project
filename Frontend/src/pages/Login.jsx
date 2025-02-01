import { Link, useNavigate } from "react-router-dom";
import PageNav from "../Components/PageNav";

import { useEffect, useState } from "react";
import { useAuth } from "../Contexts/FakeAuthContext";
import Button from "../Components/Button";
import styles from "./Login.module.css";
import Spinner from "../Components/Spinner";

export default function Login() {
  const { login, isAuthenticated, SignError, isLoggingIn } = useAuth();
  const navigate = useNavigate();

  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("utkarsh@gmail.com");
  const [password, setPassword] = useState("hehehehe");

  useEffect(
    function () {
      if (isAuthenticated === true) {
        navigate("/app", { replace: true });
      }
    },
    [isAuthenticated, navigate]
  );

  function handleClick(e) {
    e.preventDefault();
    if (email && password) login(email, password);
  }

  function handleGoogleLogin() {
    // Implement Google login
    console.log("Google login");
  }

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleClick}>
        <h2>Login</h2>

        <button
          type="button"
          className={styles.googleButton}
          onClick={handleGoogleLogin}
        >
          <svg className={styles.googleIcon} viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </button>

        <div className={styles.divider}>
          <span>or</span>
        </div>

        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        {SignError && <div className={styles.error}>{SignError}</div>}
        <div>
          {isLoggingIn ? (
            <Spinner></Spinner>
          ) : (
            <Button type="primary">Login</Button>
          )}
        </div>

        <p className={styles.signupText}>
          Dont have an account?{" "}
          <Link to="/signup" className={styles.signupLink}>
            Sign up
          </Link>
        </p>
      </form>
    </main>
  );
}
