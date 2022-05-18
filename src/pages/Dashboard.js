import React, { useEffect, useState } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

import { auth, db, logout } from "../Firebase";

const Dashboard = () => {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const fetchName = async () => {
    try {
      setName(user.displayName);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
    fetchName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading, error]);

  return (
    <div>
      <div>
        Hello {name} {user?.email}
      </div>

      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
