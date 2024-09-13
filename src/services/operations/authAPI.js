import { authEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
const { LOGIN_API, SIGNUP_API, LOGOUT_API } = authEndpoints


export async function login(formData) {
    try {
        const response = await apiConnector('POST', LOGIN_API, formData)
        const responseData = response.data
    
        // Assuming response data includes a message and user
        const { message, user, questions } = responseData
    
        // Update store or handle response as needed
        localStorage.setItem('current_user', JSON.stringify(user))
        localStorage.setItem('questions', JSON.stringify(questions))
    
        //   router.push('/dashboard')
        
      return { success: true, message, user }
    } catch (error) {
      console.error('Error logging in:', error)
      console.error('Error response:', error.response)
  
      const errorMessage = error.response.data.message
      return { success: false, message: errorMessage }
    }
}

export async function signup(formData) {
    try {
        const response = await apiConnector('POST', SIGNUP_API, formData)
        const responseData = response.data

        // Assuming response data includes a message and user
        const { message, user, questions } = responseData

        // Update store or handle response as needed
        localStorage.setItem('current_user', JSON.stringify(user))
        localStorage.setItem('questions', JSON.stringify(questions))
        // router.push('/dashboard')

        return { success: true, message, user }
    } catch (error) {
        console.error('Error:', error)

        const errorMessage = error.response.data.message
        return { success: false, message: errorMessage }
    }
}

export async function logout() {
    try {
      // Send logout request
      await apiConnector('POST', LOGOUT_API)
      
      localStorage.setItem('current_user', null)
      localStorage.setItem('questions', null)

      // Handle response as needed   
      return { success: true }
    } catch (error) {
      console.error('Error:', error.response)
  
      return { success: false }
    }
}