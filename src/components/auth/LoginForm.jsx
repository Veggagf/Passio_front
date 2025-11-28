import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as apiLogin } from '../../api/authService';
import { useAuthStore } from '../../store/authStore';
import { ROLES } from '../../utils/constants';
import { routes } from '../../router/routes';
import Input from '../common/Input';
import Button from '../common/Button';
import Loading from '../common/Loading';

export default function LoginForm() {
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        identifier: formData.identifier,
        password: formData.password,
      };

      const result = await apiLogin(payload);
      const authData = result.data || result;
      login(authData);

      let userRole = authData.role || authData.user?.role;
      if (userRole) {
        userRole = String(userRole).toLowerCase().trim();
      }

      if ([ROLES.ADMINISTRADOR, ROLES.ORGANIZADOR, ROLES.STAFF].includes(userRole)) {
        navigate(routes.eventslistpage);
      } else {
        navigate(routes.eventslistpageuser);
      }
    } catch (err) {
      if (err.response) {
        alert(`Error: ${err.response.data.message || 'Credenciales incorrectas'}`);
      } else {
        alert('Error de conexión o error desconocido.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        id="identifier"
        name="identifier"
        label="Usuario o Email"
        value={formData.identifier}
        onChange={handleChange}
      />
      <Input
        id="password"
        name="password"
        label="Contraseña"
        type="password"
        value={formData.password}
        onChange={handleChange}
      />
      <div className="mt-6">
        {loading ? <Loading /> : <Button type="submit">Iniciar Sesión</Button>}
      </div>
    </form>
  );
}
