const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const { Schema } = mongoose;


const userSchema = new Schema({
    name : {
        type : String ,
        required : true
    },
    email  : {
        type : String,
        required : true,
        match : /^[a-zA-Z0-9._%+-]+@gmail\.com$/
    },
    password : {
        type : String,
        required : true,
        match: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5,}$/,
    },
    createdAt  :{
        type : Date,
        default : Date.now
    },
});

userSchema.pre('save', function(next) {
    const hashedPassword = bcrypt.hashSync(this.password, 11);
    this.password = hashedPassword;
    next();
});

const usermodel =  mongoose.model('user' , userSchema);

module.exports = usermodel;