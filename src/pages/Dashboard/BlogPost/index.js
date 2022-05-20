import React, { useEffect, useState } from "react";

import { convertFromRaw } from "draft-js";

const Blog = ({ data }) => {
  const [body, setBody] = useState(null);

  const parseBody = () => {
    const contentState = convertFromRaw(JSON.parse(data.body));
    console.log(contentState);
  };

  useEffect(() => {
    parseBody();
  }, []);

  return (
    <div>
      <h1>{data.title}</h1>
    </div>
  );
};

export default Blog;
