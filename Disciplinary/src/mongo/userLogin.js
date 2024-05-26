const mongoose = require("mongoose")

mongoose.connect("mongodb://0.0.0.0:27017/LogUser") //name of db at last
    .then(() => {
        console.log('Mongodb connected for userLogin details');
    })
    .catch((e) => {
        console.log('failed');
    })

//format of the document
const loginForUser = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

//collections part
//name of the collection
const userLogin = new mongoose.model('userlogin', loginForUser) //follows login schema (we are specifying)

module.exports = userLogin