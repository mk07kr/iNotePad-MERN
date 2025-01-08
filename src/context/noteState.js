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
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc2ZmMyOGU3ZjFhNTg5MmM3MjI1M2IyIn0sImlhdCI6MTczNTM3NzYyMX0.NafUYWstKBM07o3AlIwekDPGWPl9EfFpdR1BsFN4dKI",
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
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc2ZmMyOGU3ZjFhNTg5MmM3MjI1M2IyIn0sImlhdCI6MTczNTM3NzYyMX0.NafUYWstKBM07o3AlIwekDPGWPl9EfFpdR1BsFN4dKI",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    console.log("Adding a new note");
    const note = {
      _id: "61322f119553781a8ca8d0e08",
      user: "6131dc5e3e4037cd4734a0664",
      title: title,
      description: description,
      tag: tag,
      date: "2025-01-08T14:20:09.668Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  // Delete Note
  const deleteNote = (id) => {
    // TODO: API Call
    console.log("Deleting the note with id" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // Edit/Update Note
  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc2ZmMyOGU3ZjFhNTg5MmM3MjI1M2IyIn0sImlhdCI6MTczNTM3NzYyMX0.NafUYWstKBM07o3AlIwekDPGWPl9EfFpdR1BsFN4dKI",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();

    // Logic to edit in client

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
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
