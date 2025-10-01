const express = require('express');
const router = express.Router();
const User = require('../model/User');

// GET home page
router.get('/', async (req, res) => {
  try {
    const users = await User.find({isEmailed: false}).sort({ createdAt: -1, });
    res.render('index', { users, error: null, success: null });
  } catch (error) {
    res.render('index', { users: [], error: 'Error loading users', success: null });
    console.log(error)
  }
});

// POST new user
router.post('/', async (req, res) => {
  try {
    const { username, email, dateOfBirth, phone, notes } = req.body;
    const { error } = User.validate({ username, email, dateOfBirth, phone, notes });
    if (error) {
      const users = await User.find().sort({ createdAt: -1 });
      console.log(error);
      return res.render('index', { 
        users, 
        error: error.details[0].message, 
        success: null 
      });
    }
    

    const newUser = new User({ username, email, dateOfBirth, phone, notes });
    await newUser.save();
    res.render('success', { message: 'User added successfully!' });
  } catch (error) {
    if (error.code === 11000) {
      const users = await User.find().sort({ createdAt: -1 });
      return res.render('index', { 
        users, 
        error: 'Email already exists!', 
        success: null 
      });
    }
    console.error('Error adding user:', error);
    res.render('index', { 
      users: [], 
      error: 'An error occurred while adding the user', 
      success: null 
    });
  }
});

module.exports = router;