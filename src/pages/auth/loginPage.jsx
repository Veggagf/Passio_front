import LoginForm from '../../components/auth/LoginForm';
import { Link } from 'react-router-dom';
import Navbar from "../../components/layout/navbar";
import Footer from "../../components/layout/footer";
import loginImage from "../../assets/Imagenes/login.jpg";


export default function LoginPage() {

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />

      <div className="flex flex-1 items-center justify-between px-28 py-12">

        <div className="w-1/2 max-w-xl">
          <h2 className="text-white text-4xl font-semibold mb-8">Inicia Sesión</h2> 

          <LoginForm />
          
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
