import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://localhost:3000/api', 
	withCredentials: true,
});

instance.interceptors.request.use((config) => {
	const token = localStorage.getItem('token');
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

// Response interceptor: handle 401 Unauthorized globally
instance.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response && error.response.status === 401) {
			// Clear persisted auth store via localStorage and redirect to login
			localStorage.removeItem('token');
			localStorage.removeItem('role');
			window.location.href = '/login';
		}
		return Promise.reject(error);
	}
);

export default instance;
