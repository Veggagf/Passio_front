import axios from 'axios';


const instance = axios.create({
    baseURL: 'http://localhost:3000/api/',
    withCredentials: true,
});

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    // No adjuntar token si es login o register
    if (token && !config.url.includes('/auth/login') && !config.url.includes('/auth/register')) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Si es 401, verificar que NO sea del login (porque ahí es "credenciales incorrectas", no "token vencido")
        if (error.response && error.response.status === 401) {
            const isLoginRequest = error.config.url.includes('/auth/login');

            if (!isLoginRequest) {
                localStorage.removeItem('token');
                localStorage.removeItem('role');
                // window.location.href = '/login'; 
                console.warn("401 Unauthorized - Token inválido o expirado");
            }
        }
        return Promise.reject(error);
    }
);

export default instance;