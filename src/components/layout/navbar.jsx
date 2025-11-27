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
    window.location.href = '/login';
  };

  return (
    <nav className="w-full bg-black text-white px-8 py-6 flex items-center justify-between border-b border-white/20">

      <Link to={routes.home}>
        <h1 className="text-4xl font-metrophobic font-bold tracking-wide cursor-pointer">
          PASSIO
        </h1>
      </Link>
      <div className="flex items-center gap-4 font-jetbrains text-lg">
        {isLogged && role === ROLES.ADMINISTRADOR && (
          <>
            <Link
              to={routes.eventslistpage}
              className="hover:text-gray-300 transition"
            >
              Eventos
            </Link>

            <Link
              to={routes.usermanagementpage}
              className="hover:text-gray-300 transition"
            >
              Usuarios
            </Link>
          </>
        )}
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
