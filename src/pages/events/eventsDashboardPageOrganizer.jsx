import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/layout/navbar";
import Footer from "../../components/layout/footer";
import Table from "../../components/common/Table";
import EventInfoCard from "../../components/common/CardInfo";
import { getEventById } from "../../api/eventService";
import { getAccessLogsByEvent } from "../../api/ticketService";

export default function EventsDashboardPageOrganizer() {
  const { eventId } = useParams();
  const [activeSection, setActiveSection] = useState("asistentes");
  const [eventData, setEventData] = useState(null);
  const [accessLogs, setAccessLogs] = useState([]);
  const [loading, setLoading] = useState(true);

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
      setEventData(event);
      setAccessLogs(logs);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-white text-center py-20">Cargando...</div>;
  if (!eventData) return <div className="text-white text-center py-20">Evento no encontrado</div>;

  // Mapeo de datos
  // Asistentes: Usuarios únicos que han accedido (basado en accessLogs)
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

  // Datos para Registro de Accesos (Logs completos)
  const registrosColumns = [
    { key: "timestamp", label: "Hora" },
    { key: "userName", label: "Usuario" },
    { key: "action", label: "Acción" },
  ];

  const registrosData = accessLogs.map(log => ({
    id: log.id,
    timestamp: new Date(log.scanned_at || log.createdAt).toLocaleString(),
    userName: log.sale?.buyer?.name || 'Desconocido',
    action: 'Entrada'
  }));

  // Datos para Dashboard (Accesos Validados)
  const dashboardColumns = [
    { key: "id", label: "ID" },
    { key: "ticketCode", label: "Código Ticket" },
    { key: "validatedAt", label: "Hora Validación" },
  ];

  const dashboardData = accessLogs.map(log => ({
    id: log.id,
    ticketCode: log.sale?.qr_code || 'N/A',
    validatedAt: new Date(log.scanned_at || log.createdAt).toLocaleString(),
  }));

  const ticketsSold = boletosData.reduce((acc, ticket) => {
    // Calcular vendidos basándose en la capacidad inicial vs disponibles si es posible, 
    // o simplemente mostrar los disponibles. 
    // Como no tenemos el "total inicial" en el objeto ticket, usaremos la capacidad del evento - disponibles totales?
    // Por ahora mostraremos la suma de disponibles.
    return acc + (ticket.quantity_available || 0);
  }, 0);

  // Nota: Para "Boletos Vendidos" exactos necesitaríamos saber cuántos se han vendido en la tabla Sales.
  // O restar la capacidad total - stock actual.
  const totalCapacity = eventData.capacity;
  // Estimación de vendidos (Capacidad - Stock Total de todos los tickets)
  // Esto asume que el stock de los tickets suma la capacidad total.
  const currentStock = boletosData.reduce((acc, t) => acc + t.quantity_available, 0);
  const estimatedSold = totalCapacity - currentStock;


  return (
    <>
      <Navbar />

      <div className="bg-black w-full px-10 py-10">
        <div className="flex justify-end mb-4 gap-2">
          <button className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200">
            Editar
          </button>
          <button className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800">
            Eliminar
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
                <EventInfoCard value={totalCapacity} label="Capacidad Total" />
                <EventInfoCard value={estimatedSold > 0 ? estimatedSold : 0} label="Boletos Vendidos (Est.)" />
                <EventInfoCard value={currentStock} label="Capacidad Restante" />
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

      <Footer />
    </>
  );
}
