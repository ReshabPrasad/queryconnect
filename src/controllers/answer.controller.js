const express  = require('express');
const answerservice = require('../services/answer.service');
const userservice  = require('../services/user.service');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');

const newAnswer= async(req,res) => {
    try {
        const checkid = await userservice.getUserById(req.body);
        console.log(checkid);
        if(checkid.error){
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg : "User Id not found",
                error : checkid.error
            })
        }
        const response = await answerservice.CreateAnswer(req.body);
        if(response.error){
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg : "Answer not created",
                error : response.error
            })
        }
        console.log(response);
        return res.status(StatusCodes.CREATED).json({
            msg : "Answer created",
            answer : response
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            msg : "Internal Server error",
        })
    }
}


const updateanswer = async(req,res) => {
    try {
        const checkid = await userservice.getUserById(req.body);
        if(checkid.error){
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg : "User Id not found",
                error : checkid.error
            })
        }
        const validcheck = await answerservice.getAnswerById(req.params);   // update possible only by the user who has created the answer
        if(validcheck.error){
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg : "Answer Id not found",
                error : checkid.error
            })
        }
        if((req.body.user_id)!=(validcheck.answer.userId)){
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg : "Access denied",
            })
        }
        const response = await answerservice.UpdateAnswer(req.params,req.body);
        if(response.error){
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg : "Answer not updated",
                error : response.error
            })
        }
        return res.status(StatusCodes.CREATED).json({
            msg : "Answer updated",
            answer : response
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            msg : "Internal Server error",
        })
    }
}

const deleteanswer = async(req,res) => {
    try {
        const checkid = await userservice.getUserById(req.body);
        console.log("hi",checkid);
        if(checkid.error){
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg : "User Id not found",
                error : checkid.error
            })
        }
        const validcheck = await answerservice.getAnswerById(req.params);   // deletion possible only by the user who has created the question
        console.log("valid");
        if(validcheck.error){
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg : "Answer Id not found",
                error : checkid.error
            })
        }
        if((req.body.user_id)!=(validcheck.answer.userId)){
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg : "Access denied",
            })
        }
        const response = await answerservice.DeleteAnswer(req.params);
        if(response.error){
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg : "Answer not deleted",
                error : response.error
            })
        }
        return res.status(StatusCodes.ACCEPTED).json({
            msg : "Answer Deleted",
            answer : response
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            msg : "Internal Server error",
        })
    }
}


const getAllAnswersOfQuestion = async(req,res) => {
    try {
        const checkid = await userservice.getUserById(req.body);
        if(checkid.error){
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg : "User Id not found",
                error : checkid.error
            })
        }
        const response = await answerservice.getAnswerByQuestionId(req.params);
        if(response.error){
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg : "No answers available",
                error : response.error
            })
        }
        return res.status(StatusCodes.OK).json({
            msg : "Answers Fetched",
            answer : response
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            msg : "Internal Server error",
        })
    }
}

const getallQuestionsofUser = async(req, res) => {
    try {
        const checkid = await userservice.getUserById(req.body);
        if (checkid.error) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg: "User Id not found",
                error: checkid.error
            });
        }

        const response = await answerservice.getAllAnswersByUserId(req.body);
        if (response.error) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg: "No answer available",
                error: response.error 
            });
        }

        return res.status(StatusCodes.OK).json({
            msg: "Answers Fetched",
            answers: response.answer
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            msg: "Internal Server error",
        });
    }
}






module.exports = {
    newAnswer,
    updateanswer,
    deleteanswer,
    getAllAnswersOfQuestion,
    getallQuestionsofUser
}