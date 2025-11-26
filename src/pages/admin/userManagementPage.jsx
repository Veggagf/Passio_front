import Navbar from "../../components/layout/navbar";
import Footer from "../../components/layout/footer";
import UserTable from '../../components/users/userTable';
import UserForm from '../../components/users/userFrom';
import { useEffect, useState } from "react";
import { getUsers } from '../../api/userService';

export default function UserManagementPage() {
  const [activeRole, setActiveRole] = useState("USUARIOS");
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    getUsers().then(setUsers).catch(err => console.error(err));
  }, []);

  const handleEdit = (row) => setEditing(row);
  const handleDelete = () => setEditing(null);

  const refresh = async () => {
    const u = await getUsers();
    setUsers(u);
  };

  return (
    <>
      <Navbar />
      <h2 className="text-7xl text-center text-white py-10 bg-black">
        Usuarios y organizadores
      </h2>

      <div className="flex min-h-screen bg-black">
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
        <main className="flex-grow px-10 py-10 flex items-start">
          <div className="bg-white rounded-2xl w-full mx-auto p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <UserTable users={users} onEdit={handleEdit} onRefresh={refresh} />
            </div>
            <div>
              <h3 className="text-2xl mb-4">{editing ? 'Editar usuario' : 'Crear usuario'}</h3>
              <UserForm initialUser={editing} onSaved={refresh} />
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}
