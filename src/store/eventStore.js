import { useState } from 'react';

export const useEventStore = () => {
	const [events, setEvents] = useState([]);

	const setAllEvents = (eventList) => setEvents(eventList);
	const addEvent = (event) => setEvents((prev) => [...prev, event]);
	const updateEvent = (id, updatedEvent) => setEvents((prev) => prev.map(e => e.id === id ? updatedEvent : e));
	const deleteEvent = (id) => setEvents((prev) => prev.filter(e => e.id !== id));

	return { events, setAllEvents, addEvent, updateEvent, deleteEvent };
};
