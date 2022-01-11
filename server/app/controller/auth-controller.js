const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken")
const User = require('../model/user-model')

const JWT_SECRET = process.env.JWT_SECRET

signup = async (req, res) => {
  if (!req.body || !req.body.username || !req.body.password) {
    return res.status(400).json({
        success: false,
        error: 'A username and password are required for registration'
    })
  }

  // TODO: username & password validation requirements

  try {
    const userToCreate = new User({
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 8)
    });
    await userToCreate.save()

    return res.status(200).json({ success: true, message: 'Registered!' })
  } catch (err) {
    console.log(err)
    if (err.code == 11000) {
      res.status(400).json({ success: false, error: 'Username taken!' })
    } else {
      res.status(500).json({ success: false, error: err.message })
    }
  }
}

signin = async (req, res) => {
  const user = await User.findOne({ username: req.body.username }).lean()

  if (user && await bcrypt.compare(req.body.password, user.password)) {
    const jwt = jsonwebtoken.sign(
      {
        userId: user._id
      },
      JWT_SECRET
    )
    return res.status(200).json({ success: true, data: jwt })
  }

  return res.status(400).json({ success: false, error: 'Invalid username & password combination' })
}

module.exports = {
  signup,
  signin
}