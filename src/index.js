const express = require('express') ; 
const {Port} = require('./config/server.config');
const bodyParser = require('body-parser');
const mongoose  = require('mongoose');
const { Mongo_DB_URL } = require('./config/db.config');
const userroutes = require('./routes/userroutes');
const questionroutes = require('./routes/question.routes');
const answerroutes = require('./routes/answer.route');

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());



app.get('/ping', (req, res) => {
    return res.json({message: 'ok'});
});

app.use('/queryconnect', userroutes);
app.use('/queryconnect', questionroutes);
app.use('/queryconnect', answerroutes);

async function ConnectToDb(){

    try {
        
      await mongoose.connect(Mongo_DB_URL);
      console.log("Connected to DB");
    } catch (error) {
        console.log("Connection to DB failed");
        console.log(error);
    }

}

ConnectToDb();

app.listen(Port , () => {
   console.log(`Server started at PORT : ${Port}`);
})