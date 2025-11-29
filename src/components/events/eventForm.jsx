import { useState, useEffect } from 'react';
import Button from '../common/Button';
import { createEvent, updateEvent } from '../../api/eventService';
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
    if (initialEvent) {
      // Formatear la fecha para el input type="date" (YYYY-MM-DD)
      const formattedDate = initialEvent.date ? new Date(initialEvent.date).toISOString().split('T')[0] : '';

      setForm({
        name: initialEvent.name || initialEvent.title || '',
        description: initialEvent.description || '',
        date: formattedDate,
        location: initialEvent.location || '',
        capacity: initialEvent.capacity || '',
        ticketPrice1: initialEvent.ticketPrice1 || '',
        ticketPrice2: initialEvent.ticketPrice2 || '',
        ticketPrice3: initialEvent.ticketPrice3 || ''
      });
    }
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
      // Preparar payload asegurando que se envíe tanto name como title por si acaso
      const payload = {
        ...form,
        title: form.name // Asegurar que el título también se actualice si el backend usa 'title'
      };

      console.log('Enviando datos del evento:', payload);

      if (isEditing) {
        await updateEvent(initialEvent.id, payload, currentRole);
        alert('Evento actualizado exitosamente');
      } else {
        await createEvent(payload, currentRole);
        alert('Evento creado exitosamente');
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
