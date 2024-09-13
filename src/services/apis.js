const BASE_URL = 'http://127.0.0.1:5000'

export const authEndpoints = {
    LOGIN_API: `${BASE_URL}/login`,
    SIGNUP_API: `${BASE_URL}/signup`,
    LOGOUT_API: `${BASE_URL}/logout`
}

export const questionEndpoints = {
    ADD_QUESTIONS_API: `${BASE_URL}/questions/add`,
    GET_ALL_QUESTIONS_API: `${BASE_URL}/questions/get`,
    EDIT_QUESTION_API: `${BASE_URL}/questions/edit/:questionId`,
    DELETE_QUESTION_API: `${BASE_URL}/questions/delete/:questionId`,
}

export const scoreEndpoints = {
    GET_ALL_SCORES_API: `${BASE_URL}/scores/all`,
    GET_SCORES_API: `${BASE_URL}/scores/user/:username`,
    ADD_SCORES_API: `${BASE_URL}/scores/add`
}