import React, { useState } from "react";
import "./Login.scss";

import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Login = () => {
  const [showEmail, setShowEmail] = useState(true);
  const [showPass, setShowPass] = useState(true);

  return (
    <div className="login-container">
      <h1 className="login-header">Sign in</h1>
      <div className="login-form">
        <div class="input">
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

        <div class="input">
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
        <button class="sign-in-btn">
          <span class="text">Sign in</span>
        </button>
        <p className="separator">
          <span>OR</span>
        </p>
        <button className="login-with-google-btn">Sign in with Google</button>
      </div>
    </div>
  );
};

export default Login;
