
import axios from 'axios'

const API_URL = "/api/user"

const register = async(userData) =>{   
    let response = await  axios.post(API_URL + '/register' , userData)
    if(response.data){
        // console.log(response.data)
        localStorage.setItem('user' , JSON.stringify(response.data))
    }
    // console.log(response.data)
    return response.data
}

const login = async(userData) =>{    
    let response = await  axios.post(API_URL + '/login' , userData)
    if(response.data){
        console.log(response.data)
        localStorage.setItem('user' , JSON.stringify(response.data))
    }
    return response.data
}

const logout = () => {
    localStorage.removeItem("user")
}

const authService = {
    register,
    logout,
    login
}

export default authService