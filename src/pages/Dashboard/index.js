import React, { useEffect, useState } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

import { auth, db, logout } from "../../Firebase";
import { query, collection, orderBy, onSnapshot } from "firebase/firestore";
import Blog from "./BlogPost";

const Dashboard = () => {
  const [user, loading, error] = useAuthState(auth);
  // list of blogs
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  // const fetchName = async () => {
  //   try {
  //     const q = query(collection(db, "users"), where("uid", "==", user?.uid));
  //     const doc = await getDocs(q);
  //     const data = doc.docs[0].data();
  //     setName(data.name);
  //   } catch (err) {
  //     console.error(err);
  //     alert(err.message);
  //   }
  // };

  const fetchBlogs = async () => {
    try {
      const q = query(collection(db, "blogs"), orderBy("created"));
      await onSnapshot(q, (querySnapshot) => {
        console.log(querySnapshot.docs);
        setBlogs(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });

      console.log(blogs);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
    fetchBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading, error]);

  return (
    <div>
      <div>
        {blogs.map((blog) => {
          console.log(blog);
          return <Blog key={blog.id} data={blog.data} />;
        })}
      </div>

      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
