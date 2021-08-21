const express = require("express");
const { celebrate, Joi } = require("celebrate");
const signinController = require("../controllers/signin")


const router = express.Router()

router.post(
    "/", 
    celebrate({
    body: Joi.object().keys({
        email: Joi.string().min(3).max(200).email().required(),
        password: Joi.string().min(6).max(200).required()
    }),
  }), 
  signinController.signinUser
);


module.exports = router