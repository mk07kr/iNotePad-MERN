import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  // Read Notes
  const host = "http://localhost:5000";
  const noteInitial = [];
  const [notes, setNotes] = useState(noteInitial);

  // Fetch All Notes

  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`

        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const json = await response.json();
      setNotes(json);
    } catch (error) {
      console.error("Failed to fetch notes:", error);
    }
  };
  // Add a note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/newNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`

      },
      body: JSON.stringify({ title, description, tag }),
    });

    const note = await response.json();
    setNotes(notes.concat(note));
  };

  // Delete Note
  const deleteNote = async (id) => {
    try {
      // Send DELETE request to the backend
      const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`

        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      // Filter the deleted note from local state
      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  const editNote = async (note) => {
    const { _id, title, description, tag } = note;

    try {
      const response = await fetch(`${host}/api/notes/updateNote/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`

        },
        body: JSON.stringify({ title, description, tag }),
      });

      const json = await response.json();
      // console.log("Response from server:", json);

      if (response.ok) {
        let newNotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newNotes.length; index++) {
          if (newNotes[index]._id === _id) {
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag;
            break;
          }
        }
        setNotes(newNotes);
      } else {
        console.error("Error updating note:", json.error);
      }
    } catch (error) {
      console.error("Failed to edit note:", error);
    }
  };

  return (
    <noteContext.Provider
      value={{ notes, addNote, editNote, deleteNote, getNotes }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
