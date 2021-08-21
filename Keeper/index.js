require("dotenv").config();
const notes = require("./routes/notes");
const signUp = require("./routes/signUp");
const signIn = require("./routes/signIn");
const express = require("express");
const cors = require("cors");
const connectDB = require('./db')


const app = express();
connectDB()


app.use(cors());
app.use(express.json());

app.use("/api/notes", notes);
app.use("/api/signup", signUp);
app.use("/api/signin", signIn);


app.get("/", (req,res)=>{
    res.send("Welcome!");
});



app.listen(process.env.PORT || 5000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
  
