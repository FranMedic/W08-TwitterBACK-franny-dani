const { Joi } = require("express-validation");

const tuitValidation = {
  body: Joi.object({
    text: Joi.string()
      .regex(/.{1,200}/)
      .required(),
    likes: Joi.number(),
    date: Joi.object().required,
  }),
};

module.exports = tuitValidation;
