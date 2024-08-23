const mongoose = require('mongoose');

const { Schema } = mongoose;


const questionschema = new Schema({
    userId : {
        type : String, 
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


const questionmodel =  mongoose.model('question' , questionschema);

module.exports = questionmodel;