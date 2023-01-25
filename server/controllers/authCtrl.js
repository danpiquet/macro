const { User } = require("../models/user");
require("dotenv").config();
const { SECRET } = process.env;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createToken = (username, id) => {
  return jwt.sign({ username, id }, SECRET, { expiresIn: "2 days" });
};

module.exports = {
  register: async (req, res) => {
    try {
      const { username, password } = req.body;
      let foundUser = await User.findOne({ where: { username } });
      if (foundUser) {
        console.log(foundUser)
        res
          .status(400)
          .send(
            "That username is taken, please register with a different username"
          );
      } else {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const newUser = await User.create({
          username,
          hashedPass: hash,
        });
        const token = createToken(newUser.username, newUser.id);
        const exp = Date.now() + 1000 * 60 * 60 * 48;
        res.status(200).send({
          username: newUser.username,
          userId: newUser.id,
          token,
          exp,
        });
      }
    } catch (err) {
      console.log("Error in register function");
      console.log(err);
      res.sendStatus(400);
    }
  },
  login: (req, res) => {
    console.log("login function");
    res.sendStatus(200);
  },
};
