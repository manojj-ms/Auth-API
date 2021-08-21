const Note = require("../models/note");


const noteController = {};


noteController.getNote = async(req,res)=>{
    const userID = req.user._id
    try{
        const notes = await Note.find({"creator":userID})
        res.send(notes);
    }catch(error){
        res.status(500).json({status:500,message:"server error"});
    }
}


noteController.createNote = async(req,res)=>{

    const { title, description } = req.body;
    const creator = req.user._id;

    let note = new Note({
        title,
        description,
        creator
    });
try{
    note = await note.save();
    res.send(note);
} catch (error){
    res.status(500).json({status:500, message:"Server error"});
}
     
}


noteController.editNote = async(req,res)=>{
   
    try{

    const note = await Note.findById(req.params.id)

    if(!note) return res.status(404).json({status:500, message:"Note not found"});

    const { title,description } = req.body;
    const creator = req.user._id;
    
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, { 
            title,
            description,
            creator
        },{new:true});
    
        res.send(updatedNote);
    }catch(error){
        res.status(500).json({status:500, message:"Server error"});
    }
}

noteController.deleteNote = async(req,res)=>{
    try{
    const note = await Note.findById(req.params.id)

    if(!note) return res.status(404).json({status:404,message:"Note not found"})

        const deletedNote = await Note.findByIdAndDelete(req.params.id)
        res.send(deletedNote)
    }catch(error){
        res.status(500).json({status:500,message:"Server error"});
    }
   
}


module.exports = noteController;