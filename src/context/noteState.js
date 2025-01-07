import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  // Read Notes
  const noteInitial=[]
  const [notes, setNotes] = useState(noteInitial);

   // Add a note

   // Delete Note

   // Edit/Update Note


  return (
    <noteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
