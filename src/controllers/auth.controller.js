const express  = require('express');
const userService = require('../services/user.service');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');

const signup = async(req,res) =>  {
    console.log(req.body);
        const response  = await userService.CreateUser(req.body);
        if(response.error){
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg : "Signup failed"
            })
        }
        return res.status(StatusCodes.CREATED).json({
            msg : "Successfully created the account",
            userdata: response
        })
}

const login = async(req,res) =>{
    const response = await userService.ValidateUser(req.body);
    console.log
    if(response.error){
        return res.status(StatusCodes.BAD_REQUEST).json({
            msg : "Login failed",
            error : response.error
        })
    }
    const token  = jwt.sign({email : req.body.email} , process.env.secret_key)
    return res.status(StatusCodes.ACCEPTED).json({
        msg : "Successfully Login",
        userdata : response.userdata,
        token : token
    })
}
module.exports = {
    signup,
    login
}