import React, { useContext } from "react";
import noteContext from "../context/noteContext";

const noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note } = props;
  return (
    <>
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <div className="flex align-items-center">
            <button className="btn btn-primary">
              <i className="bi bi-pencil"></i> Edit
            </button>
            <button className="btn btn-danger">
              <i
                className="bi bi-trash"
                onClick={() => {
                  deleteNote(note._id);
                }}
              ></i>{" "}
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default noteitem;
