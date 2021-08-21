const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const signupController = {};


signupController.signupUser = async(req,res)=>{
    try{
        let user = await User.findOne({ email: req.body.email})
        if(user) return res.status(400).json({status:400, message:"User with that email already exist"})
    
        const {name, email, password} = req.body
    
        user = new User({
            name, email, password
        })
    
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    
        await user.save()
    
        const secretKey = process.env.SECRET_KEY
        const token = jwt.sign({_id:user._id, name: user.name, email: user.email}, secretKey)
        res.send(token)
    
    
       }catch(error){
        res.status(500).json({status:500,message:"Server error"});
    }
       
    }
 
 module.exports = signupController;