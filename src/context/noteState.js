import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  // Sample state for notes
  const noteInitial=[]
  const [notes, setNotes] = useState(noteInitial);

  return (
    <noteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
