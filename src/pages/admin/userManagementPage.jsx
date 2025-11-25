import Navbar from "../../components/layout/navbar";
import Footer from "../../components/layout/footer";
import Table from "../../components/common/Table";
import { useState } from "react";

export default function UserManagementPage() {
  const [activeRole, setActiveRole] = useState("USUARIOS");

  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "E-Mail" },
  ];

  const data = [
    { id: "001", name: "Fer Vega", email: "Fv@Mail.Com" },
    // Puedes agregar más usuarios aquí
  ];

  const handleEdit = (row) => alert(`Editar usuario: ${row.name}`);
  const handleDelete = (row) => alert(`Eliminar usuario: ${row.name}`);

  return (
    <>
      <Navbar />
      {/* Título principal */}
      <h2 className="text-7xl text-center text-white py-10 bg-black">
        Usuarios y organizadores
      </h2>

      <div className="flex min-h-screen bg-black">
        {/* SIDEBAR IZQUIERDO */}
        <div className="min-w-[220px] bg-black py-10 px-7 flex flex-col">
          <h1 className="text-4xl font-bold cursor-pointer text-white mb-10">
            PASSIO
          </h1>
          <nav className="flex flex-col gap-4">
            <button
              className={`text-left ${
                activeRole === "ADMINISTRADORES"
                  ? "font-bold text-white"
                  : "text-white/70"
              } hover:text-white`}
              onClick={() => setActiveRole("ADMINISTRADORES")}
            >
              ADMINISTRADORES
            </button>
            <button
              className={`text-left ${
                activeRole === "ORGANIZADORES"
                  ? "font-bold text-white"
                  : "text-white/70"
              } hover:text-white`}
              onClick={() => setActiveRole("ORGANIZADORES")}
            >
              ORGANIZADORES
            </button>
            <button
              className={`text-left ${
                activeRole === "USUARIOS"
                  ? "font-bold text-white"
                  : "text-white/70"
              } hover:text-white`}
              onClick={() => setActiveRole("USUARIOS")}
            >
              USUARIOS
            </button>
            <button
              className={`text-left ${
                activeRole === "STAFF"
                  ? "font-bold text-white"
                  : "text-white/70"
              } hover:text-white`}
              onClick={() => setActiveRole("STAFF")}
            >
              STAFF
            </button>
          </nav>
        </div>

        {/* TABLA */}
        <main className="flex-grow px-10 py-10 flex items-start">
          <div className="bg-white rounded-2xl w-full mx-auto">
            <Table
              columns={columns}
              data={data}
              onEdit={handleEdit}
              onDelete={handleDelete}
              title={activeRole}
            />
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}
