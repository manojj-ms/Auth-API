const express = require("express");
const { celebrate, Joi } = require("celebrate");
const signupController = require("../controllers/signup")


const router = express.Router()

router.post("/", celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().min(3).max(200).email().required(),
    password: Joi.string().min(6).max(200).required()
  }),
}),
  signupController.signupUser
);

module.exports = router