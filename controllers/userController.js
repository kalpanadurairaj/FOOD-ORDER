const user = require('../models/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");



exports.register_user = async (req, res, next) => {

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(req.body.password, salt);

  const usr = new user({
    name: req.body.name,
    email: req.body.email,
    password: hash,

  })
  try {
    const saveduser = await usr.save();
    console.log(saveduser);
    res.send(saveduser);
  }
  catch (err) {
    res.status(400).send(err);
  }

};
exports.user_login = async (req, res, next) => {

  const usr = await user.findOne({ email: req.body.email });
  if (!usr) return res.status(400).send('Email does not exist');

  const validPass = await bcrypt.compare(req.body.password, usr.password);
  if (!validPass) return res.status(400).send('Invalid password');


  const token = jwt.sign({ _id: usr._id }, 'key');
  res.json({ "token": token, "role": "user", "currentUserId": usr._id });
  // res.end();
};

exports.update_user = async (req, res) => {

  const id = req.params.id;
  console.log(req.params.id)

  try {
    let data = await user.findByIdAndUpdate(id, req.body);
    res.send("user updated successfully")
  } catch (data) {
    res.send("couldn't update user");
  }
}
exports.view_user = async (req, res, next) => {
  const id = req.params.id;
  try {
    let data = await user.findById(id, req.body).select({ password: 0 });
    res.json(data)
  } catch (data) {
    res.send("couldn't view user")
  }
}

exports.delete_user = async (req, res) => {

  let id = req.params.id;
  try {
    let data = await user.findByIdAndDelete(id);
    res.send("User Deleted successfully")
  } catch (data) {
    res.send("Couldn't delete user" + data)

  }
}

exports.update_user = async (req, res) => {

  const id = req.params.id;
  console.log(req.params.id)

  try {
    let data = await user.findByIdAndUpdate(id, req.body);
    res.send("user updated successfully")
  } catch (data) {
    res.send("couldn't update user");
  }
}




