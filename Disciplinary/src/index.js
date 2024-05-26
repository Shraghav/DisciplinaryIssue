const express = require("express")
const path = require("path")
const app = express()
const session = require('express-session');

const LogInCollection = require("./mongo/mongoLogin")
const retrievelDetails = require("./mongo/mongoDetails")
const retrieveIssue = require("./mongo/issueDetails");
const userLogin = require("./mongo/userLogin");
const blockDetails = require("./mongo/blockDetails")

const port = process.env.PORT || 3000
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(session({
    secret: 'secretCode', // Change this to a long, random string
    resave: false,
    saveUninitialized: false
}));

const templatePath = path.join(__dirname, '../src/templates')
const publicPath = path.join(__dirname, '../public')
app.set('view engine', 'ejs');
app.set('views', templatePath)
app.use(express.static(publicPath))

 //Signup Page
app.get('/signup', (req, res) => {
    res.render('signup');
})
//Entering details for signup page
app.post('/signup', async (req, res) => {  //async is because of working with mongo db
    const data = {
        name: req.body.name,
        password: req.body.password,
    }
    const checking = await LogInCollection.findOne({ name: req.body.name })
    try {
        if (checking && checking.name === req.body.name) {
            res.send(`User Exists`)
            return;
        }
        else {
            await LogInCollection.insertMany([data]) //create a data and fill in the collections which is available in mongo db
        }
    }
    catch {
        res.send("wrong inputs")
    }
    res.render('login');
})


app.get('/', (req, res) => {
    res.render('sideBar')
})
app.get('/loginAdmin', (req, res) => {
    res.render('loginAdmin');
})
//Entering details for login page
app.post('/loginAdmin', async (req, res) => {
    try {
        const name1 = req.body.name;
        req.session.reporterName = name1;
        const check = await LogInCollection.findOne({ name: req.body.name })
        if (!req.body.password) {
            res.send("Password Required");
            return;
        }
        if (check.password === req.body.password) {
            // res.status(201).render("home",{ naming: `${req.body.password}+${req.body.name}` })
            res.render('chooseNorm');
            return;
        }
        else {
            res.send(`Invalid Password or User Name`)
            return;
        }
    }
    catch (e) {
        res.send(`Invalid entries`)
    }
})

app.get('/loginGeneral', async (req, res) => {
    res.render('loginGeneral');
})

//Entering details for login page (change)
app.post('/loginGeneral', async (req, res) => {
    try {
        const name1 = req.body.name;
        req.session.reporterName = name1;
        const checkName = await userLogin.findOne({})
        console.log(checkName)
        if (!req.body.password) {
            res.send("Password Required");
            return;
        }
        if (checkName.password === req.body.password && checkName.name === req.body.name) {
            // res.status(201).render("home",{ naming: `${req.body.password}+${req.body.name}` })
            res.render('chooseNorm');
            return;
        }
        else {
            alert("Invalid userName or Password");
            return;
        }
    }
    catch (e) {
        res.send(e)
        // console.log(e);
    }
})

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.status(500).send('Internal Server Error');
            return;
        }
        res.redirect('/login');
    });
});

app.get('/home', (req, res) =>{
    res.render('home');
})

app.post('/home', async (req, res) => {
    const checkRoll = await retrievelDetails.findOne({ rollNo: req.body.rollNo })
    if (checkRoll && req.body.rollNo == checkRoll.rollNo) {
        const nameStd = checkRoll.name;
        req.session.studentName = nameStd;
        res.render('detailsSample',{checkRoll});
        return;
    }
    else {
        res.send("Not found")
        return;
    }
})

app.get('/detailsSample', async (req, res) => {
    const name1 = req.session.reporterName;
    const name2 = req.session.studentName;
    res.render('issue',{name1,name2});
})


app.post('/issue', async (req, res) => {
    const issueDetails = await retrieveIssue.find({})
    const name1 = req.session.reporterName;
    const name2 = req.session.studentName;
    const data = {
        facultyName: name1,
        studentName: name2,
        reportedOn: new Date(),
        nature: req.body.Nature,
        count: 0
    }
    try {
        await retrieveIssue.insertMany([data]) 
    }
    catch(e) {
        res.send("Unknown Error Occured")
    }
    if (name1 == "reporterBIT")
        res.render('multiple');
    else
        res.render('blockWarn',{data,issueDetails});
})

// app.get('/blockWarn', async (req, res) => {
//     res.render('/blockWarn')
// })
app.get('/blockWarn', async(req, res)=> {
    const checkRoll = await retrievelDetails.find({})
    const blockRoll = await blockDetails.find({})
    let len = Object.keys(checkRoll).length;
    res.render("realblock");
})
app.get('/private', (req, res) => {
    res.render('private')
})
app.get('/sideBar', (req, res) => {
    res.render('sideBar')
})

app.listen(port, () => {
    console.log('Port connected');
})