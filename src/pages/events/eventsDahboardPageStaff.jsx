import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/layout/navbar";
import Footer from "../../components/layout/footer";
import Table from "../../components/common/Table";
import EventInfoCard from "../../components/common/CardInfo";
import { getEventById } from "../../api/eventService";

export default function EventsDashboardPageStaff() {
  const { eventId } = useParams();
  const [activeSection, setActiveSection] = useState("boletos");
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ticketCode, setTicketCode] = useState("");

  useEffect(() => {
    if (eventId) {
      fetchEventData();
    }
  }, [eventId]);

  const fetchEventData = async () => {
    try {
      setLoading(true);
      const data = await getEventById(eventId);
      console.log("Staff Dashboard - Event Data:", data);
      setEventData(data);
    } catch (err) {
      console.error("Error fetching event:", err);
      setError("No se pudo cargar la información del evento.");
    } finally {
      setLoading(false);
    }
  };

  const handleValidateTicket = () => {
    alert(`Validando boleto: ${ticketCode} (Funcionalidad pendiente de backend)`);
    setTicketCode("");
  };

  const registrosaccesosColumns = [
    { key: "id", label: "ID" },
    { key: "ticketId", label: "Ticket ID" },
    { key: "validatedAt", label: "Hora Validación" },
    { key: "status", label: "Estado" },
  ];

  if (loading) return <div className="text-white text-center py-20">Cargando evento...</div>;
  if (error) return <div className="text-red-500 text-center py-20">{error}</div>;
  if (!eventData) return <div className="text-white text-center py-20">Evento no encontrado</div>;

  const registrosaccesosData = eventData.validatedAccesses || [];

  return (
    <>
      <Navbar />

      <div className="bg-black w-full px-10 py-10">
        <h1 className="text-7xl mb-3 text-white">{eventData.name || eventData.title}</h1>
        <div className="text-2xl mb-10 text-gray-300 whitespace-pre-line">
          {eventData.description}
        </div>

        <div className="flex gap-6 mb-8">
          <EventInfoCard value={eventData.capacity} label="Capacidad" />
          <EventInfoCard value={new Date(eventData.date).toLocaleDateString()} label="Fecha" />
          <EventInfoCard value={eventData.location} label="Ubicación" />
        </div>
      </div>

      <div className="flex bg-black px-10 pb-20">
        <div className="min-w-[220px] bg-black py-10 px-6">
          <nav className="flex flex-col gap-4">
            <button
              onClick={() => setActiveSection("boletos")}
              className={`text-left ${activeSection === "boletos"
                ? "font-bold text-white"
                : "text-white/70"
                } hover:text-white`}
            >
              BOLETOS
            </button>
            <button
              onClick={() => setActiveSection("registrosaccesos")}
              className={`text-left ${activeSection === "registrosaccesos"
                ? "font-bold text-white"
                : "text-white/70"
                } hover:text-white`}
            >
              REGISTRO DE ACCESOS
            </button>
          </nav>
        </div>

        <div className="flex-grow py-10 px-8">
          {activeSection === "boletos" && (
            <>
              <div className="mb-8 bg-white rounded-xl p-8 mx-auto">
                <h2 className="text-4xl mb-4 text-black">CÓDIGO DEL BOLETO</h2>
                <input
                  type="text"
                  className="w-full p-3 mb-4 border border-gray-300 rounded-md"
                  placeholder="Ingresa el código del boleto"
                  value={ticketCode}
                  onChange={(e) => setTicketCode(e.target.value)}
                />
                <button
                  onClick={handleValidateTicket}
                  className="bg-white border px-5 py-3 rounded-lg text-sm hover:bg-gray-100"
                >
                  Registrar
                </button>
              </div>
            </>
          )}

          {activeSection === "registrosaccesos" && (
            <Table
              columns={registrosaccesosColumns}
              data={registrosaccesosData}
              title="REGISTRO DE ACCESOS"
            />
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
