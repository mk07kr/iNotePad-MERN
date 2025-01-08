import React, { useContext } from "react";
import noteContext from "../context/noteContext";

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote, editNote } = context; // Destructure both functions from context
  const { note,updateNote } = props;

  return (
    <div className="col-md-4" key={note._id}>
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <div className="d-flex align-items-center gap-2">
            <p className="card-text">
              <strong>Tag:</strong> {note.tag}
            </p>
            <button className="btn btn-primary" onClick={() => editNote(note)}>
              <i className="bi bi-pencil-square"></i> Edit
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                deleteNote(note._id);
              }}
            >
              <i className="bi bi-trash"></i> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
