import { useState, useEffect } from 'react';
import Button from '../common/Button';
import { createUser, updateUser } from '../../api/userService';
import { useAuthStore } from '../../store/authStore';

export default function UserForm({ onSaved, initialUser = null }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'usuario',
    username: ''
  });
  const [loading, setLoading] = useState(false);
  const { role: currentRole } = useAuthStore();
  const isEditing = !!initialUser;

  useEffect(() => {
    if (initialUser) {
      setForm({
        name: initialUser.name || '',
        email: initialUser.email || '',
        password: '',
        role: initialUser.role || 'usuario',
        username: initialUser.username || ''
      });
    }
  }, [initialUser]);

  const inputClasses = "w-full p-3 bg-black text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";
  const labelClasses = "block text-sm font-medium text-gray-700";

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditing) {
        const dataToUpdate = {
          name: form.name,
          email: form.email,
          role: form.role,
          username: form.username
        };

        if (form.password && form.password.trim() !== '') {
          dataToUpdate.password = form.password;
        }

        await updateUser(initialUser.id, dataToUpdate, currentRole);
        alert('Usuario actualizado exitosamente');
      } else {
        await createUser(form, currentRole);
        alert('Usuario creado exitosamente');
      }

      onSaved && onSaved();

      if (!isEditing) {
        setForm({ name: '', email: '', password: '', role: 'usuario', username: '' });
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        `No se pudo ${isEditing ? 'actualizar' : 'crear'} el usuario`;

      alert(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

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

      <div>
        <label htmlFor="password" className={labelClasses}>
          Contraseña {isEditing && '(dejar en blanco para no cambiar)'}
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          className={inputClasses}
          required={!isEditing}
          placeholder={isEditing ? 'Nueva contraseña (opcional)' : 'Contraseña'}
        />
      </div>

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
          {loading ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Guardar')}
        </Button>
      </div>
    </form>
  );
}