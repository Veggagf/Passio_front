import axios from './axios';

export const getUsers = async () => {
	const response = await axios.get('/users');
	return response.data;
};

export const getUserById = async (id) => {
	const response = await axios.get(`/users/${id}`);
	return response.data;
};

export const createUser = async (userData, role) => {
	if (role === 'administrador' || role === 'organizador') {
		const response = await axios.post('/users', userData);
		return response.data;
	}
	throw new Error('No tienes permisos para crear usuarios');
};

export const updateUser = async (id, userData, role) => {
	if (role === 'administrador' || role === 'organizador') {
		const response = await axios.put(`/users/${id}`, userData);
		return response.data;
	}
	throw new Error('No tienes permisos para editar usuarios');
};

export const deleteUser = async (id, role) => {
	if (role === 'administrador') {
		const response = await axios.delete(`/users/${id}`);
		return response.data;
	}
	throw new Error('No tienes permisos para eliminar usuarios');
};
