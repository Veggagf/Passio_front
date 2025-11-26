import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register as apiRegister } from '../../api/authService';
import Input from '../common/Input';
import Button from '../common/Button';
import Loading from '../common/Loading';

export default function RegisterForm({ registerAs = 'usuario' }) {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return alert('Las contraseñas no coinciden');
    }
    setLoading(true);
    try {
      await apiRegister({ ...formData, role: registerAs });
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert('Error en el registro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <Input id="name" name="name" label="Nombre" value={formData.name} onChange={handleChange} />
      <Input id="username" name="username" label="Usuario" value={formData.username} onChange={handleChange} />
      <Input id="email" name="email" label="Correo" value={formData.email} onChange={handleChange} />
      <Input id="password" name="password" label="Contraseña" type="password" value={formData.password} onChange={handleChange} />
      <Input id="confirmPassword" name="confirmPassword" label="Confirmar Contraseña" type="password" value={formData.confirmPassword} onChange={handleChange} />
      <div className="md:col-span-2 mt-2">
        {loading ? <Loading /> : <Button type="submit" className="bg-white text-black">Register</Button>}
      </div>
    </form>
  );
}
