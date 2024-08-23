const questionmodel = require("../models/question.model");
const usermodel = require("../models/user.model");
const bcrypt = require ('bcrypt')



const CreateQuestion = async(data) => {
    const response = {}
    try {
        const question = {
            userId: data.user_id,
            description:data.description,
        }
        const questionresponse = await questionmodel.create(question);
        if(!questionresponse){
            response.error = "Question not created";
            return response; 
        }
        return questionresponse;

    } catch (error) {
        response.error = error;
        return response;
    }
}


const UpdateQuestion = async (data,ticketinfo) => {
    const response = {};
    try {
        if(!ticketinfo.description){
            response.error = "Description cannot be empty";
            return response;
        }
        const questionresponse = await questionmodel.findByIdAndUpdate(
            { _id: data.id}, {description:ticketinfo.description} ,{ new: true }
        );

        console.log("hi", questionresponse);

        if (!questionresponse) {
            response.error = "Question not updated";
            return response;
        }

        return questionresponse;

    } catch (error) {
        console.log("Error", error.message);
        response.error = error.message;
        return response;
    }
};


const DeleteQuestion = async (data) => {
    const response = {};
    try {
        const questionresponse = await questionmodel.findByIdAndDelete(
            data.id
        );

        console.log("hi", questionresponse);

        if (!questionresponse) {
            response.error = "Question not deleted";
            return response;
        }

        return questionresponse;

    } catch (error) {
        console.log("Error", error.message);
        response.error = error.message;
        return response;
    }
};


const getQuestionById = async (data) => {
    const response = {};
    try {
        const question = await questionmodel.findById(data.id);
        console.log("hiiiiiii" , question);
        if (!question) {
            response.error = "Invalid question id";
            return response;
        }
        response.question = question;
        return response;
    } catch (error) {
        console.log("Error", error);
        response.error = error.message;
        return response;
    }
};


const getQuestionByUserId = async (data) => {
    const response = {};
    try {
        const question = await questionmodel.find({userId : data.user_id});
        if (!question) {
            response.error = "No questions found";
            return response;
        }
        response.question = question;
        return response;
    } catch (error) {
        console.log("Error", error);
        response.error = error.message;
        return response;
    }
};

const getAllQuestions = async() => {
    const response = {};
    try {
        const allquestions = await questionmodel.find({});
        console.log("hellooo", allquestions);
        if (!allquestions || allquestions.length === 0) {
            response.error = "No questions available";
            return response;
        }
        response.questions = allquestions; 
        return response;
    } catch (error) {
        response.error = error.message;
        return response;
    }
}





module.exports = {
    CreateQuestion,
    UpdateQuestion,
    DeleteQuestion,
    getQuestionById,
    getQuestionByUserId,
    getAllQuestions
}