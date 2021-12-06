const { response } = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const { generateJWT } = require("../helpers/jwt");

const login = async (req, res = response) => {
  const { name, password } = req.body;
  try {
    // Verify if the user exists
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "The data is incorrect",
      });
    }

    // Verify if the user is active
    if (!user.state) {
      return res.status(400).json({
        ok: false,
        msg: "The data is incorrect",
      });
    }

    // Verify password
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "The data is incorrect",
      });
    }

    // Generate JWT
    const token = await generateJWT(user.id);

    res.json({
      ok: true,
      user,
      token,
    });
  
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error in the server",
    });
  }
};

module.exports = {
  login,
};