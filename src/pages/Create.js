import React, { useRef } from "react";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";

import "./Create.scss";

import Toolbar from "../components/Toolbar";

const styleMap = {
  CODE: {
    backgroundColor: "lightgray",
    fontSize: "12px",
    display: "block",
    padding: "5px",
    textIndent: "10px",
  },
};

export default function Create() {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  const editor = useRef(null);

  function focusEditor() {
    editor.current.focus();
  }

  // const handleSubmit = () => {
  //   const rawContent = JSON.stringify(
  //     convertToRaw(this.state.editorState.getCurrentContent())
  //   );

  //   // store raw content to db
  // };

  return (
    <div className="create-page-container">
      <div className="form-container">
        <h1 className="create-header">Create Post</h1>
        <input className="title-input" placeholder="Title..." />
        <div className="editor" onClick={focusEditor}>
          {/* <div className="toolbar-container"> */}
          <Toolbar editorState={editorState} setEditorState={setEditorState} />
          {/* </div> */}
          <Editor
            ref={editor}
            editorState={editorState}
            onChange={setEditorState}
            placeholder="Type out your post here..."
            customStyleMap={styleMap}
          />
        </div>
        <button className="submit-btn">
          <span className="text">Submit</span>
        </button>
      </div>
    </div>
  );
}
