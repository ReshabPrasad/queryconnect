const express  = require('express');
const questionservice = require('../services/question.service');
const userservice  = require('../services/user.service');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');

const newQuestion = async(req,res) => {
    try {
        const checkid = await userservice.getUserById(req.body);
        console.log(checkid);
        if(checkid.error){
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg : "User Id not found",
                error : checkid.error
            })
        }
        const response = await questionservice.CreateQuestion(req.body);
        if(response.error){
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg : "Question not created",
                error : response.error
            })
        }
        console.log(response);
        return res.status(StatusCodes.CREATED).json({
            msg : "Question created",
            question : response
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            msg : "Internal Server error",
        })
    }
}


const updatequestion = async(req,res) => {
    try {
        const checkid = await userservice.getUserById(req.body);
        if(checkid.error){
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg : "User Id not found",
                error : checkid.error
            })
        }
        const validcheck = await questionservice.getQuestionById(req.params);   // update possible only by the user who has created the question
        if(validcheck.error){
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg : "Ticket Id not found",
                error : checkid.error
            })
        }
        if((req.body.user_id)!=(validcheck.question.userId)){
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg : "Access denied",
            })
        }
        const response = await questionservice.UpdateQuestion(req.params,req.body);
        if(response.error){
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg : "Question not updated",
                error : response.error
            })
        }
        return res.status(StatusCodes.CREATED).json({
            msg : "Question updated",
            question : response
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            msg : "Internal Server error",
        })
    }
}

const deletequestion = async(req,res) => {
    try {
        const checkid = await userservice.getUserById(req.body);
        console.log("hi",checkid);
        if(checkid.error){
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg : "User Id not found",
                error : checkid.error
            })
        }
        const validcheck = await questionservice.getQuestionById(req.params);   // deletion possible only by the user who has created the question
        console.log("valid");
        if(validcheck.error){
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg : "Ticket Id not found",
                error : checkid.error
            })
        }
        if((req.body.user_id)!=(validcheck.question.userId)){
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg : "Access denied",
            })
        }
        const response = await questionservice.DeleteQuestion(req.params);
        if(response.error){
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg : "Question not deleted",
                error : response.error
            })
        }
        return res.status(StatusCodes.ACCEPTED).json({
            msg : "Question Deleted",
            question : response
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            msg : "Internal Server error",
        })
    }
}


const getAllquestionsOfUser = async(req,res) => {
    try {
        const checkid = await userservice.getUserById(req.body);
        if(checkid.error){
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg : "User Id not found",
                error : checkid.error
            })
        }
        const response = await questionservice.getQuestionByUserId(req.body);
        if(response.error){
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg : "No questions available",
                error : response.error
            })
        }
        return res.status(StatusCodes.OK).json({
            msg : "Question Fetched",
            question : response
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            msg : "Internal Server error",
        })
    }
}

const getallQuestions = async(req, res) => {
    try {
        const checkid = await userservice.getUserById(req.body);
        if (checkid.error) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg: "User Id not found",
                error: checkid.error
            });
        }

        const allquestions = await questionservice.getAllQuestions();
        if (allquestions.error) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                msg: "No questions available",
                error: allquestions.error 
            });
        }

        return res.status(StatusCodes.OK).json({
            msg: "Questions Fetched",
            questions: allquestions.questions 
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            msg: "Internal Server error",
        });
    }
}






module.exports = {
    newQuestion,
    updatequestion,
    deletequestion,
    getAllquestionsOfUser,
    getallQuestions
}