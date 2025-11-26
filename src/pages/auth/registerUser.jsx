import { Link } from "react-router-dom";
import { routes } from "../../router/routes";

import Navbar from "../../components/layout/navbar";
import Footer from "../../components/layout/footer";
import RegisterForm from '../../components/auth/RegisterForm';
import fondoregis from "../../assets/imagenes/registeruimg.jpg";

function RegisterUser() {
  return (
    <>
      <Navbar />

      <div className="relative w-full h-[500px] bg-cover bg-center" style={{ backgroundImage: `url(${fondoregis})` }}>
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-white text-6xl font-light drop-shadow-lg">
            Únete a Passio y consigue las mejores experiencias
          </h1>
        </div>
      </div>

      <div className="bg-black w-full py-20 text-white flex justify-center px-16">
        
        <div className="w-full max-w-3xl"> 
          <h2 className="text-4xl font-jetbrains font-semibold mb-10 tracking-wide">
            REGÍSTRATE
          </h2>

          <RegisterForm registerAs={'usuario'} />
        </div>
      </div>

      <Footer />
    </>
  );
}

export default RegisterUser;