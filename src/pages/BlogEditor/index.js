import React, { useEffect, useRef, useState } from "react";
import { Editor, EditorState, convertToRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import "./style.scss";

import Toolbar from "./Toolbar";
import { RichUtils } from "draft-js";
import { Modifier } from "draft-js";
import getDefaultKeyBinding from "draft-js/lib/getDefaultKeyBinding";
// import { Modifier } from "draft-js";

import { auth, db } from "../../Firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

// style map to format our body styling
const styleMap = {
  CODE: {
    backgroundColor: "#cfcfcf",
    fontSize: "12px",
    fontWeight: "200",
    fontFamily: "`Source Code Pro`, monospace",
    display: "block",
    padding: "2px",

    whiteSpace: "pre-wrap",
  },
};

export default function Create() {
  const navigate = useNavigate();

  // keep track of our title input
  const [title, setTitle] = useState("");
  // keep track of our body input
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  // keep track of our logged in user
  const [user, loading, error] = useAuthState(auth);

  // helps us focus and unfocus on the editor
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
    return true;
  };

  // get tab to make a 6 spaces
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

  // function to add the current state of our blog to the database
  const addBlog = async (e) => {
    e.preventDefault();
    if (!user) return navigate("/");
    console.log(auth.currentUser);
    try {
      await addDoc(collection(db, "blogs"), {
        title,
        author: user.displayName,
        body: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
        created: Timestamp.now(),
      });
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  // load page once user is logged in
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading, error]);

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
