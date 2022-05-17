import React, { useEffect, useState } from "react";
import "./Login.scss";

import { useNavigate } from "react-router-dom";

import { auth, provider } from "../Firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Login = ({ isAuth, setIsAuth }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) navigate("/");
  }, []);

  // states for input animation
  const [showEmail, setShowEmail] = useState(true);
  const [showPass, setShowPass] = useState(true);

  // states for email and password values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // sign in with email and password
  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem("isAuth", true);
        setIsAuth(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.errorMessage;
      });
  };

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
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <span>
            <FaLock className={showPass ? "icon" : "disabled"} />
          </span>
        </div>
        <button className="btn-transition1 sign-in-btn" onClick={signIn}>
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
