import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  // Sample state for notes
  const [notes, setNotes] = useState([
    { id: 1, title: "First Note", description: "This is the first note." },
    { id: 2, title: "Second Note", description: "This is the second note." },
  ]);

  return (
    <noteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
