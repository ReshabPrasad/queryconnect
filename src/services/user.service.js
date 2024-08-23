const usermodel = require("../models/user.model");
const bcrypt = require('bcrypt');

const CreateUser = async(data) => { 
    const response  = {};
    try {
        const userObject = {
            name :  data.name,
            email : data.email , 
            password  : data.password,
        }
        response.user = await usermodel.create(userObject)
        return response;
    } catch (error) {
        console.log("Error" , error);
        response.error = error.message;
        return response ; 
    }
};

const ValidateUser  = async(data) =>{
    const response = {};
    try {
        const res = await usermodel.findOne({email : data.email});
        if(!res){
            response.error = "Invalid email";
            return response;
        }
        const result = bcrypt.compareSync(data.password, res.password);
        if(!result){
            response.error = "Invalid password";
            return response
        }
        response.userdata = res ; 
        return response;
    } catch (error) {
        console.log("Error" , error);
        response.error = error.message;
        return response ; 
    }
}

const getUserByEmail = async (data) => {
    const response = {};
    try {
        const user = await usermodel.findOne({ email: data.email });
        if (!user) {
            response.error = "Invalid email";
            return response;
        }
        response.user = user;
        return response;
    } catch (error) {
        console.log("Error", error);
        response.error = error.message;
        return response;
    }
};

const getUserById = async (data) => {
    const response = {};
    try {
        const user = await usermodel.findOne({ _id: data.user_id });
        console.log(user, " hi");
        if (!user) {
            response.error = "Invalid userId";
            return response;
        }
        response.user = user;
        return response;
    } catch (error) {
        console.log("Error", error);
        response.error = error.message;
        return response;
    }
};

module.exports = {
    CreateUser,
    ValidateUser,
    getUserByEmail,
    getUserById
};
