const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const signinController = {};


signinController.signinUser = async(req,res)=>{
    try{
        let user = await User.findOne({ email: req.body.email })
        if(!user)
        return res.status(400).json({ststus:400,message:"Invalid email or password"})
 
        const validpassword = await bcrypt.compare(req.body.password, user.password)
        if(!validpassword)
        return res.status(400).json({status:400,message:"Invalid email or password"})
 
        const secretKey = process.env.SECRET_KEY
        const token = jwt.sign({_id:user._id, name: user.name, email: user.email}, secretKey)
        res.send(token)
 
    }catch(error){
        res.status(500).json({status:500,message:"Server error"})
    
    }
 }

 module.exports = signinController;