import axios from './axios';

export const getTickets = async () => {
	const response = await axios.get('/tickets');
	return response.data;
};

export const getTicketsByEvent = async (eventId) => {
	const response = await axios.get(`/tickets/event/${eventId}`);
	return response.data;
};

export const buyTicket = async (ticketId, quantity) => {
	const response = await axios.post('/tickets/buy', { ticket_id: ticketId, quantity });
	return response.data;
};

export const createTicket = async (ticketData) => {
	const response = await axios.post('/tickets', ticketData);
	return response.data;
};

export const updateTicket = async (id, ticketData, role) => {
	if (role === 'staff' || role === 'administrador') {
		const response = await axios.put(`/tickets/${id}`, ticketData);
		return response.data;
	}
	throw new Error('No tienes permisos para editar boletos');
};

export const deleteTicket = async (id, role) => {
	if (role === 'administrador') {
		const response = await axios.delete(`/tickets/${id}`);
		return response.data;
	}
	throw new Error('No tienes permisos para eliminar boletos');
};

export const getUserTickets = async () => {
	const response = await axios.get('/tickets/user');
	return response.data;
};

export const validateTicket = async (code) => {
	const response = await axios.post('/tickets/validate', { qr_code: code });
	return response.data;
};

export const getAccessLogsByEvent = async (eventId) => {
	const response = await axios.get(`/tickets/event/${eventId}/logs`);
	return response.data;
};
