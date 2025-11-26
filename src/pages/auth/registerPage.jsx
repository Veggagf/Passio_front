import { Link } from "react-router-dom";
import { routes } from "../../router/routes";

import Navbar from "../../components/layout/navbar";
import Footer from "../../components/layout/footer";
import fondoregis from "../../assets/imagenes/fondoregis.jpg";

function RegisterPage() {
  return (
    <>
      <Navbar />

      <div className="relative w-full h-[500px] bg-cover bg-center" style={{ backgroundImage: `url(${fondoregis})` }}>
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-white text-6xl font-light drop-shadow-lg">
            Únete a Passio y da vida a experiencias memorables
          </h1>
        </div>
      </div>

      <div className="bg-black w-full py-20 text-white flex justify-center px-16">
        
        <div className="w-full max-w-3xl">
          <h2 className="text-4xl font-jetbrains font-semibold mb-10 tracking-wide">
            REGÍSTRATE
          </h2>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6 font-jetbrains text-base">
            {[
              "Nombre",
              "A. paterno",
              "A. materno",
              "Usuario",
              "Correo",
              "Contraseña",
              "Confirmar contraseña",
            ].map((label, index) => (
              <div key={index} className="flex flex-col">
                <label className="mb-1 tracking-wide">{label}</label>

                <input
                  type={label.includes("Contraseña") ? "password" : "text"}
                  className="w-full bg-black border border-gray-600 px-4 py-3 rounded-lg focus:outline-none focus:border-white text-base"/>
              </div>
            ))}

            <div className="md:col-span-2 flex flex-col gap-6 mt-6">
              <div className="flex gap-4">
                <button className="bg-white text-black px-6 py-2 text-base rounded-lg hover:bg-gray-200 font-jetbrains">
                  Register
                </button>

                <Link
                  to={routes.login}
                  className="border border-white px-6 py-2 text-base rounded-lg hover:bg-white hover:text-black font-jetbrains flex items-center justify-center">
                  Login
                </Link>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-800 w-full text-left">
                  <p className="text-gray-400 mb-3 text-base">
                      ¿Quieres registrarte como **Usuario**?
                  </p>
                  
                  <Link 
                      to={routes.registerUser} 
                      className="text-white text-lg font-semibold border-b border-white hover:border-gray-400 transition duration-300"
                  >
                      Soy Usuario
                  </Link>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="bg-black w-full py-10 px-15 text-white">
        <h2 className="text-6xl font-semibold">Testimonials</h2>
        <p className="text-gray-300 py-5 text-2xl mb-12">
          Here's what people are saying
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div className="bg-white text-black p-6 rounded-2xl shadow-lg">
            <p className="text-lg mb-4">
              “Passio hizo que la gestión de boletos fuera rapidísima. El control
              de accesos fue impecable y no tuvimos filas largas por primera vez.
              Totalmente recomendado.”
            </p>
            <h3 className="font-semibold">Usuario 1</h3>
            <span className="text-gray-500 text-sm">Evento 1</span>
          </div>

          <div className="bg-white text-black p-6 rounded-2xl shadow-lg">
            <p className="text-lg mb-4">
              “Comprar mis boletos fue súper fácil y la entrada al evento fue
              instantánea. Solo escaneé y entré. La experiencia completa se sintió
              muy moderna.”
            </p>
            <h3 className="font-semibold">Usuario 2</h3>
            <span className="text-gray-500 text-sm">Evento 2</span>
          </div>

          <div className="bg-white text-black p-6 rounded-2xl shadow-lg">
            <p className="text-lg mb-4">
              “Gracias a Passio aumentamos nuestras ventas anticipadas y tuvimos
              una visibilidad mucho más clara del aforo. Definitivamente elevó la
              calidad de nuestros eventos.”
            </p>
            <h3 className="font-semibold">Usuario 3</h3>
            <span className="text-gray-500 text-sm">Evento 3</span>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default RegisterPage;