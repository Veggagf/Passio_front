import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/navbar";
import Footer from "../../components/layout/footer";
import Table from "../../components/common/Table";
import EventInfoCard from "../../components/common/CardInfo";
import { getEventById, deleteEvent } from "../../api/eventService";
import { getAccessLogsByEvent } from "../../api/ticketService";
import { useAuthStore } from "../../store/authStore";
import EventModal from "../../components/common/EventModal";

export default function EventsDashboardPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { role } = useAuthStore();
  const [activeSection, setActiveSection] = useState("asistentes");
  const [eventData, setEventData] = useState(null);
  const [accessLogs, setAccessLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (eventId) {
      fetchData();
    }
  }, [eventId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [event, logs] = await Promise.all([
        getEventById(eventId),
        getAccessLogsByEvent(eventId)
      ]);
      console.log("Event Data received:", event);
      setEventData(event);
      setAccessLogs(logs);
    } catch (err) {
      console.error("Error fetching event data:", err);
      setError("No se pudo cargar la información del evento.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async () => {
    if (!confirm("¿Estás seguro de que deseas eliminar este evento? Esta acción no se puede deshacer.")) {
      return;
    }

    try {
      await deleteEvent(eventId, role);
      alert("Evento eliminado exitosamente");
      navigate("/events");
    } catch (err) {
      console.error("Error deleting event:", err);
      alert("Error al eliminar el evento: " + (err.response?.data?.message || err.message));
    }
  };

  const handleEditEvent = () => {
    setIsModalOpen(true);
  };

  const handleEventSaved = () => {
    fetchData();
  };

  const asistentesColumns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Nombre" },
    { key: "email", label: "Email" },
  ];

  const boletosColumns = [
    { key: "id", label: "ID Boleto" },
    { key: "name", label: "Nombre" },
    { key: "price", label: "Precio" },
    { key: "quantity_available", label: "Disponibles" },
  ];

  const registrosColumns = [
    { key: "timestamp", label: "Hora" },
    { key: "userName", label: "Usuario" },
    { key: "action", label: "Acción" },
  ];

  const dashboardColumns = [
    { key: "id", label: "ID" },
    { key: "ticketCode", label: "Código Ticket" },
    { key: "validatedAt", label: "Hora Validación" },
  ];

  if (loading) return <div className="text-white text-center py-20">Cargando evento...</div>;
  if (error) return <div className="text-red-500 text-center py-20">{error}</div>;
  if (!eventData) return <div className="text-white text-center py-20">Evento no encontrado</div>;

  // Asistentes: Usuarios únicos que han accedido
  const uniqueAttendees = new Map();
  accessLogs.forEach(log => {
    if (log.sale?.buyer) {
      uniqueAttendees.set(log.sale.buyer.id, log.sale.buyer);
    }
  });
  const asistentesData = Array.from(uniqueAttendees.values()).map(user => ({
    id: user.id,
    name: user.name,
    email: user.email
  }));

  const boletosData = eventData.tickets || [];

  // Mapear logs para las tablas
  const registrosData = accessLogs.map(log => ({
    id: log.id,
    timestamp: new Date(log.scanned_at || log.createdAt).toLocaleString(),
    userName: log.sale?.buyer?.name || 'Desconocido',
    action: 'Entrada'
  }));

  const dashboardData = accessLogs.map(log => ({
    id: log.id,
    ticketCode: log.sale?.qr_code || 'N/A',
    validatedAt: new Date(log.scanned_at || log.createdAt).toLocaleString(),
  }));

  return (
    <>
      <Navbar />

      <div className="bg-black w-full px-10 py-10">
        <div className="flex justify-end mb-4 gap-2">
          <button
            onClick={handleEditEvent}
            className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200"
          >
            Editar Evento
          </button>
          <button
            onClick={handleDeleteEvent}
            className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
          >
            Eliminar Evento
          </button>
        </div>

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
              onClick={() => setActiveSection("asistentes")}
              className={`text-left ${activeSection === "asistentes"
                ? "font-bold text-white"
                : "text-white/70"
                } hover:text-white`}
            >
              ASISTENTES
            </button>

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
              onClick={() => setActiveSection("registros")}
              className={`text-left ${activeSection === "registros"
                ? "font-bold text-white"
                : "text-white/70"
                } hover:text-white`}
            >
              REGISTRO DE ACCESOS
            </button>

            <button
              onClick={() => setActiveSection("dashboard")}
              className={`text-left ${activeSection === "dashboard"
                ? "font-bold text-white"
                : "text-white/70"
                } hover:text-white`}
            >
              DASHBOARD
            </button>
          </nav>
        </div>

        <div className="flex-grow py-10 px-8">
          {activeSection === "asistentes" && (
            <Table
              columns={asistentesColumns}
              data={asistentesData}
              title="ASISTENTES"
            />
          )}

          {activeSection === "boletos" && (
            <Table
              columns={boletosColumns}
              data={boletosData}
              title="BOLETOS"
            />
          )}

          {activeSection === "registros" && (
            <Table
              columns={registrosColumns}
              data={registrosData}
              title="REGISTRO DE ACCESOS"
            />
          )}

          {activeSection === "dashboard" && (
            <>
              <h3 className="text-4xl mb-6 text-white font-semibold">
                DASHBOARD
              </h3>

              <div className="flex gap-6 mb-8">
                <EventInfoCard value={eventData.capacity} label="Capacidad Total" />
                <EventInfoCard value={boletosData.reduce((acc, t) => acc + (eventData.capacity / 3 - t.quantity_available), 0).toFixed(0) || "N/A"} label="Boletos Vendidos (Est.)" />
                <EventInfoCard value={boletosData.reduce((acc, t) => acc + t.quantity_available, 0)} label="Capacidad Restante" />
              </div>

              <Table
                className="text-black"
                columns={dashboardColumns}
                data={dashboardData}
                title="Accesos Validados"
              />
            </>
          )}
        </div>
      </div>

      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSaved={handleEventSaved}
        initialEvent={eventData}
      />

      <Footer />
    </>
  );
}
