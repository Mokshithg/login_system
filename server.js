const express = require('express');
const app = express();
const path = require('path');
const bodyparser = require('body-parser')
const session = require('express-session');
const { v4: uuidv4} = require("uuid");

const router = require('./router')

const port = process.env.PORT || 8000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended : true}))

app.set('view engine','ejs');

app.use('/static', express.static(path.join(__dirname,'public')));

app.use(session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true
}));

app.use('/route',router);

app.get('/',(req,res)=>{
    res.render('base',{title: "Login Page"});
})

app.listen(port,()=>{console.log(`listening on the PORT No ${port}`)})