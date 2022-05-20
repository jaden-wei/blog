import React, { useEffect, useState } from "react";

import { convertFromRaw, Editor, EditorState } from "draft-js";

const styleMap = {
  CODE: {
    backgroundColor: "#cfcfcf",
    fontSize: "12px",
    fontWeight: "200",
    fontFamily: "`Source Code Pro`, monospace",
    display: "block",
    padding: "10px",

    whiteSpace: "pre-wrap",
  },
};

const Blog = ({ data }) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const parseBody = () => {
    const contentState = convertFromRaw(JSON.parse(data.body));
    setEditorState(() => EditorState.createWithContent(contentState));
  };

  useEffect(() => {
    parseBody();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>{data.title}</h1>
      <Editor editorState={editorState} readOnly customStyleMap={styleMap} />
    </div>
  );
};

export default Blog;
