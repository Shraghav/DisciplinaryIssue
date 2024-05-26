const mongoose = require("mongoose");
mongoose.connect("mongodb://0.0.0.0:27017/LogUser") //name of db at last
    .then(() => {
        console.log('mongodb connected for blocking mail');
    })
    .catch((e) => {
        console.log('failed in fetching issues');
    })
const blockIssue = new mongoose.Schema({
    studentName: {
        type: String
    },
    blockMail: {
        type:String
    }
})

const blockDetails = new mongoose.model('blockdetails', blockIssue)
module.exports = blockDetails;


// const data = {
//     facultyName: name1,
//     studentName: name2,
//     reportedOn: new Date(),
//     nature: req.body.Nature,
//     daysBlock: req.body.blockNum,
//     warning: req.body.warningNum,
//     count: 0
// }
// try {
//     await retrieveIssue.insertMany([data])
// }
// catch (e) {
//     res.send("Unknown Error Occured")
//     console.log(e);
// }