import { Link, useNavigate } from "react-router-dom";
import PageNav from "../Components/PageNav";

import { useEffect, useState } from "react";
import { useAuth } from "../Contexts/FakeAuthContext";
import Button from "../Components/Button";
import styles from "./Signup.module.css";

export default function Signup() {
  const { signup, isAuthenticated, error: SignError } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  useEffect(
    function () {
      if (isAuthenticated === true) {
        navigate("/app", { replace: true });
      }
    },
    [isAuthenticated, navigate]
  );

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { name, email, password } = formData;

    if (!name || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    signup({ name, email, password });
  }

  useEffect(() => {
    if (SignError) {
      setError(SignError);
    }
  }, [SignError]);

  function handleGoogleSignup() {
    // Implement Google signup
    console.log("Google signup");
  }

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        <button
          type="button"
          className={styles.googleButton}
          onClick={handleGoogleSignup}
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

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.row}>
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleChange}
            value={formData.name}
            placeholder="John Doe"
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            placeholder="john@example.com"
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            placeholder="Min. 8 characters"
          />
        </div>

        <div>
          <Button type="primary">Sign up</Button>
        </div>

        <p className={styles.signupText}>
          Already have an account?{" "}
          <Link to="/login" className={styles.signupLink}>
            Log in
          </Link>
        </p>
      </form>
    </main>
  );
}
