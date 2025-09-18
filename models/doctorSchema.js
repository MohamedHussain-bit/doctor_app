const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
    name : {
        type : String
    },
    specialty : {
        type : String,
    },
    image : {
        type : String
    },
    description : {
        type : String,
    },
    experienceYears : {
        type : Number
    }    
})

module.exports = mongoose.model('Doctor' , DoctorSchema)