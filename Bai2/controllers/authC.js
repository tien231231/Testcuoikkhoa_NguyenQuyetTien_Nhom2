const users = require("../models/User");
const jwt = require("jsonwebtoken");

const authC = {
  registerUser: async (req, res) => {
    try {
      // tạo new user
      const newUser = await new User({
        username: req.body.username,

        password: req.body.password,
      });

      const users = await newUser.save();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.JWT_ACCESS_TOKKEN,
      { expiresIn: "30s" }
    );
  },

  loginUser: async (req, res) => {
    try {
      const user = await users.findOne({ username: req.body.username });
      if (!user) {
        return res.status(400).json("wrong user");
      }
      const validPass = await users.findOne({ password: req.body.password });
      if (!validPass) {
        return res.status(404).json("Wrong pass");
      }
      if (user && validPass) {
        const accessToken = authC.generateAccessToken(user);

       
        res.status(200).json({ user, accessToken });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  
};

module.exports = authC;
