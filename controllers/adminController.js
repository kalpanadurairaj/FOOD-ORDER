const Admin = require('../models/adminSchema');
const User = require("../models/userSchema");
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")


exports.admin_register = async(req,res,next)=> {
 
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(req.body.password,salt);

  const adm = new Admin( {
    name:req.body.name,
    email:req.body.email,
    password: hash,
    mob_number:req.body.mob_number
  })

  try {
    const saveduser = await adm.save();
    console.log(saveduser);
    res.send(saveduser);
  }
  catch(err) {
    res.status(400).send(err);
    console.log("error",err);
  }
};

exports.admin_login=async(req,res,next)=> {
  const user = await Admin.findOne({email: req.body.email});
  if(!user) return res.status(400).send('Email does not exist');
  
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if(!validPass) return res.status(400).send('Invalid password');
  
  
  const token=jwt.sign({_id: user._id}, 'admintoken');
  res.json({"token": token, "role":"admin", "currentUserId": user._id});
};

exports.view_user=async (req,res,next)=> {
      
  try {
    let data = await User.find(req.body).select({password:0});
    res.json(data)
  }catch(data) {
    res.send("couldn't view users"+data);
  }
}

exports.delete_user=async (req,res)=> {

  let id=req.params.id;
  try{
  let err=await User.findByIdAndDelete(id);
  res.send("User Deleted successfully")
  }catch(err){
    res.send("Couldn't delete user" + err)
  }
}