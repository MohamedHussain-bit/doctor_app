require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const User = require('./routes/user');
const Doctor = require('./routes/doctor');
const Appointment = require('./routes/appointment')

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());

app.use('/user' , User);
app.use('/doctors' , Doctor);
app.use('/appointments' , Appointment);
app.use('/files' , express.static('uploads'));


mongoose.connection.once('open' , () => {
    console.log('Connected whit mongoDB');
    app.listen(PORT , () => {
    console.log(`Server running on port ${PORT}`);
});
});
mongoose.connection.on('error' , (err) => {
    console.log(err)
})