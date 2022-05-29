import React, { useState } from "react";
import "./style.scss";

import BlogSummary from "./BlogSummary";

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
          return (
            <BlogSummary
              key={blog.id}
              id={blog.id}
              data={blog.data}
              search={search}
            />
          );
        })}
    </div>
  );
};

export default BlogList;
