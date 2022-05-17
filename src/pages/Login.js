import React, { useEffect, useState } from "react";
import "./Login.scss";

import { useNavigate } from "react-router-dom";

import { auth, provider } from "../Firebase";
import { signInWithPopup } from "firebase/auth";

import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Login = ({ isAuth, setIsAuth }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) navigate("/");
  }, []);

  const [showEmail, setShowEmail] = useState(true);
  const [showPass, setShowPass] = useState(true);

  // firebase google sign in
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/");
    });
  };

  return (
    <div className="login-container">
      <h1 className="login-header">Sign in</h1>
      <div className="login-form">
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
          />
          <span>
            <FaLock className={showPass ? "icon" : "disabled"} />
          </span>
        </div>
        <button className="btn-transition1 sign-in-btn">
          <span className="text">Sign in</span>
        </button>
        <p className="separator">
          <span>OR</span>
        </p>
        <button className="login-with-google-btn" onClick={signInWithGoogle}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
