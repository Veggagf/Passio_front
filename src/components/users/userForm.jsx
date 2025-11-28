import { useState } from 'react';
import Button from '../common/Button';
import { createUser } from '../../api/userService';
import { useAuthStore } from '../../store/authStore';

export default function UserForm({ onSaved }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'usuario', username: '' });
  const [loading, setLoading] = useState(false);
  const { role: currentRole } = useAuthStore();

  // Clase para inputs y select (Fondo negro, texto blanco)
  const inputClasses = "w-full p-3 bg-black text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";
  // Clase para etiquetas (Texto gris/negro, visible sobre fondo blanco del modal)
  const labelClasses = "block text-sm font-medium text-gray-700";

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createUser(form, currentRole);
      onSaved && onSaved();
      // Limpiar el formulario después de guardar
      setForm({ name: '', email: '', password: '', role: 'usuario', username: '' });
    } catch (err) {
      console.error(err);
      alert('No se pudo crear el usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

      {/* Campo Nombre */}
      <div>
        <label htmlFor="name" className={labelClasses}>Nombre</label>
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

      {/* Campo Correo */}
      <div>
        <label htmlFor="email" className={labelClasses}>Correo</label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className={inputClasses}
          required
        />
      </div>

      {/* Campo Username */}
      <div>
        <label htmlFor="username" className={labelClasses}>Username</label>
        <input
          id="username"
          name="username"
          type="text"
          value={form.username}
          onChange={handleChange}
          className={inputClasses}
          required
        />
      </div>

      {/* Campo Contraseña */}
      <div>
        <label htmlFor="password" className={labelClasses}>Contraseña</label>
        <input
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          className={inputClasses}
          required
        />
      </div>

      {/* Campo Rol (Select) */}
      <div>
        <label htmlFor="role" className={labelClasses}>Rol</label>
        <select
          id="role"
          name="role"
          value={form.role}
          onChange={handleChange}
          className={inputClasses}
        >
          <option value="usuario" className="bg-black text-white">Usuario</option>
          <option value="organizador" className="bg-black text-white">Organizador</option>
          <option value="staff" className="bg-black text-white">Staff</option>
          <option value="administrador" className="bg-black text-white">Administrador</option>
        </select>
      </div>

      <div className="md:col-span-2">
        <Button type="submit" className="bg-black text-white hover:bg-gray-800 w-full" disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar'}
        </Button>
      </div>
    </form>
  );
}