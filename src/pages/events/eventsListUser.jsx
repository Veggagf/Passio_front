import React, { useState, useEffect } from 'react';
import Navbar from "../../components/layout/navbar";
import Footer from "../../components/layout/footer";
import EventCard from '../../components/events/EventCard';
import Evento1 from "../../assets/Imagenes/eventos/even1.jpg";
import Evento2 from "../../assets/Imagenes/eventos/even2.jpg";
import Evento3 from "../../assets/Imagenes/eventos/even3.jpg";
import Evento4 from "../../assets/Imagenes/eventos/even4.jpg";
import Evento5 from "../../assets/Imagenes/eventos/even5.jpg";
import Evento6 from "../../assets/Imagenes/eventos/even6.jpg";
import { getEvents } from '../../api/eventService';

function EventsListPageuser() {

  const [searchTerm, setSearchTerm] = useState('');
  const [events, setEvents] = useState([]);
  useEffect(() => {
    getEvents().then((res) => setEvents(res)).catch(() => {
      setEvents([
        { id: 1, image: Evento1, title: "Innovate Summit 2025", link: "#" },
        { id: 2, image: Evento2, title: "Night Lights Live", link: "#" },
        { id: 3, image: Evento3, title: "Future Creators Expo", link: "#" },
        { id: 4, image: Evento4, title: "Global Tech Forum", link: "#" },
        { id: 5, image: Evento5, title: "VibeWave Sessions", link: "#" },
        { id: 6, image: Evento6, title: "Sunset Garden Picnic Festival", link: "#" },
      ]);
    });
  }, []);

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <>
      <Navbar />

      <div
        className="relative w-full h-[600px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${Evento1})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
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
              event={event}
            />
          ))}

        </div>
      </div>

      <Footer />
    </>
  );
}

export default EventsListPageuser;