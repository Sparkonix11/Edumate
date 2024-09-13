import { apiConnector } from "../apiConnector";
import { scoreEndpoints } from "../apis";
const { GET_ALL_SCORES_API, GET_SCORES_API, ADD_SCORES_API } = scoreEndpoints

export async function fetchAllScores() {
    try {
        const response = await apiConnector('GET', GET_ALL_SCORES_API)
        const responseData = response.data
        console.log(responseData)
        return { success: true, responseData }
    } catch (error) {
        console.error('Error during getting all the Scores:', error)
        console.error('Error response:', error.response)
        const errorMessage = error.response.data.message
        return { success: false, errorMessage }
    }
}


export async function fetchUserScores(username) {
    try {
        const response = await apiConnector('GET',  `${GET_SCORES_API.replace(':username', username)}`)
        const responseData = response.data
        console.log(responseData)
        return { success: true, responseData }
    } catch (error) {
        console.error('Error during getting the Users Scores:', error)
        console.error('Error response:', error.response)
        const errorMessage = error.response.data.message
        return { success: false, errorMessage }
    }
}

export async function addScore(data) {
    try {
        const response = await apiConnector('POST', ADD_SCORES_API, data)
        const responseData = response.data
        const { message } = responseData
        return { success: true, message };
       

    } catch (error) {
        console.error('Error Adding Score:', error)
        console.error('Error response:', error.response)
    
        const errorMessage = error.response.data.message
        return { success: false, message: errorMessage }
    }
}