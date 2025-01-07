import React from "react";

const noteitem = (props) => {
  const { note } = props;
  return (
    <>
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <div className="flex align-items-center"></div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </>
  );
};

export default noteitem;
