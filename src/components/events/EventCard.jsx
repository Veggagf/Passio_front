import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { ROLES } from '../../utils/constants';
import { routes } from '../../router/routes';

export default function EventCard({ event }) {
  const navigate = useNavigate();
  const { role } = useAuthStore();

  const handleClick = () => {
    switch (role) {
      case ROLES.ADMINISTRADOR:
      case ROLES.STAFF:
        navigate(routes.eventsdashboardpage.replace(':eventId', event.id));
        break;
      case ROLES.ORGANIZADOR:
        navigate(routes.eventsdashboardpageorganizer);
        break;
      case ROLES.USUARIO:
        navigate(routes.boletos.replace(':eventId?', event.id));
        break;
      default:
        navigate(routes.login);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition duration-300" onClick={handleClick}>
      <img src={event.image} alt={event.title} className="w-full h-80 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{event.title}</h2>
        <span className="text-gray-500 mt-2 inline-block hover:text-gray-700">Ver detalles →</span>
      </div>
    </div>
  );
}
