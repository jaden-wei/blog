import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase";

const BlogList = ({ isAuth }) => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log(isAuth);
    if (!isAuth) navigate("/login");
  }, []);

  return (
    <div>
      <h1>Hello {auth.currentUser.displayName}</h1>
    </div>
  );
};

export default BlogList;
