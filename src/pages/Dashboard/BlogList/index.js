import React from "react";
import "./style.scss";

import Blog from "./BlogPost";

const BlogList = ({ blogs }) => {
  return (
    <div className="bloglist-container">
      {blogs
        .slice(0)
        .reverse()
        .map((blog) => {
          console.log(blog);
          return <Blog key={blog.id} data={blog.data} />;
        })}
    </div>
  );
};

export default BlogList;
