const express = require('express');
const Doctor = require('../models/doctorSchema');
const multer = require('multer');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })

router.post('/addDoctor' , upload.single('image') , async (req , res) => {
    try{
        const {name , specialty , description , experienceYears} = req.body;
        const image = req.file ? req.file.filename : null
    if(!name || !specialty || !description || !experienceYears || !image){
        return res.status(400).json({message : 'All fields required'});
    }
    const newDoctor = new Doctor({
        name,
        specialty,
        description,
        experienceYears,
        image : req.file?.filename
    })
    const savedDoctor = await newDoctor.save();
    res.status(201).json(savedDoctor);
    }catch(err){
        res.status(500).json({message : err.message})
    }
})

router.get('/allDoctors' , async (req , res) => {
    const allDoctors = await Doctor.find()
    res.status(200).json(allDoctors)
})

router.get('/:id' , async (req , res) => {
    const {id} = req.params;
    const foundDoctor = await Doctor.findById(id);
    if(!foundDoctor){
        return res.status(400).json({message : 'Doctor not found'});
    }
    return res.status(200).json(foundDoctor);
})

module.exports = router;