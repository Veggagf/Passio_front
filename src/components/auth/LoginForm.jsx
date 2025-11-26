import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as apiLogin } from '../../api/authService';
import { useAuthStore } from '../../store/authStore';
import Input from '../common/Input';
import Button from '../common/Button';
import Loading from '../common/Loading';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await apiLogin({ username, password });
      // result is expected to contain { user, role, token }
      login(result);
      // Persist token and role for axios and legacy components
      if (result.token) localStorage.setItem('token', result.token);
      if (result.role) localStorage.setItem('role', result.role);
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Error de login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input id="user" label="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
      <Input id="pass" type="password" label="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
      {loading ? <Loading /> : <Button type="submit" className="bg-white text-black">Login</Button>}
    </form>
  );
}
