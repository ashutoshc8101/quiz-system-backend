const Router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('./../model/User');
const jwt = require('jsonwebtoken');
const chalk = require('chalk');

const registerValidation = require('./validation/registerValidation');
const loginValidation = require('./validation/loginValidation');
const meValidation = require('./validation/meValidation');



/**
*
* {
*   email: String,
*   password: String,
*   name: String
* }
* 
*/


Router.post('/register',registerValidation.rules, registerValidation.nextMiddlware, (req,res)=>{
     console.log(chalk.red.bold('Hitted'));

    User.findOne({ email: req.body.email }, (err, user)=>{
        if(err) throw err;

        if(user){
            res.status(401).send({ 'msg': 'Account already exists' });
        }

        if(!user){
               bcrypt.genSalt(10, (err, salt)=>{
                   if(err) console.log(err);
                bcrypt.hash(req.body.password, salt, (err, hash)=>{
                    if(err) console.log(err);
                    let us = new User({
                        name: req.body.name,
                        email: req.body.email,
                        password: hash
                    });

                    us.save((err, user)=>{
                        if (err) return res.status(500).send({msg: "There was a problem registering the user."});

                         let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                          expiresIn: 86400 // expires in 24 hours
                        });

                         res.status(200).send({ auth: true, token });

                    });
                });
            }); 
        }
    });



});

/**
*
* Request Header: x-access-token
* 
*/


Router.get('/me',meValidation.rules, meValidation.nextMiddlware, function(req, res) {
  let token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({ status: false, message: 'No token provided.' });
  
  jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
    if (err) return res.status(500).send({ status: false, message: 'Failed to authenticate token.' });
    
    console.log(decoded);
    
    User.findById(decoded.id, function (err, user) {
      if (err) return res.status(500).send({status: false, message: "There was a problem finding the user."});
      if (!user) return res.status(401).send({status: false, message: "No user found."});
      
      res.status(200).send({ status: true, user});
    });
  });
});

/**
*
* {
*   email: String,
*   password: String
* }
* 
*/

Router.post('/login', loginValidation.rules, loginValidation.nextMiddlware ,(req,res)=>{
     console.log(chalk.red.bold('Hitted'));
    User.findOne({ email: req.body.email }, (err,user)=>{
        if(err) res.status(401).send({ msg: 'Something went wrong' });

        if(user){
            bcrypt.compare(req.body.password, user.password, function(err, result) {
                if(err) res.status(500).send({msg: 'Internal server error'});
                if(!result){
                    res.status(401).send({msg: 'Invalid username and password'});
                }else{
                    let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                          expiresIn: 86400 // expires in 24 hours
                        });

                    res.send({ auth: true, token });
                }
            });
        }else{
            res.status(401).send({msg: 'Username and password doesnot exits'});
        }

    });
});

module.exports = Router;
