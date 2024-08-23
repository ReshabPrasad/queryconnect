const mongoose = require('mongoose');

const { Schema } = mongoose;


const answerSchema = new Schema({
    userId : {
        type : String, 
    },
    questionId : {
        type  : String,
    },
    description : {
        type : String,
        required:true
    },
    likes : {
        type : Number,
        default : 0,
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
});


const answermodel =  mongoose.model('answer' , answerSchema);

module.exports = answermodel;