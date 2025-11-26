import Input from '../common/Input';
import Button from '../common/Button';
import { useState, useEffect } from 'react';
import { createEvent, updateEvent } from '../../api/eventService';
import { useAuthStore } from '../../store/authStore';

export default function EventForm({ initial = null, onSaved }) {
  const [form, setForm] = useState({ nombre: '', descripcion: '', fecha: '', ubicacion: '', capacidad: 0 });
  const { role } = useAuthStore();

  useEffect(() => { if (initial) setForm(initial); }, [initial]);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (initial && initial.id) {
        await updateEvent(initial.id, form, role);
      } else {
        await createEvent(form, role);
      }
      if (onSaved) onSaved();
    } catch (err) {
      console.error(err);
      alert('Error guardando evento');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input id="nombre" name="nombre" label="Nombre" value={form.nombre} onChange={handleChange} />
      <Input id="fecha" name="fecha" label="Fecha" type="date" value={form.fecha} onChange={handleChange} />
      <Input id="ubicacion" name="ubicacion" label="Ubicación" value={form.ubicacion} onChange={handleChange} />
      <Input id="capacidad" name="capacidad" label="Capacidad" type="number" value={form.capacidad} onChange={handleChange} />
      <div>
        <label className="mb-1 block text-sm text-gray-400">Descripción</label>
        <textarea name="descripcion" value={form.descripcion} onChange={handleChange} className="bg-transparent border border-gray-600 rounded-md p-3 text-white w-full" />
      </div>
      <Button type="submit" className="bg-white text-black">Guardar</Button>
    </form>
  );
}
