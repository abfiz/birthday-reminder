const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  phone: {
    type: String,
    required: false,
  },
  notes: {
    type: String,
    required: false,
  },
  isEmailed: {
    type: Boolean,
    required: true,
    default: false,
  }
}, {
  timestamps: true
});

const validateUser = (user) => {
  const schema = Joi.object({
    username: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    dateOfBirth: Joi.date().max('now').required(),
    phone: Joi.string().allow('', null).max(30).optional(),
    notes: Joi.string().allow('', null).max(1000).optional()
  });
  return schema.validate(user);
};

userSchema.statics.validate = validateUser;
module.exports = mongoose.model('User', userSchema);