import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { debounce } from "lodash";

export const TextEditor = ({ note, updateNote, selectedIndex }) => {
  const [body, setBody] = useState(null);
  const [index, setIndex] = useState(null);

  useEffect(() => {
    setIndex(selectedIndex);
    setBody(note.body);
  }, [selectedIndex]);

  const updatebody = async (val) => {
    await setBody(val);
    const update = debounce(() => {
      updateNote(note.id, { title: note.title, body: val });
      console.log("done");
    }, 1500);
    update();
  };

  return (
    <ReactQuill
      className="text-editor"
      theme="snow"
      value={body}
      onChange={updatebody}
    />
  );
};
