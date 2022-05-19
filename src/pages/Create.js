import React, { useRef, useState } from "react";
import { Editor, EditorState, convertToRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import "./Create.scss";

import Toolbar from "../components/Toolbar";
import { RichUtils } from "draft-js";
import { Modifier } from "draft-js";
import getDefaultKeyBinding from "draft-js/lib/getDefaultKeyBinding";
// import { Modifier } from "draft-js";

import { db } from "../Firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

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
  const [title, setTitle] = useState("");
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

  const addBlog = async (e) => {
    console.log("button clicked");
    e.preventDefault();
    try {
      await addDoc(collection(db, "blogs"), {
        title,
        body: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
        created: Timestamp.now(),
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="create-page-container">
      <div className="form-container">
        <h1 className="create-header">Create Post</h1>
        <input
          className="title-input"
          placeholder="Title..."
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
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
        <button className="submit-btn" onClick={addBlog}>
          <span className="text">Submit</span>
        </button>
      </div>
    </div>
  );
}
