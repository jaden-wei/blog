import React, { useEffect, useState } from "react";
import "./Register.scss";

// icons
import { FaLock, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import { Link, useNavigate } from "react-router-dom";

// user authentication functions
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../Firebase";

import { useAuthState } from "react-firebase-hooks/auth";

const Register = () => {
  const navigate = useNavigate();

  // states for input animation
  const [showName, setShowName] = useState(true);
  const [showEmail, setShowEmail] = useState(true);
  const [showPass, setShowPass] = useState(true);

  // states for name email and password values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // user authentication state
  const [user, loading, error] = useAuthState(auth);

  const register = () => {
    if (!name) alert("Please enter your name");
    if (!email) alert("Please enter an email");
    registerWithEmailAndPassword(name, email, password);
  };

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
            type="text"
            placeholder="Name"
            required
            onFocus={() => {
              setShowName(false);
            }}
            onBlur={() => {
              setShowName(true);
            }}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <span>
            <FaUser className={showName ? "icon" : "disabled"} />
          </span>
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
        <button className="register-btn" onClick={register}>
          <span className="text">Register</span>
        </button>
        <p className="separator">
          <span>OR</span>
        </p>
        <button className="login-with-google-btn" onClick={signInWithGoogle}>
          Sign in with Google
        </button>

        <div className="other-options-container">
          <div>
            <span>Already a user? </span>
            <Link to="/login">Sign in here</Link>
          </div>
          <Link to="/reset">Forgot Password</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
