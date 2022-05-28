import React, { useEffect, useState } from "react";
import "./style.scss";

import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

import { auth, db } from "../../Firebase";
import { query, collection, orderBy, onSnapshot } from "firebase/firestore";

import BlogList from "./BlogList";
import Sidebar from "../../components/Sidebar";

const Dashboard = () => {
  const [user, loading, error] = useAuthState(auth);
  // list of blogs
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  // fetch all blogs sorted by timestamp
  const fetchBlogs = async () => {
    try {
      const q = query(collection(db, "blogs"), orderBy("created"));
      await onSnapshot(q, (querySnapshot) => {
        setBlogs(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  // load our page once we find a user
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
    fetchBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading, error]);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="right-side-container">
        <BlogList blogs={blogs} />
      </div>
    </div>
  );
};

export default Dashboard;
