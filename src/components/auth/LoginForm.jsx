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

      console.log('Enviando Payload de Login:', payload);
      const result = await apiLogin(payload);

      // Extraer los datos reales de autenticación
      // El backend devuelve { success: true, data: { user, role, token } }
      const authData = result.data || result;

      // Guardar sesión en el store
      login(authData);

      // Obtener el rol y normalizarlo (minúsculas y sin espacios)
      let userRole = authData.role || authData.user?.role;
      if (userRole) {
        userRole = String(userRole).toLowerCase().trim();
      }

      console.log('Login Result (Full):', result);
      console.log('Auth Data (Extracted):', authData);
      console.log('Normalized Role:', userRole);

      // Redirección basada en roles
      if ([ROLES.ADMINISTRADOR, ROLES.ORGANIZADOR, ROLES.STAFF].includes(userRole)) {
        console.log('Redirecting to EVENTS list');
        navigate(routes.eventslistpage);
      } else {
        console.log('Redirecting to USER list');
        navigate(routes.eventslistpageuser);
      }
    } catch (err) {
      console.error('Login Error:', err);
      if (err.response) {
        console.error('Error Response Data:', err.response.data);
        console.error('Error Status:', err.response.status);
        console.error('Error Headers:', err.response.headers);
        alert(`Error: ${err.response.data.message || 'Credenciales incorrectas o error en el servidor'}`);
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
