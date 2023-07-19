import axios, { AxiosInstance } from 'axios';
import { destroyTokenUser, refreshTokens } from '../services/api/auth';

export function useApi() {

    const api: AxiosInstance = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL,
        // baseURL: 'http://localhost:3005/api/v1/',
        headers: {
           'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*' 
        },
    })

   // interceptor pour injection token
    api.interceptors.request.use((config) => {
        // Logique supplémentaire pour modifier la requête
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
            console.log("🚀 ~ file: useApi.ts:17 ~ api.interceptors.config.use ~ token:", token)
        }
        return config;
    }, error => {
        Promise.reject(error)
    })
    
    // interceptor response API 
    api.interceptors.response.use((response) => {
        return response
    }, async (error) => {
        if (error.response && error.response.status === 401) {
            const originalRequest = error.config;
            if (!originalRequest._retry) {
                // pour éviter boucle infinie du refreshToken
                originalRequest._retry = true;
            }
            // récupérer le refreshToken localStorage
            const refreshToken = localStorage.getItem('refreshToken')
            //appeler la requete du refreshToken
            if (refreshToken) {
                try {
                    const result = await refreshTokens();
                    console.log('Bonjour REACT')
                    localStorage.setItem('accessToken', result?.data.accessToken);
                    localStorage.setItem('refreshToken', result?.data.refreshToken);
                    originalRequest.headers['Authorization'] = 'Bearer ' + result?.data.accessToken;
                    return axios(originalRequest);
                } catch (error) {
                    destroyTokenUser();
                    window.location.href = "/";  
                }    
            } else {
            // supprimer le token et le refresh
            destroyTokenUser();
            window.location.href = "/";   
            }
        }
        return Promise.reject(error)
        })
    return api
}
