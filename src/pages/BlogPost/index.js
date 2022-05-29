import { convertFromRaw } from "draft-js";
import { Editor } from "draft-js";
import { EditorState } from "draft-js";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Sidebar from "../../components/Sidebar";

import "./style.scss";

const Blog = () => {
  const location = useLocation();

  // style map to format our body styling
  const styleMap = {
    CODE: {
      backgroundColor: "#cfcfcf",
      display: "block",
      padding: "15px",
      fontSize: "13px",
      lineHeight: "1.5",

      whiteSpace: "pre-wrap",
    },
  };

  // all data for our blog
  const data = location.state.data;
  // just the body, needs to be parsed
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  // convert our stored editor state to an editor state we can use
  const parseBody = () => {
    const contentState = convertFromRaw(JSON.parse(data.body));
    setEditorState(() => EditorState.createWithContent(contentState));
  };

  useEffect(() => {
    parseBody();
    console.log(editorState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Sidebar />
      <div className="right-side-container">
        <div className="blog-container">
          <h1>{data.title}</h1>
          <div className="author-container">
            <span>By {data.author}</span>
            <img className="profile-photo" src={data.photo} alt="" />
          </div>
          <Editor
            editorState={editorState}
            readOnly={true}
            customStyleMap={styleMap}
          />
        </div>
      </div>
    </div>
  );
};

export default Blog;
