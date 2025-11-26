import { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import { createUser } from '../../api/userService';
import { useAuthStore } from '../../store/authStore';

export default function UserForm({ onSuccess }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'usuario' });
  const [loading, setLoading] = useState(false);
  const { role: currentRole } = useAuthStore();

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createUser(form, currentRole);
      onSuccess && onSuccess();
    } catch (err) {
      console.error(err);
      alert('Could not create user');
    } finally { setLoading(false); }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Input id="name" name="name" label="Nombre" value={form.name} onChange={handleChange} />
      <Input id="email" name="email" label="Correo" value={form.email} onChange={handleChange} type="email" />
      <Input id="password" name="password" label="Contraseña" value={form.password} onChange={handleChange} type="password" />
      <select name="role" value={form.role} onChange={handleChange} className="bg-transparent border border-gray-600 rounded-md p-3 text-white">
        <option value="usuario">Usuario</option>
        <option value="organizador">Organizador</option>
        <option value="staff">Staff</option>
        <option value="administrador">Administrador</option>
      </select>
      <div className="md:col-span-2">
        <Button className="bg-white text-black">Crear Usuario</Button>
      </div>
    </form>
  );
}
