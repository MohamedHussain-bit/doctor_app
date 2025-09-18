const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    doctor : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Doctor'
    },
    date : {
        type : Date
    },
    reason : {
        type : String
    }
})

module.exports = mongoose.model('Appointment' , AppointmentSchema)