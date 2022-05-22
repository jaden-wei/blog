import "./style.scss";

import React, { useEffect, useState } from "react";

import { convertFromRaw, EditorState } from "draft-js";

const Blog = ({ data }) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  // convert our stored editor state to an editor state we can use
  const parseBody = () => {
    const contentState = convertFromRaw(JSON.parse(data.body));
    setEditorState(() => EditorState.createWithContent(contentState));
  };

  useEffect(() => {
    console.log(data.created.seconds);
    parseBody();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // capitalize a string
  const cap = (str) => {
    const arr = str.split(" ");
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    return arr.join(" ");
  };

  // UNIX timestamp converter
  function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var time = date + " " + month + " " + year;
    return time;
  }

  return (
    <div className="post-container">
      <h1 className="title">{data.title}</h1>
      <h3 className="author">By {cap(data.author)}</h3>
      <p>{data.summary}</p>
      <p>{timeConverter(data.created.seconds)}</p>
    </div>
  );
};

export default Blog;
