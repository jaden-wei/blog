import React, { useRef } from "react";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";

import "./Create.scss";

import Toolbar from "../components/Toolbar";
import { RichUtils } from "draft-js";
import { Modifier } from "draft-js";
import getDefaultKeyBinding from "draft-js/lib/getDefaultKeyBinding";
// import { Modifier } from "draft-js";

const styleMap = {
  CODE: {
    backgroundColor: "#cfcfcf",
    fontSize: "12px",
    fontWeight: "200",
    fontFamily: "`Source Code Pro`, monospace",
    display: "block",
    padding: "2px",
    textIndent: "10px",

    whiteSpace: "pre-wrap",
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

  const handlePastedText = (text, html) => {
    console.log("handlePastedText executed");
    const newState = Modifier.replaceText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      text.trim()
    );

    setEditorState(EditorState.createWithContent(newState));

    console.log(editorState);
    return true;
  };

  const keyBindingFn = (e) => {
    if (e.keyCode === 9) {
      setEditorState(RichUtils.onTab(e, editorState, 6));
      return "tab";
    }
    return getDefaultKeyBinding(e);
  };

  const handleKeyCommand = (command) => {
    if (command === "tab") {
      // setEditorState(RichUtils.onTab(command, editorState, 6));
      return;
    }

    setEditorState(RichUtils.handleKeyCommand(editorState, command));
  };

  return (
    <div className="create-page-container">
      <div className="form-container">
        <h1 className="create-header">Create Post</h1>
        <input className="title-input" placeholder="Title..." />
        <div className="editor" onClick={focusEditor}>
          <Toolbar editorState={editorState} setEditorState={setEditorState} />
          <Editor
            ref={editor}
            editorState={editorState}
            onChange={setEditorState}
            placeholder="Type out your post here..."
            keyBindingFn={keyBindingFn}
            handleKeyCommand={handleKeyCommand}
            customStyleMap={styleMap}
            handlePastedText={handlePastedText}
          />
        </div>
        <button className="submit-btn">
          <span className="text">Submit</span>
        </button>
      </div>
    </div>
  );
}
