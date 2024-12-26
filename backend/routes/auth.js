const express=require('express');
const router=express.Router();
const { body, validationResult } = require('express-validator');
const User=require('../models/User')


// POST MAPPING
// Create a new User @POST => /api/auth
// Validation added Express js
router.post('/',[
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 7 }),
], async (req,res)=>{
  const errors=validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
  }
try{
  let user =await User.findOne({email:req.body.email});
if(user){
    return res.status(400).json({error: "User already exists with this email"});
}
user= await User.create({
name:req.body.name,
email:req.body.email,
password:req.body.password,
})
res.json(user);
}
catch(error){
    res.status(500).send("Some error Occured");
}

})

module.exports=router