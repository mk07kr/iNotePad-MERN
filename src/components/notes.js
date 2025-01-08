import React, { useContext, useEffect } from "react";
import noteContext from "../context/noteContext";
import NoteItem from "./noteitem";
import AddNote from "./AddNote";

const Notes = () => {
  const context = useContext(noteContext);

  // Fallback in case context is undefined
  if (!context) {
    return <p>No context available. Please check your Provider.</p>;
  }

  // const { notes , addNote} = context;
  const { notes, getNotes } = context;
  useEffect(() => {
    getNotes();
  }, []);

  return (
    <>
      <AddNote />

      <div>
        <h2>Your Notes</h2>
        <div className="row my-3">
          {notes.map((note) => {
            return <NoteItem key={note._id} note={note} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Notes;
