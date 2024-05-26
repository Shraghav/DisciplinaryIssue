const mongoose = require("mongoose");
mongoose.connect("mongodb://0.0.0.0:27017/LogUser") //name of db at last
    .then(() => {
        console.log('mongodb connected for issues');
    })
    .catch((e) => {
        console.log('failed in fetching issues');
    })
const issue = new mongoose.Schema({
    reportedOn: {
        type: String,
    },
    nature: {
        type: String,
    },
    count: {
        type: Number,
    },
    studentName: {
        type: String
    },
    facultyName: {
        type: String
    },
})
const LoginDetails = new mongoose.model('issuedetails', issue) //follows login schema (we are specifying)

module.exports = LoginDetails