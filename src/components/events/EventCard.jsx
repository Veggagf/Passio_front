import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { ROLES } from '../../utils/constants';
import { routes } from '../../router/routes';

export default function EventCard({ event }) {
  const navigate = useNavigate();
  const { role } = useAuthStore();
  console.log("EventCard received event:", event);


  const handleClick = () => {
    switch (role) {
      case ROLES.ADMINISTRADOR:
        navigate(routes.eventsdashboardpage.replace(':eventId', event.id));
        break;
      case ROLES.STAFF:
        navigate(routes.eventsdashboardpagestaff.replace(':eventId', event.id));
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

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://via.placeholder.com/400x300?text=No+Image";
    if (imagePath.startsWith('http') || imagePath.startsWith('data:')) {
      return imagePath;
    }
    return `http://localhost:3000/${imagePath.replace(/^\//, '')}`;
  };

  const imagePath = event.image || event.imageUrl || event.img || event.url;
  console.log("Event keys:", Object.keys(event));
  console.log("Selected image path:", imagePath);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition duration-300" onClick={handleClick}>
      <img src={getImageUrl(imagePath)} alt={event.title} className="w-full h-80 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{event.title}</h2>
        <span className="text-gray-500 mt-2 inline-block hover:text-gray-700">Ver detalles →</span>
      </div>
    </div>
  );
}
