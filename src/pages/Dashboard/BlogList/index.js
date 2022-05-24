import React, { useState } from "react";
import "./style.scss";

import Blog from "./BlogPost";

const BlogList = ({ blogs }) => {
  const [search, setSearch] = useState("");

  return (
    <div className="bloglist-container">
      <div className="search-container">
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {blogs
        .slice(0)
        .reverse()
        .map((blog) => {
          return <Blog key={blog.id} data={blog.data} search={search} />;
        })}
    </div>
  );
};

export default BlogList;
