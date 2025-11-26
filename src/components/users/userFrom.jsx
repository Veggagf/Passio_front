import { useState, useEffect } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import { createUser, updateUser } from '../../api/userService';
import { useAuthStore } from '../../store/authStore';

export default function UserForm({ initialUser = null, onSaved }) {
  const [form, setForm] = useState({ name: '', email: '', username: '', role: 'usuario' });
  const { role: currentRole } = useAuthStore();

  useEffect(() => {
    if (initialUser) setForm(initialUser);
  }, [initialUser]);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (initialUser && initialUser.id) {
        await updateUser(initialUser.id, form, currentRole);
      } else {
        await createUser(form, currentRole);
      }
      if (onSaved) onSaved();
    } catch (err) {
      console.error(err);
      alert('Error guardando usuario');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input id="name" name="name" label="Nombre" value={form.name} onChange={handleChange} />
      <Input id="email" name="email" label="Correo" value={form.email} onChange={handleChange} />
      <Input id="username" name="username" label="Usuario" value={form.username} onChange={handleChange} />
      <div>
        <label className="mb-1 block text-sm text-gray-400">Rol</label>
        <select name="role" value={form.role} onChange={handleChange} className="bg-transparent border border-gray-600 rounded-md p-3 text-white w-full">
          <option value="usuario">Usuario</option>
          <option value="organizador">Organizador</option>
          <option value="staff">Staff</option>
          <option value="administrador">Administrador</option>
        </select>
      </div>

      <Button type="submit" className="bg-white text-black">Guardar</Button>
    </form>
  );
}
