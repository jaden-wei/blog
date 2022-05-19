import React, { useEffect, useState } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

import { auth, db, logout } from "../Firebase";
import {
  query,
  collection,
  getDocs,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

const Dashboard = () => {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();

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

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
    fetchName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading, error]);

  // list of blogs
  const [blogs, setBlogs] = useState([]);

  // fetch all blogs in the begining
  useEffect(() => {
    const q = query(collection(db, "blogs"), orderBy("created", "body"));
    onSnapshot(q, (querySnapshot) => {
      setBlogs(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

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
