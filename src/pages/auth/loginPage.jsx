import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
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
          <div className="mb-6">
            <label className="text-lg">Usuario</label>
            <input type="text" className="w-full border border-gray-600 bg-transparent p-3 mt-2 text-lg"/>
          </div>

          <div className="mb-6 relative">
            <label className="text-lg">Contraseña</label>
            <input type={showPassword ? "text" : "password"} className="w-full border border-gray-600 bg-transparent p-3 mt-2 pr-12 text-lg"/>
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 bottom-4">
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button className="bg-white text-black px-8 py-3 text-lg font-semibold transition-opacity duration-200 hover:opacity-70 rounded-xl">
            Login
          </button>
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

