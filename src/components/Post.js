import React from "react";

function Post({ post }) {
  return (
    <div key={post.id} className="post-container">
      <h1 className="post-header">{post.title}</h1>
      <p className="post-text">{post.text}</p>
    </div>
  );
}

export default Post;
