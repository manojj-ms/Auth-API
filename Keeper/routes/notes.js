const Note = require("../models/note");
const auth = require("../middleware/auth")
const express = require("express");
const noteController = require("../controllers/note")
const { celebrate, Joi } = require("celebrate");

const router = express.Router();

router.get("/", auth, noteController.getNote);


router.post("/", auth,
  celebrate({
    body: Joi.object().keys({
      title: Joi.string().min(3).max(200).required(),
      description: Joi.string().min(3).max(200).required()
    }),
  }),
  noteController.createNote
);


router.put("/:id", auth,
  celebrate({

    body: Joi.object().keys({
      title: Joi.string().min(3).max(200).required(),
      description: Joi.string().min(3).max(200).required()
    }),
  }),
  noteController.editNote
);


router.delete("/:id", auth, noteController.deleteNote);

module.exports = router;
