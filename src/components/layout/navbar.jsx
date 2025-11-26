import { Link } from "react-router-dom";
import { routes } from "../../router/routes";
import { useEffect, useState } from "react";
import { useAuthStore } from '../../store/authStore';
import { ROLES } from '../../utils/constants';

export default function Navbar() {
  const { isAuthenticated, role, logout } = useAuthStore();
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    setIsLogged(isAuthenticated);
  }, [isAuthenticated]);

  const handleLogout = () => {
    logout();
    // Handle redirect to ensure the app state is reset
    window.location.href = '/login';
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
        {isLogged && (role === ROLES.ADMINISTRADOR || role === 'Admin') && (
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
