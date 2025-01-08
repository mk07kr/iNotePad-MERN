import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  // Read Notes
  const noteInitial = [];
  const [notes, setNotes] = useState(noteInitial);

  // Add a note
  const addNote = (title, description, tag) => {
    // TODO: API Call
    console.log("Adding a new note");
    const note = {
      _id: "61322f119553781a8ca8d0e08",
      user: "6131dc5e3e4037cd4734a0664",
      title: title,
      description: description,
      tag: tag,
      date: "2021-09-03T14:20:09.668Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  // Delete Note
  const deleteNote = (id) => {
    // TODO: API Call
    console.log("Deleting the note with id" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // Edit/Update Note
  const editNote = (id, title, description, tag) => {};

  return (
    <noteContext.Provider value={{ notes, addNote, editNote, deleteNote }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
