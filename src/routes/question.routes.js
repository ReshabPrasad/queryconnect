const express  = require('express') ;
const validators = require('../validators/uservalidator')
const questioncontroller = require('../controllers/question.controller')

const questionroutes  = express.Router() ; 

questionroutes.post('/question', validators.isUserAuthenticated ,questioncontroller.newQuestion);
questionroutes.patch('/question/:id',  validators.isUserAuthenticated ,questioncontroller.updatequestion);
questionroutes.delete('/question/:id',  validators.isUserAuthenticated ,questioncontroller.deletequestion);
questionroutes.get('/question', validators.isUserAuthenticated , questioncontroller.getallQuestions);
questionroutes.get('/question/:id', validators.isUserAuthenticated , questioncontroller.getAllquestionsOfUser);

module.exports = questionroutes;