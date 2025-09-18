const express = require('express');
const User = require('../models/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/register' , async (req , res) => {
    const {name , email , password} = req.body;
    if(!name || !email || !password){
       return res.status(400).json({message : 'All fields required'})
    }
    const userExist = await User.findOne({email})
    if(userExist){
       return res.status(400).json({message : 'User already exists'})
    }
    const hashedPassword = await bcrypt.hash(password , 10)
    const newUser = await User.create({
        name,
        email,
        password : hashedPassword,
    })
    const token = jwt.sign(
        {email , id : newUser._id},
        process.env.SECRET_KEY,
        {expiresIn : '1h'}
    )
    return res.status(201).json(
        {message : 'User registerd successfully' , token , user: newUser})
});

router.post('/signin' , async (req , res) => {
    const {email , password} = req.body;
    if(!email || !password){
       return res.status(400).json({message : 'All fields required'})
    }
    const user = await User.findOne({email})
    if(!user){
       return res.status(400).json({message : 'User not found'})
    }
    const match = await bcrypt.compare(password , user.password)
    if(!match) 
        return res.status(400).json({message : 'Password not correct'})
     const token = jwt.sign(
        {id : user._id},
        process.env.SECRET_KEY,
        {expiresIn : '1h'}
    )
    return res.status(201).json(
        {message : 'User logged in  successfully' , token })

})

module.exports = router;