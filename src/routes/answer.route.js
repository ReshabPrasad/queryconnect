const express  = require('express') ;
const answercontroller = require('../controllers/answer.controller')
const validators = require('../validators/uservalidator')
const questioncontroller = require('../controllers/question.controller')
const answerroutes  = express.Router() ; 

answerroutes.post('/answer', validators.isUserAuthenticated ,answercontroller.newAnswer);
answerroutes.patch('/answer/:id',  validators.isUserAuthenticated ,answercontroller.updateanswer);
answerroutes.delete('/answer/:id',  validators.isUserAuthenticated ,answercontroller.deleteanswer);
answerroutes.get('/answer/:id', validators.isUserAuthenticated , answercontroller.getAllAnswersOfQuestion);
answerroutes.get('/answer', validators.isUserAuthenticated , answercontroller.getallQuestionsofUser);

module.exports = answerroutes;