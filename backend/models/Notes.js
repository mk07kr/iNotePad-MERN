const mongoose = require('mongoose');

const NotesSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
   subject:{
    type:String,
    required:true
   },
   description:{
    type:String
   },
   Date:{
    type:Date,
    default:Date.now
   }

})
module.exports=mongoose.model('Notes',NotesSchema);