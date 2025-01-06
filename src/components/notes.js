import React, { useContext } from "react";
import noteContext from "../context/noteContext";
import NoteItem from "./noteitem";

const Notes = () => {
  const context = useContext(noteContext);

  // Fallback in case context is undefined
  if (!context) {
    return <p>No context available. Please check your Provider.</p>;
  }

  const { notes } = context;

  return (
    <div>
      <h2>Your Notes</h2>
      <div className="row my-3">
        {notes.map((note) => {
          return <NoteItem note={note} />;
        })}
      </div>
    </div>
  );
};

export default Notes;
