const User = require('../model/userModel')
const jwt = require('jsonwebtoken')

const createToken = (id) => {
  return jwt.sign({id}, process.env.SECRET, {expiresIn: '1day'})
}

const loginUser = async (req, res) => {
    res.json({mssg: "Login-user"})
}

const signupUser = async (req, res) => {
    const {Email, Password} = req.body
try {
    const user = await User.signUp(Email, Password)

    // create a user token
    const token = createToken(user.id)

    res.status(200).json({ Email, token })

} catch (error) {
    res.status(400).json({error: error.message})
}

}

// Get all users
const getAllUsers = async (req, res) => {
    try {
      const users = await User.find({}, 'Email Password token'); // only select specific fields
  
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ error: 'Server error', details: err.message });
    }
  };
  


module.exports = {loginUser, signupUser, getAllUsers}