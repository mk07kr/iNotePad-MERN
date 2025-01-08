import React, { useContext } from "react";
import noteContext from "../context/noteContext";

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note } = props;

  return (
    <>
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <div className="d-flex align-items-center gap-2">
            <button className="btn btn-primary">
              <i className="bi bi-pencil"></i> Edit
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
    </>
  );
};

export default NoteItem;
