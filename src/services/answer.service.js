const answermodel = require("../models/answer.model");
const questionmodel = require("../models/question.model");
const usermodel = require("../models/user.model");
const bcrypt = require ('bcrypt')



const CreateAnswer = async(data) => {
    const response = {}
    try {
        const answer = {
            userId: data.user_id,
            questionId: data.question_id,
            description:data.description,
        }
        const answerresponse = await answermodel.create(answer);
        if(!answerresponse){
            response.error = "Answer not created";
            return response; 
        }
        return answerresponse;

    } catch (error) {
        response.error = error;
        return response;
    }
}


const UpdateAnswer = async (data,answerinfo) => {
    const response = {};
    try {
        if(!answerinfo.description){
            response.error = "Description cannot be empty";
            return response;
        }
        const answerresponse = await answermodel.findByIdAndUpdate(
            { _id: data.id}, {description:answerinfo.description},{ new: true }
        );
        console.log("hi", answerresponse);
        if (!answerresponse) {
            response.error = "Answer not updated";
            return response;
        }
        return answerresponse;

    } catch (error) {
        console.log("Error", error.message);
        response.error = error.message;
        return response;
    }
};


const DeleteAnswer = async (data) => {
    const response = {};
    try {
        const answerresponse = await answermodel.findByIdAndDelete(
            data.id
        );

        console.log("hi", answerresponse);

        if (!answerresponse) {
            response.error = "Answer not deleted";
            return response;
        }

        return answerresponse;

    } catch (error) {
        console.log("Error", error.message);
        response.error = error.message;
        return response;
    }
};


const getAnswerById = async (data) => {
    const response = {};
    try {
        const answer = await answermodel.findById(data.id);
        console.log("hiiiiiii" , answer);
        if (!answer) {
            response.error = "Invalid answer id";
            return response;
        }
        response.answer = answer;
        return response;
    } catch (error) {
        console.log("Error", error);
        response.error = error.message;
        return response;
    }
};


const getAnswerByQuestionId = async (data) => {
    const response = {};
    try {
        const answers = await answermodel.find({questionId : data.id});
        if (!answers || answers.length()==0) {
            response.error = "No answer found";
            return response;
        }
        response.answer = answers;
        return response;
    } catch (error) {
        console.log("Error", error);
        response.error = error.message;
        return response;
    }
};

const getAllAnswersByUserId = async(data) => {
    const response = {};
    try {
        const answers = await answermodel.find({userId : data.user_id});
        if (!answers || answers.length === 0) {
            response.error = "No answer available";
            return response;
        }
        response.answer = answers; 
        return response;
    } catch (error) {
        response.error = error.message;
        return response;
    }
}





module.exports = {
    CreateAnswer,
    UpdateAnswer,
    DeleteAnswer,
    getAnswerByQuestionId,
    getAllAnswersByUserId
}