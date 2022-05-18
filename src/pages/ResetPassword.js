import React, { useEffect, useState } from "react";
import "./ResetPassword.scss";

// icons
import { MdEmail } from "react-icons/md";

import { useNavigate } from "react-router-dom";

// user authentication functions
import { auth, sendPasswordReset } from "../Firebase";

import { useAuthState } from "react-firebase-hooks/auth";

const ResetPassword = () => {
  const navigate = useNavigate();

  // states for input animation
  const [showEmail, setShowEmail] = useState(true);

  // states for email and password values
  const [email, setEmail] = useState("");

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
          <h1 className="header">Email to Reset Password</h1>
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

        <button
          className="btn-transition1 send-btn"
          onClick={() => sendPasswordReset(email)}
        >
          <span className="text">Send</span>
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
