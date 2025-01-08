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
          Authorization:
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
        Authorization:
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
  const deleteNote = async (id) => {
    try {
      // Send DELETE request to the backend
      const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc2ZmMyOGU3ZjFhNTg5MmM3MjI1M2IyIn0sImlhdCI6MTczNTM3NzYyMX0.NafUYWstKBM07o3AlIwekDPGWPl9EfFpdR1BsFN4dKI",
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
    const {_id,title,description,tag}=note;
    try {
      // API Call
      const response = await fetch(`${host}/api/notes/updateNote/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc2ZmMyOGU3ZjFhNTg5MmM3MjI1M2IyIn0sImlhdCI6MTczNTM3NzYyMX0.NafUYWstKBM07o3AlIwekDPGWPl9EfFpdR1BsFN4dKI",
        },
        body: JSON.stringify({ title, description, tag }),
      });
  
      // Get response JSON data
      const json = await response.json();
      
  
      if (response.ok) {
        // Update the note in the client-side state
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note._id === _id
              ? { ...note, title, description, tag }  // Update the note
              : note
          )
        );
        console.log(json);
      } else {
        console.error('Error updating note:', json.error);
      }
    } catch (error) {
      console.error('Failed to edit note:', error);
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
