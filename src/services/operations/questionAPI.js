import { questionEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";

const {  ADD_QUESTIONS_API, GET_ALL_QUESTIONS_API, EDIT_QUESTION_API, DELETE_QUESTION_API } = questionEndpoints

export async function fetchAllQuestions() {
    try {
        const response = await apiConnector('GET', GET_ALL_QUESTIONS_API)
        const responseData = response.data
        localStorage.setItem('questions', responseData)
        return { success: true, responseData }
    } catch (error) {
        console.error('Error during getting all the questions:', error)
        console.error('Error response:', error.response)
        const errorMessage = error.response.data.message
        return { success: false, errorMessage }
    }
}

export async function addQuestion(data) {
    try {
        const response = await apiConnector('POST', ADD_QUESTIONS_API, data)
        const responseData = response.data
        const { message, questions } = responseData
        localStorage.setItem('questions', JSON.stringify(questions))
        return { success: true, message };
       

    } catch (error) {
        console.error('Error Adding a Question:', error)
        console.error('Error response:', error.response)
    
        const errorMessage = error.response.data.message
        return { success: false, message: errorMessage }
    }
}

export async function editQuestion(data, questionId) {
    try {
        const response = await apiConnector('PUT', `${EDIT_QUESTION_API.replace(':questionId', questionId)}`, data);
        const responseData = response.data
        const { message, questions } = responseData
        localStorage.setItem('questions', JSON.stringify(questions))
        return { success: true, message };
    } catch (error) {
        console.error('Error Editing a Question:', error);
        console.error('Error response:', error.response);
    
        const errorMessage = error.response.data.message;
        return { success: false, message: errorMessage };
    }
}

export async function deleteQuestion(questionId) {
    try {
        const response = await apiConnector('DELETE', `${DELETE_QUESTION_API.replace(':questionId', questionId)}`);
        const responseData = response.data
        const { message, questions } = responseData
        localStorage.setItem('questions', JSON.stringify(questions))
        return { success: true, message };
    } catch (error) {
        console.error('Error Deleting a Question:', error);
        console.error('Error response:', error.response);
    
        const errorMessage = error.response.data.message;
        return { success: false, message: errorMessage };
    }
}
