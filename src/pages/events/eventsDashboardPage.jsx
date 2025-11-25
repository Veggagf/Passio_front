import { useState } from "react";
import Navbar from "../../components/layout/navbar";
import Footer from "../../components/layout/footer";
import Table from "../../components/common/Table";
import EventInfoCard from "../../components/common/CardInfo";

export default function EventsDashboardPage() {
  //Estado para cambiar de sección
  const [activeSection, setActiveSection] = useState("asistentes");

  //Columnas y datos por sección
  const asistentesColumns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "E-Mail" },
  ];

  const asistentesData = [
    { id: "001", name: "Fer Vega", email: "fv@mail.com" },
  ];

  const boletosColumns = [
    { key: "ticket", label: "Ticket" },
    { key: "tipo", label: "Tipo" },
    { key: "precio", label: "Precio" },
  ];

  const boletosData = [{ ticket: "T-001", tipo: "General", precio: "$450" }];

  const registrosColumns = [
    { key: "hora", label: "Hora" },
    { key: "usuario", label: "Usuario" },
    { key: "accion", label: "Acción" },
  ];

  const registrosData = [
    { hora: "10:32 AM", usuario: "Fer Vega", accion: "Entrada" },
  ];

  const dashboardColumns = [
    { key: "id", label: "ID" },
    { key: "ticketid", label: "Ticked ID" },
    { key: "datatime", label: "Data Time" },
  ];

  const dashboardData = [
    { id: "001", ticketid: "T-001", datatime: "10:32 AM" },
  ];

  // Acciones
  const handleEdit = (row) => {
    alert(`Editar: ${JSON.stringify(row)}`);
  };

  const handleDelete = (row) => {
    alert(`Eliminar: ${JSON.stringify(row)}`);
  };

  return (
    <>
      <Navbar />

      {/* EVENT INFO */}
      <div className="bg-black w-full px-10 py-10">
        <div className="flex justify-end mb-4 gap-2">
          <button className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200">
            Editar
          </button>
          <button className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800">
            Eliminar
          </button>
        </div>

        <h1 className="text-7xl mb-3 text-white">Innovate Summit 2025</h1>
        <div className="text-2xl mb-10 text-gray-300 whitespace-pre-line">
          La Innovate Summit 2025 reúne a líderes, emprendedores y visionarios
          para explorar las tendencias que están transformando el mundo.
        </div>

        {/* INFO BOXES */}
        <div className="flex gap-6 mb-8">
          <EventInfoCard value="500" label="Capacidad" />
          <EventInfoCard value="15 de noviembre del 2025" label="Fecha" />
          <EventInfoCard value="Centro de conferencias" label="Ubicación" />
        </div>
      </div>

      {/* SIDEBAR + TABLE */}
      <div className="flex bg-black px-10 pb-20">
        {/* SIDEBAR */}
        <div className="min-w-[220px] bg-black py-10 px-6">
          <nav className="flex flex-col gap-4">
            <button
              onClick={() => setActiveSection("asistentes")}
              className={`text-left ${
                activeSection === "asistentes"
                  ? "font-bold text-white"
                  : "text-white/70"
              } hover:text-white`}
            >
              ASISTENTES
            </button>

            <button
              onClick={() => setActiveSection("boletos")}
              className={`text-left ${
                activeSection === "boletos"
                  ? "font-bold text-white"
                  : "text-white/70"
              } hover:text-white`}
            >
              BOLETOS
            </button>

            <button
              onClick={() => setActiveSection("registros")}
              className={`text-left ${
                activeSection === "registros"
                  ? "font-bold text-white"
                  : "text-white/70"
              } hover:text-white`}
            >
              REGISTRO DE ACCESOS
            </button>

            <button
              onClick={() => setActiveSection("dashboard")}
              className={`text-left ${
                activeSection === "dashboard"
                  ? "font-bold text-white"
                  : "text-white/70"
              } hover:text-white`}
            >
              DASHBOARD
            </button>
          </nav>
        </div>

        {/* TABLE / CONTENIDO */}
        <div className="flex-grow py-10 px-8">
          {activeSection === "asistentes" && (
            <Table
              columns={asistentesColumns}
              data={asistentesData}
              onEdit={handleEdit}
              onDelete={handleDelete}
              title="ASISTENTES"
            />
          )}

          {activeSection === "boletos" && (
            <Table
              columns={boletosColumns}
              data={boletosData}
              onEdit={handleEdit}
              onDelete={handleDelete}
              title="BOLETOS"
            />
          )}

          {activeSection === "registros" && (
            <Table
              columns={registrosColumns}
              data={registrosData}
              onEdit={handleEdit}
              onDelete={handleDelete}
              title="REGISTRO DE ACCESOS"
            />
          )}

          {activeSection === "dashboard" && (
            <>
              <h3 className="text-4xl mb-6 text-white font-semibold">
                DASHBOARD
              </h3>

              <div className="flex gap-6 mb-8">
                <EventInfoCard value="425" label="Capacidad" />
                <EventInfoCard value="425" label="Boletos Vendidos" />
                <EventInfoCard value="75" label="Capacidad Restante" />
              </div>

              <Table
                className="text-black"
                columns={dashboardColumns}
                data={dashboardData}
                onEdit={handleEdit}
                onDelete={handleDelete}
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
