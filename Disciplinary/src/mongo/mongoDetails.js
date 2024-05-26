const mongoose = require("mongoose");
mongoose.connect("mongodb://0.0.0.0:27017/LogUser") //name of db at last
    .then(() => {
        console.log('mongodb connected for student details');
    })
    .catch((e) => {
        console.log('failed in fetching student details');
    })
const details = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    
    phone: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    rollNo: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    parPhone: {
        type: Number,
        required: true
    },
    Mode: {
        type: String,
        required: true
    },
    MentorName: {
        type: String,
        required: true
    },
    MentorId: {
        type: String,
        required: true
    },
    Cgpa: {
        type: Number,
        required: true
    },
    Arrear: {
        type: Number,
        required: true
    },
    count: {
        type: Number
    }
})
const studentDetails = new mongoose.model('details', details) //follows login schema (we are specifying)

module.exports = studentDetails