const e = require('express');
var express = require("express");
var router = express.Router();

const credential = {
    email: "garipallymokshith@gmail.com",
    password: "Mokshith123"
}

router.post('/login',(req,res) =>{
    if(req.body.email == credential.email && req.body.password == credential.password){
        req.session.user = req.body.email;
        res.redirect('/route/dashboard');
        // res.end("Login Successful...!");
    }else{
        res.end("Invalid Credentials");
    }
});

router.get('/dashboard',(req,res)=>{
    if(req.session.user){
        res.render('dashboard',{user: req.session.user})
    }
    else{
        res.send("unauthorize user")
    }
})

router.get('/logout',(req,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("Error");
        }else{
            res.render('base',{title: "Express",logout: "Logout successfully!"})
        }
    })
})

module.exports = router;