import React from "react";
import { Link } from "react-router-dom";

function Navbar({ isAuth, setIsAuth }) {
  return (
    <div>
      <nav>
        <Link className="link" to="/">
          Home
        </Link>
        <Link className="link" to="/create">
          Create Post
        </Link>
        {!isAuth ? (
          <Link className="link" to="/login">
            Login
          </Link>
        ) : (
          <button>Sign Out</button>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
