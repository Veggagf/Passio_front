import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from 'react-router-dom'; // NECESARIO para los enlaces de registro
import Navbar from "../../components/layout/navbar";
import Footer from "../../components/layout/footer";
import loginImage from "../../assets/Imagenes/login.jpg";


export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />

      <div className="flex flex-1 items-center justify-between px-28 py-12">

        <div className="w-1/2 max-w-xl">
          <h2 className="text-white text-4xl font-semibold mb-8">Inicia Sesión</h2> 

          <div className="mb-6">
            <label className="text-lg">Usuario</label>
            <input type="text" className="w-full border border-gray-600 bg-transparent p-3 mt-2 text-lg"/>
          </div>

          <div className="mb-6 relative">
            <label className="text-lg">Contraseña</label>
            <input 
              type={showPassword ? "text" : "password"} 
              className="w-full border border-gray-600 bg-transparent p-3 mt-2 pr-12 text-lg"
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)} 
              className="absolute right-3 bottom-4"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button className="bg-white text-black px-8 py-3 text-lg font-semibold transition-opacity duration-200 hover:opacity-70 rounded-xl">
            Login
          </button>
          
          <div className="mt-8 pt-4 border-t border-gray-800 w-full text-left">
            <p className="text-gray-400 mb-3">
              ¿No tienes cuenta? Regístrate:
            </p>

            <div className="flex space-x-6">
              <Link 
                to="/registerUser" 
                className="text-white text-lg font-semibold border-b border-white hover:border-gray-400 transition duration-300"
              >
                Soy Usuario
              </Link>
              
              <Link 
                to="/register" 
                className="text-white text-lg font-semibold border-b border-white hover:border-gray-400 transition duration-300"
              >
                Soy Organizador
              </Link>
            </div>
          </div>

        </div>

        <div className="w-1/2 flex justify-center items-center">
          <div className="relative w-[900px] h-[700px] max-w-full rounded-xl overflow-hidden">
            <img src={loginImage} alt="login visual" className="w-full h-full object-cover"/>
            <div className="absolute inset-0 bg-black/20" />
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}
