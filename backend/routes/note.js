const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const Note = require("../models/Notes"); 

//ROUTE 1:
// GET /fetchAllNotes
// Fetch all notes of the logged-in user
router.get('/fetchAllNotes', fetchuser, async (req, res) => {
  try {
    // Find all notes belonging to the logged-in user
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//ROUTE 2:
// POST /newNote
// Create/Add New Notes of the logged-in user
router.post('/newNote', fetchuser,[
    body("title","Enter a valid title").isLength({ min: 3 }),
    body("description","Description too short !").isLength({ min: 7 }),
], async (req, res) => {
    const {title,description,tag}=req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      
      const note=new Note({
        title,description,tag,user:req.user.id
      });
      const savedNote=await note.save();
      res.send(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  });
  

module.exports = router;
