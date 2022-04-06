import React from "react";

import { RichUtils } from "draft-js";

import "./Toolbar.scss";

import {
  MdFormatBold,
  MdFormatUnderlined,
  MdFormatItalic,
  MdFormatStrikethrough,
  MdCode,
} from "react-icons/md";

const Toolbar = ({ editorState, setEditorState }) => {
  const toggleBold = (e) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };

  const toggleUnderline = (e) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
  };

  const toggleItalic = (e) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
  };

  const toggleStrikethrough = (e) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, "STRIKETHROUGH"));
  };

  const toggleCode = (e) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, "CODE"));
  };

  return (
    <div className="toolbar">
      <div className="icon-container" onMouseDown={toggleBold}>
        <MdFormatBold className="icon" />
      </div>
      <div className="icon-container" onMouseDown={toggleUnderline}>
        <MdFormatUnderlined className="icon" />
      </div>
      <div className="icon-container" onMouseDown={toggleItalic}>
        <MdFormatItalic className="icon" />
      </div>
      <div className="icon-container" onMouseDown={toggleStrikethrough}>
        <MdFormatStrikethrough className="icon" />
      </div>
      <div className="icon-container" onMouseDown={toggleCode}>
        <MdCode className="icon" />
      </div>
    </div>
  );
};

export default Toolbar;
