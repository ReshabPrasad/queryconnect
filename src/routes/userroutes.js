const express  = require('express') ;
const authcontroller = require('../controllers/auth.controller')

const userroutes  = express.Router() ; 

userroutes.post('/auth/signup', authcontroller.signup);
userroutes.get('/auth/signin' ,authcontroller.login);

module.exports = userroutes;