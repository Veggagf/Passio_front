import { Link } from "react-router-dom";
import { routes } from "../../router/routes";

export default function Navbar() {
  return (
    <nav className="w-full bg-black text-white px-8 py-6 flex items-center justify-between border-b border-white/20">
      <Link to={routes.home}>
        <h1 className="text-4xl font-metrophobic font-bold tracking-wide cursor-pointer">
          PASSIO
        </h1>
      </Link>

      <div className="flex items-center gap-4 font-jetbrains text-lg">
        <Link to={routes.login} className="px-6 py-2 border border-white rounded-full hover:bg-white hover:text-black transition">
          Login
        </Link>

        <Link to={routes.register} className="px-6 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition">
          Register
        </Link>
      </div>
    </nav>
  );
}