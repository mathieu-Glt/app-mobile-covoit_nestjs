import axios from "axios";
import { useApi } from "../../hooks/useApi";

// eslint-disable-next-line react-hooks/rules-of-hooks
const api = useApi();

// function confirm user
export async function Register(body: any) {
    try {
        const register = await api.post('auth/signup', body)
        return register;
    } catch (error) {
        console.log(error)
    }
}

// function login
export async function loginUser(body: any) {
    console.log("🚀 ~ file: auth.ts:19 ~ loginUser ~ body:", body)
    try {
        const login = await api.post('auth/login', body)
        console.log("🚀 ~ file: auth.tsx:21 ~ loginUser ~ login:", login)
        return login;
    } catch (error) {
        console.log('error auth' + error)
    }
}

// function send email reset password
export async function sentEmailResetPassword(body: any) {
    try {
        const sentEmail = await api.post('auth/reset-password', body)
        return sentEmail
    } catch (error) {
        console.log('error auth' + error)
    }
}

// function logout
export async function logout() {
    try {
        const logout = await api.get('auth/logout');
        return logout;
    } catch (error) {
        console.log('error auth' + error)
    }
}
// function refreshTokens
export async function refreshTokens(){
    
    const token = localStorage.getItem('refreshToken');
    const headers = {
        'Authorization': 'Bearer ' + token,
    }
   
    try {
        const refreshResponse = await axios.get(
            import.meta.env.VITE_API_BASE_URL+ 'auth/refresh-token',
            { headers }
        );
        console.log(":rocket: ~ file: auth.tsx:55 ~ refreshToken ~ refreshToken:", refreshResponse)
        return refreshResponse;
    } catch (error) {
        throw new Error("");  
    }
}

// function destroytoken && user
    export async function destroyTokenUser()
    {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
    }
