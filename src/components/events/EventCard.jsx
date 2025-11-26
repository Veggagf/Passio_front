import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export default function EventCard({ event }) {
  const navigate = useNavigate();
  const { role } = useAuthStore();

  const handleClick = () => {
    switch (role) {
      case 'administrador':
      case 'organizador':
        navigate(`/events/dashboard/${event.id}`);
        break;
      case 'staff':
        navigate(`/events/dashboard/staff/${event.id}`);
        break;
      case 'usuario':
        navigate(`/boletos/${event.id}`);
        break;
      default:
        navigate('/login');
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
