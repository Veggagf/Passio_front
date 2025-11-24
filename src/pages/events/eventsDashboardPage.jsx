import Navbar from "../../components/layout/navbar";
import Footer from "../../components/layout/footer";
import Table from "../../components/common/Table";
import EventInfoCard from "../../components/common/CardInfo";

export default function EventsDashboardPage() {
  // Ejemplo de columnas y datos
  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "E-Mail" },
  ];

  const data = [
    { id: "001", name: "Fer Vega", email: "fv@mail.com" },
    // Puedes agregar más usuarios aquí
  ];

  // Funciones de acciones
  const handleEdit = (row) => {
    alert(`Editar usuario: ${row.name}`);
  };

  const handleDelete = (row) => {
    alert(`Eliminar usuario: ${row.name}`);
  };

  return (
    <>
      <Navbar />

      {/* EVENT INFO */}
      <div className="bg-black w-full px-10 py-10">
        <div className="flex justify-end mb-4 gap-2">
          <button className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200">Editar</button>
          <button className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800">Eliminar</button>
        </div>

        <h1 className="text-7xl font-medium mb-3 text-white">Innovate Summit 2025</h1>
        <div className="text-2xl mb-10 text-gray-300 whitespace-pre-line">
          La Innovate Summit 2025 Reúne A Líderes, Emprendedores Y Visionarios Para 
          Explorar Las Tendencias Que Están Transformando El Mundo.
          Un Evento Diseñado Para Impulsar Ideas, Presentar Nuevas Tecnologías Y Conectar
          A Profesionales Que Buscan Inspirar El Futuro. Charlas Magistrales, Paneles Y
          Networking En Un Ambiente Moderno Y Dinámico.
        </div>

        {/* INFO BOXES usando EventInfoCard */}
        <div className="flex gap-6 mb-8">
          <EventInfoCard value="500" label="Capacidad" />
          <EventInfoCard value="15 de noviembre del 2025" label="Fecha" />
          <EventInfoCard value="Centro de conferencias" label="Ubicación" />
        </div>
      </div>

      {/* SIDEBAR + TABLE */}
      <div className="flex bg-black px-10 pb-20">
        {/* SIDEBAR */}
        <div className="min-w-[220px] bg-black py-10 px-6 border-r border-white/10">
          <nav className="flex flex-col gap-4">
            <a href="#" className="font-bold text-white hover:text-gray-300">ASISTENTES</a>
            <a href="#" className="text-white hover:text-gray-300">BOLETOS</a>
            <a href="#" className="text-white hover:text-gray-300">REGISTRO DE ACCESOS</a>
            <a href="#" className="text-white hover:text-gray-300">DASHBOARD</a>
          </nav>
        </div>

        {/* TABLE SECTION */}
        <div className="flex-grow py-10 px-8">
          <Table columns={columns} data={data} onEdit={handleEdit} onDelete={handleDelete} title="ASISTENTES" />
        </div>
      </div>

      <Footer />
    </>
  );
}