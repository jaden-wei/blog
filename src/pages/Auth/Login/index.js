import React, { useEffect, useState } from "react";
import "./style.scss";

// icons
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import { Link, useNavigate } from "react-router-dom";

// user authentication functions
import {
  auth,
  logInWithEmailAndPassword,
  signInWithGoogle,
} from "../../../Firebase";

import { useAuthState } from "react-firebase-hooks/auth";

const Login = () => {
  const navigate = useNavigate();

  // states for input animation
  const [showEmail, setShowEmail] = useState(true);
  const [showPass, setShowPass] = useState(true);

  // states for email and password values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // user authentication state
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (loading) {
      // if user is still loading
      // maybe show a loading page
      return;
    }
    if (user) {
      // if user is logged in, go to dashboard
      navigate("/");
    }
    if (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading, error]);

  return (
    <div className="main-container">
      <div className="main-form">
        <div className="header-container">
          <h1 className="header">Welcome</h1>
        </div>
        <div className="input">
          <input
            type="email"
            placeholder="Email"
            required
            onFocus={() => {
              setShowEmail(false);
            }}
            onBlur={() => {
              setShowEmail(true);
            }}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <span>
            <MdEmail className={showEmail ? "icon" : "disabled"} />
          </span>
        </div>

        <div className="input">
          <input
            type="password"
            placeholder="Password"
            required
            onFocus={() => {
              setShowPass(false);
            }}
            onBlur={() => {
              setShowPass(true);
            }}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <span>
            <FaLock className={showPass ? "icon" : "disabled"} />
          </span>
        </div>
        <button
          className="sign-in-btn"
          onClick={() => logInWithEmailAndPassword(email, password)}
        >
          <span className="text">Sign in</span>
        </button>
        <p className="separator">
          <span>OR</span>
        </p>
        <button className="login-with-google-btn" onClick={signInWithGoogle}>
          Sign in with Google
        </button>

        <div className="other-options-container">
          <div>
            <span>New user? </span>
            <Link to="/register">Sign up here</Link>
          </div>
          <Link to="/reset">Forgot Password</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
