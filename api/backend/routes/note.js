const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const Note = require("../models/Notes");

// ROUTE 1: Fetch all notes of the logged-in user
router.get("/fetchAllNotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 2: Create/Add new note for the logged-in user
router.post(
  "/newNote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description too short!").isLength({ min: 7 }),
  ],
  async (req, res) => {
    const { title, description, tag } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 3: Update an existing note
router.put(
  "/updateNote/:id",
  fetchuser,
  [
    body("title", "Enter a valid title").optional().isLength({ min: 3 }),
    body("description", "Description too short!")
      .optional()
      .isLength({ min: 7 }),
  ],
  async (req, res) => {
    const { title, description, tag } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // Create a newNote object
      const newNote = {};
      if (title) newNote.title = title;
      if (description) newNote.description = description;
      if (tag) newNote.tag = tag;

      // Find the note to be updated and update it
      let note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Note not found");
      }

      // Ensure the user owns the note
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not authorized");
      }

      note = await Note.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );
      res.json(note);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 4: Delete an existing note
router.delete("/deleteNote/:id", fetchuser, async (req, res) => {
    try {
      // Find the note to be deleted
      let note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Note not found");
      }
  
      // Ensure the user owns the note
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not authorized");
      }
  
      await Note.findByIdAndDelete(req.params.id);
      res.json({ success: "Note has been deleted" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  });


module.exports = router;
