import { Link } from "react-router-dom";
import { routes } from "../../router/routes";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isLogged, setIsLogged] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");

    if (token) {
      setIsLogged(true);
      setRole(userRole);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLogged(false);
    setRole(null);
    window.location.reload();
  };

  return (
    <nav className="w-full bg-black text-white px-8 py-6 flex items-center justify-between border-b border-white/20">
      
      {/* ---- LOGO ---- */}
      <Link to={routes.home}>
        <h1 className="text-4xl font-metrophobic font-bold tracking-wide cursor-pointer">
          PASSIO
        </h1>
      </Link>

      {/* ---- CONTENEDOR DE LOS BOTONES (no cambiar diseño) ---- */}
      <div className="flex items-center gap-4 font-jetbrains text-lg">

        {/* ---- ADMIN MENU (SOLO TEXTO, SIN CAMBIAR ESTILOS) ---- */}
        {isLogged && role === "Admin" && (
          <>
            <Link
              to="/admin/eventos"
              className="hover:text-gray-300 transition"
            >
              Eventos
            </Link>

            <Link
              to="/admin/usuarios"
              className="hover:text-gray-300 transition"
            >
              Usuarios
            </Link>
          </>
        )}

        {/* ---- SI NO ESTÁ LOGEADO → Mostrar Login y Register EXACTOS como estaban ---- */}
        {!isLogged && (
          <>
            <Link
              to={routes.login}
              className="px-6 py-2 border border-white rounded-full hover:bg-white hover:text-black transition"
            >
              Login
            </Link>

            <Link
              to={routes.register}
              className="px-6 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition"
            >
              Register
            </Link>
          </>
        )}

        {/* ---- SI ESTÁ LOGEADO → Mostrar rol + cerrar sesión ---- */}
        {isLogged && (
          <>
            <span className="px-6 py-2 bg-white text-black rounded-full capitalize">
              {role}
            </span>

            <button
              onClick={handleLogout}
              className="px-6 py-2 border border-white rounded-full hover:bg-white hover:text-black transition"
            >
              Cerrar sesión
            </button>
          </>
        )}

      </div>
    </nav>
  );
}
