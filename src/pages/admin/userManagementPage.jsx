import Navbar from "../../components/layout/navbar";
import Footer from "../../components/layout/footer";
import UserTable from '../../components/users/userTable';
import UserForm from '../../components/users/UserForm';
import UserModal from '../../components/common/UserModal';
import { useEffect, useState } from "react";
import { getUsers } from '../../api/userService';

export default function UserManagementPage() {
  const [activeRole, setActiveRole] = useState("USUARIOS");
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      console.log('Usuarios cargados:', data);
      setUsers(data);
    } catch (err) {
      console.error('Error al cargar usuarios:', err);
      alert('Error al cargar los usuarios');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (row) => setEditing(row);

  const refresh = async () => {
    await loadUsers();
    setEditing(null);
  };

  // Filtrar usuarios por rol activo
  const filteredUsers = users.filter(user => {
    const userRole = user.role?.toLowerCase();
    switch (activeRole) {
      case 'ADMINISTRADORES':
        return userRole === 'administrador';
      case 'ORGANIZADORES':
        return userRole === 'organizador';
      case 'STAFF':
        return userRole === 'staff';
      case 'USUARIOS':
        return userRole === 'usuario';
      default:
        return true;
    }
  });

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
              className={`text-left ${activeRole === "ADMINISTRADORES"
                ? "font-bold text-white"
                : "text-white/70"
                } hover:text-white`}
              onClick={() => setActiveRole("ADMINISTRADORES")}
            >
              ADMINISTRADORES
            </button>
            <button
              className={`text-left ${activeRole === "ORGANIZADORES"
                ? "font-bold text-white"
                : "text-white/70"
                } hover:text-white`}
              onClick={() => setActiveRole("ORGANIZADORES")}
            >
              ORGANIZADORES
            </button>
            <button
              className={`text-left ${activeRole === "USUARIOS"
                ? "font-bold text-white"
                : "text-white/70"
                } hover:text-white`}
              onClick={() => setActiveRole("USUARIOS")}
            >
              USUARIOS
            </button>
            <button
              className={`text-left ${activeRole === "STAFF"
                ? "font-bold text-white"
                : "text-white/70"
                } hover:text-white`}
              onClick={() => setActiveRole("STAFF")}
            >
              STAFF
            </button>
          </nav>
        </div>

        <main className="flex-grow px-10 py-10 flex flex-col">

          <div className="w-full max-w-7xl mx-auto mb-6 flex justify-end">
            <button
              onClick={() => {
                setEditing(null);
                setIsModalOpen(true);
              }}
              className="bg-white hover:bg-gray-200 text-black border border-black font-bold py-2 px-4 rounded transition duration-150 shadow-lg"
            >
              + Agregar Nuevo Usuario
            </button>
          </div>

          <div className="bg-white rounded-2xl w-full max-w-7xl mx-auto p-8 flex flex-col gap-6 flex-grow">

            {loading ? (
              <div className="text-center py-10">
                <p className="text-gray-600">Cargando usuarios...</p>
              </div>
            ) : (
              <UserTable users={filteredUsers} onEdit={handleEdit} onRefresh={refresh} />
            )}

            {editing && (
              <div className="mt-8 p-6 border rounded-lg shadow-md">
                <h3 className="text-xl mb-4 text-black">Editar Usuario</h3>
                <UserForm initialUser={editing} onSaved={refresh} />
                <button
                  onClick={() => setEditing(null)}
                  className="mt-4 text-sm text-gray-500 hover:text-red-600"
                >
                  Cancelar Edición
                </button>
              </div>
            )}

          </div>
        </main>
      </div>

      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSaved={refresh}
      />

      <Footer />
    </>
  );
}