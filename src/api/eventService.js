import axios from './axios';

export const getEvents = async () => {
	const response = await axios.get('/events');
	return response.data;
};

export const getEventById = async (id) => {
	const response = await axios.get(`/events/${id}`);
	return response.data;
};

export const createEvent = async (eventData, role) => {
	if (role === 'organizador' || role === 'administrador') {
		const response = await axios.post('/events', eventData);
		return response.data;
	}
	throw new Error('No tienes permisos para crear eventos');
};

export const updateEvent = async (id, eventData, role) => {
	if (role === 'organizador' || role === 'administrador') {
		const response = await axios.put(`/events/${id}`, eventData);
		return response.data;
	}
	throw new Error('No tienes permisos para editar eventos');
};

export const deleteEvent = async (id, role) => {
	if (role === 'organizador' || role === 'administrador') {
		const response = await axios.delete(`/events/${id}`);
		return response.data;
	}
	throw new Error('No tienes permisos para eliminar eventos');
};
