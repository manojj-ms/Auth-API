const mongoose = require("mongoose");

const  noteSchema = new mongoose.Schema({
    title: {type:String, required:true, minlength:3, maxlength:200},
    description: {type:String, required:true, minlength:3, maxlength:200},
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},{timestamps:true}
)

const Note = mongoose.model("Note",noteSchema)

module.exports = Note;