const express=require("express");
const { default: mongoose } = require("mongoose");
const fs=require("fs");
const path=require('path');
const route = require('./route.js');


const app = express()
const dotenv = require('dotenv')
dotenv.config()

mongoose.connect('mongodb+srv://Shrikant:shreyushri@cluster0.xjishte.mongodb.net/pdftotext')
.then(() => {
    console.log('Nanana')
})
.catch((e) => {
    console.log(e)
}) 

app.use(express.urlencoded({ extended: true }))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(`${__dirname}/public`))

app.use("/",route)

const port = process.env.PORT || 9000
app.listen(port, () => {
    console.log(`Application is listening on port ${port}`)
})
























// const app=express();
// const bodyParser=require("body-parser");
// const route=require("./route.js")

// app.use(bodyParser.json());

// app.use(express.urlencoded({extended:true}));



// mongoose.connect("mongodb+srv://Shrikant:shreyushri@cluster0.xjishte.mongodb.net/pdftotext", {
//     useNewUrlParser: true
// })
// .then(() => { console.log('Connected to MongoDB') })
// .catch(err => { console.log('Error connecting to MongoDB: ' + err) });

// app.use("/",route);

// app.listen(3000, ()=>console.log("server is running on 3000"))