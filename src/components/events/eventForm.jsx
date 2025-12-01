import { useState, useEffect } from 'react';
import Button from '../common/Button';
import { createEvent, updateEvent } from '../../api/eventService';
import { createTicket, getTicketsByEvent, updateTicket } from '../../api/ticketService';
import { useAuthStore } from '../../store/authStore';

export default function EventForm({ onSaved, initialEvent = null }) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    date: '',
    location: '',
    capacity: '',
    ticketPrice1: '',
    ticketPrice2: '',
    ticketPrice3: ''
  });
  const [loading, setLoading] = useState(false);
  const { role: currentRole } = useAuthStore();
  const isEditing = !!initialEvent;

  useEffect(() => {
    const loadEventData = async () => {
      if (initialEvent) {
        // Formatear la fecha para el input type="date" (YYYY-MM-DD)
        const formattedDate = initialEvent.date ? new Date(initialEvent.date).toISOString().split('T')[0] : '';

        let prices = { ticketPrice1: '', ticketPrice2: '', ticketPrice3: '' };

        // Intentar cargar tickets existentes si estamos editando
        try {
          const tickets = await getTicketsByEvent(initialEvent.id);
          // Asumimos que vienen en orden o los ordenamos por precio/nombre
          // O simplemente llenamos los slots disponibles
          if (tickets && tickets.length > 0) {
            if (tickets[0]) prices.ticketPrice1 = tickets[0].price;
            if (tickets[1]) prices.ticketPrice2 = tickets[1].price;
            if (tickets[2]) prices.ticketPrice3 = tickets[2].price;
          } else {
            // Fallback a los campos antiguos si existen
            prices.ticketPrice1 = initialEvent.ticketPrice1 || '';
            prices.ticketPrice2 = initialEvent.ticketPrice2 || '';
            prices.ticketPrice3 = initialEvent.ticketPrice3 || '';
          }
        } catch (error) {
          console.error("Error cargando tickets del evento:", error);
          // Fallback
          prices.ticketPrice1 = initialEvent.ticketPrice1 || '';
          prices.ticketPrice2 = initialEvent.ticketPrice2 || '';
          prices.ticketPrice3 = initialEvent.ticketPrice3 || '';
        }

        setForm({
          name: initialEvent.name || initialEvent.title || '',
          description: initialEvent.description || '',
          date: formattedDate,
          location: initialEvent.location || '',
          capacity: initialEvent.capacity || '',
          ...prices
        });
      }
    };
    loadEventData();
  }, [initialEvent]);

  // Clase para inputs y select (Fondo negro, texto blanco)
  const inputClasses = "w-full p-3 bg-black text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";
  // Clase para etiquetas (Texto gris/negro, visible sobre fondo blanco del modal)
  const labelClasses = "block text-sm font-medium text-gray-700";

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 1. Preparar payload del evento (sin los precios, o dejándolos si el backend los ignora)
      const eventPayload = {
        name: form.name,
        description: form.description,
        date: form.date,
        location: form.location,
        capacity: form.capacity,
        title: form.name // Compatibilidad
      };

      console.log('Enviando datos del evento:', eventPayload);

      let eventId;
      if (isEditing) {
        await updateEvent(initialEvent.id, eventPayload, currentRole);
        eventId = initialEvent.id;
        alert('Evento actualizado exitosamente');
      } else {
        const response = await createEvent(eventPayload, currentRole);
        // Asumimos que la respuesta devuelve el evento creado con su ID
        eventId = response.id || response.data?.id;
        alert('Evento creado exitosamente');
      }

      // 2. Manejar los boletos si tenemos un ID de evento válido
      if (eventId) {
        // Definir los tipos de boletos basados en los inputs
        // Usaremos nombres genéricos o basados en la posición
        const ticketDefinitions = [
          { price: form.ticketPrice1, name: 'General', description: 'Entrada General' },
          { price: form.ticketPrice2, name: 'Preferente', description: 'Entrada Preferente' },
          { price: form.ticketPrice3, name: 'VIP', description: 'Entrada VIP' }
        ];

        let existingTickets = [];
        if (isEditing) {
          try {
            existingTickets = await getTicketsByEvent(eventId);
          } catch (err) {
            console.warn("No se pudieron cargar tickets existentes", err);
          }
        }

        const promises = ticketDefinitions.map(async (ticketDef, index) => {
          if (ticketDef.price && parseFloat(ticketDef.price) > 0) {
            const ticketData = {
              name: ticketDef.name,
              price: parseFloat(ticketDef.price),
              quantity_available: Math.floor(parseInt(form.capacity) / 3), // Backend espera quantity_available
              stock: Math.floor(parseInt(form.capacity) / 3), // Enviamos ambos por si acaso
              event_id: eventId
            };

            // Si hay un ticket existente en esa "posición" (index), actualizamos
            if (existingTickets[index]) {
              // Solo si el rol permite editar tickets (staff/admin)
              // updateTicket requiere rol
              return updateTicket(existingTickets[index].id, ticketData, currentRole);
            } else {
              return createTicket(ticketData);
            }
          }
          return Promise.resolve();
        });

        await Promise.all(promises);
      }

      onSaved && onSaved();

      if (!isEditing) {
        setForm({ name: '', description: '', date: '', location: '', capacity: '', ticketPrice1: '', ticketPrice2: '', ticketPrice3: '' });
      }
    } catch (err) {
      console.error('Error completo:', err);
      const errorMessage = err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        `No se pudo ${isEditing ? 'actualizar' : 'crear'} el evento`;
      alert(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

      {/* Nombre */}
      <div className="md:col-span-2">
        <label htmlFor="name" className={labelClasses}>Nombre del Evento</label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          className={inputClasses}
          required
        />
      </div>

      {/* Descripción */}
      <div className="md:col-span-2">
        <label htmlFor="description" className={labelClasses}>Descripción</label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          className={inputClasses}
          rows="3"
          required
        />
      </div>

      {/* Fecha */}
      <div>
        <label htmlFor="date" className={labelClasses}>Fecha</label>
        <input
          id="date"
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          className={inputClasses}
          required
        />
      </div>

      {/* Capacidad */}
      <div>
        <label htmlFor="capacity" className={labelClasses}>Capacidad</label>
        <input
          id="capacity"
          name="capacity"
          type="number"
          value={form.capacity}
          onChange={handleChange}
          className={inputClasses}
          required
          min="1"
        />
      </div>

      {/* Ubicación */}
      <div className="md:col-span-2">
        <label htmlFor="location" className={labelClasses}>Ubicación</label>
        <input
          id="location"
          name="location"
          type="text"
          value={form.location}
          onChange={handleChange}
          className={inputClasses}
          required
        />
      </div>

      {/* Precios de Boletos */}
      <div className="md:col-span-2">
        <label className={labelClasses}>Precios de Boletos</label>
        <div className="grid grid-cols-3 gap-4 mt-1">
          <div>
            <label htmlFor="ticketPrice1" className="block text-xs font-medium text-gray-500 mb-1">Precio 1</label>
            <input
              id="ticketPrice1"
              name="ticketPrice1"
              type="number"
              value={form.ticketPrice1}
              onChange={handleChange}
              className={inputClasses}
              placeholder="0.00"
            />
          </div>
          <div>
            <label htmlFor="ticketPrice2" className="block text-xs font-medium text-gray-500 mb-1">Precio 2</label>
            <input
              id="ticketPrice2"
              name="ticketPrice2"
              type="number"
              value={form.ticketPrice2}
              onChange={handleChange}
              className={inputClasses}
              placeholder="0.00"
            />
          </div>
          <div>
            <label htmlFor="ticketPrice3" className="block text-xs font-medium text-gray-500 mb-1">Precio 3</label>
            <input
              id="ticketPrice3"
              name="ticketPrice3"
              type="number"
              value={form.ticketPrice3}
              onChange={handleChange}
              className={inputClasses}
              placeholder="0.00"
            />
          </div>
        </div>
      </div>

      <div className="md:col-span-2 mt-4">
        <Button type="submit" className="bg-black text-white hover:bg-gray-800 w-full" disabled={loading}>
          {loading ? 'Guardando...' : (isEditing ? 'Actualizar Evento' : 'Crear Evento')}
        </Button>
      </div>
    </form>
  );
}
