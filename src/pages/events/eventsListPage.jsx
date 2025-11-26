import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../../components/layout/navbar";
import Footer from "../../components/layout/footer";
import CreateEventModal from "../../pages/events/createEventPage";
import Evento1 from "../../assets/Imagenes/eventos/even1.jpg";
import Evento2 from "../../assets/Imagenes/eventos/even2.jpg";
import Evento3 from "../../assets/Imagenes/eventos/even3.jpg";
import Evento4 from "../../assets/Imagenes/eventos/even4.jpg";
import Evento5 from "../../assets/Imagenes/eventos/even5.jpg";
import Evento6 from "../../assets/Imagenes/eventos/even6.jpg";
function EventCard({ image, title, onClick }) {
  return (
        <div
      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition duration-300"
      onClick={onClick}
    >
      <img
        src={image}
        alt={title}
        className="w-full h-80 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <span className="text-gray-500 mt-2 inline-block hover:text-gray-700">
          Ver detalles →
        </span>
      </div>
    </div>
  );
}

function EventsListPage() {
  const navigate = useNavigate();

  const [userRole] = useState('organizador');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const events = [
    { id: 1, image: Evento1, title: "Innovate Summit 2025", link: "#" },
    { id: 2, image: Evento2, title: "Night Lights Live", link: "#" },
    { id: 3, image: Evento3, title: "Future Creators Expo", link: "#" },
    { id: 4, image: Evento4, title: "Global Tech Forum", link: "#" },
    { id: 5, image: Evento5, title: "VibeWave Sessions", link: "#" },
    { id: 6, image: Evento6, title: "Sunset Garden Picnic Festival", link: "#" },
  ];

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCardClick = (eventId) => {
    switch (userRole) {
      case 'admin':
      case 'organizador':
        navigate(`/events/dashboard/${eventId}`);
        break;
      case 'staff':
        navigate(`/events/dashboard/staff/${eventId}`);
        break;
      case 'usuario':
        navigate(`/boletos/${eventId}`);
        break;
      default:
        alert("Debes iniciar sesión para ver los detalles del evento.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="relative w-full h-[600px] bg-black flex items-center justify-center">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-white text-7xl font-light drop-shadow-lg">
            Eventos disponibles
          </h1>
          <h3 className="text-white text-4xl font-light drop-shadow-lg mt-4">
            "Where every ticket becomes a story"
          </h3>

          <input
            type="text"
            placeholder="Busca eventos por nombre..."
            className="w-1/3 p-4 mt-40 bg-black border border-gray-700 text-white rounded-lg shadow-xl focus:outline-none focus:border-white focus:border-4 transition duration-300 placeholder-gray-500 text-xl"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

        </div>
      </div>

      <div className="bg-black py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">

          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              image={event.image}
              title={event.title}
              onClick={() => handleCardClick(event.id)}
            />
          ))}

          <div
            onClick={handleOpenModal}
            className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col items-center justify-center h-80 border-dashed border-2 border-gray-400 p-8 cursor-pointer hover:bg-gray-50 transition duration-150"
          >
            <span className="text-7xl text-gray-400 block">+</span>
            <p className="text-gray-600 mt-2">Agregar un nuevo evento</p>
          </div>

        </div>
      </div>

      <Footer />

      <CreateEventModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}

export default EventsListPage;