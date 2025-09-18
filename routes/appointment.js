const express = require('express');
const Appointment = require('../models/appointmentSchema');
const auth = require('../auth/middelware')

const router = express.Router();

router.post('/createAppointment' , auth , async (req , res) => {
    const {doctor , date , reason} = req.body;
    if(!doctor || !date || !reason){
        return res.status(400).json({message : 'All fields required'});
    }
    const appointment = await Appointment.create({
        user : req.user.id,
        doctor,
        date,
        reason,
    })
    res.status(201).json(appointment)
})

router.get('/myAppointment' , auth , async (req , res) => {
    const appointment = await Appointment.find({user : req.user.id}).populate('doctor')
    res.status(200).json(appointment)
})

router.delete('/deleteAppointment/:id' , async (req , res) => {
    const {id} = req.params
    const deleteAppointment = await Appointment.findByIdAndDelete(id)
    if(!deleteAppointment){
        return res.status(404).json({message : 'Appointment not found'})
    }
    return res.status(200).json({message : 'Appointment deleted successfully'})
})

module.exports = router;