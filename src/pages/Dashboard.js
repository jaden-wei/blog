import React, { useEffect, useState } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

import { auth, db, logout } from "../Firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

const Dashboard = () => {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();

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
    fetchName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading, error]);

  const fetchName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

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
