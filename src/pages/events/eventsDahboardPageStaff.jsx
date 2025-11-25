import { useState } from "react";
import Navbar from "../../components/layout/navbar";
import Footer from "../../components/layout/footer";
import Table from "../../components/common/Table";
import EventInfoCard from "../../components/common/CardInfo";

export default function EventsDashboardPageStaff() {
  // Estado para cambiar de sección
  const [activeSection, setActiveSection] = useState("boletos");

  const registrosaccesosColumns = [
    { key: "id", label: "ID" },
    { key: "evento", label: "Evento" },
    { key: "asistente", label: "Asistente" },
    { key: "codigo", label: "Código" },
    { key: "registrado", label: "Registrado" },
  ];

  const registrosaccesosData = [
    {
      id: "001",
      evento: "Innovate Summit 2025",
      asistente: "Fer Vega",
      codigo: "A-001",
      registrado: "Sí",
    },
    // Puedes agregar más registros aquí
  ];

  return (
    <>
      <Navbar />

      {/* EVENT INFO */}
      <div className="bg-black w-full px-10 py-10">
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
              onClick={() => setActiveSection("registrosaccesos")}
              className={`text-left ${
                activeSection === "registrosaccesos"
                  ? "font-bold text-white"
                  : "text-white/70"
              } hover:text-white`}
            >
              REGISTRO DE ACCESOS
            </button>
          </nav>
        </div>

        {/* TABLE / CONTENIDO */}
        <div className="flex-grow py-10 px-8">
          {activeSection === "boletos" && (
            <>
              <div className="mb-8 bg-white rounded-xl p-8 mx-auto">
                <h2 className="text-4xl mb-4 text-black">CÓDIGO DEL BOLETO</h2>
                <input
                  type="text"
                  className="w-full p-3 mb-4 border border-gray-300 rounded-md"
                  placeholder="Ingresa el código del boleto"
                />
                <button className="bg-white border px-5 py-3 rounded-lg text-sm hover:bg-gray-100">
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
