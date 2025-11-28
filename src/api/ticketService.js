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
