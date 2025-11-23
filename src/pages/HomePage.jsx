import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";
import Fondoini from "../assets/imagenes/Fondoini.jpg";
import Card from "../components/common/Card.jsx";
import ini1 from "../assets/imagenes/ini1.jpg";
import ini2 from "../assets/imagenes/ini2.jpg";
import ini3 from "../assets/imagenes/ini3.jpg";
import ini4 from "../assets/imagenes/ini4.jpg";
import ini5 from "../assets/imagenes/ini5.jpg";
import ini6 from "../assets/imagenes/ini6.jpg";
import ini7 from "../assets/imagenes/ini7.jpg";

function HomePage() {
  return (
    <>
      <Navbar />
      <div className="relative w-full h-[600px] bg-cover bg-center" style={{ backgroundImage: `url(${Fondoini})` }}>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-7xl font-light drop-shadow-lg">
            Access Without Limits
          </h1>
        </div>
      </div>

      <div className="bg-black w-full py-20 px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <Card
            number="+120,00"
            title="Tickets gestionados"
            description="en el último año."
          />

          <Card
            number="98%"
            title="De satisfacción"
            description="de los usuarios."
          />

          <Card
            number="+800"
            title="Eventos organizados"
            description="con Passio."
          />
        </div>
      </div>
      <div className="bg-black w-full py-20 px-15 text-white">
        <h2 className="text-5xl font-semibold mb-4">Highlights from Our Events</h2>
        <p className="text-gray-300 text-2xl mb-10">See what makes every event unforgettable.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        <div className="flex flex-col gap-6">
          <img src={ini1} className="w-full h-[520px] object-cover rounded-2xl"/>
          <img src={ini4} className="w-full h-[250px] object-cover rounded-2xl"/>
        </div>

        <div className="flex flex-col gap-6">
          <img src={ini2} className="w-full h-[250px] object-cover rounded-2xl"/>
          <img src={ini5} className="w-full h-[250px] object-cover rounded-2xl"/>
          <img src={ini6} className="w-full h-[250px] object-cover rounded-2xl"/>
        </div>

        <div className="flex flex-col gap-6">
          <img src={ini3} className="w-full h-[250px] object-cover rounded-2xl"/>
          <img src={ini7} className="w-full h-[520px] object-cover rounded-2xl"/>
        </div>
        </div>
      </div> 

      <div className="bg-black w-full py-20 px-15 text-white">
        <h2 className="text-6xl font-semibold">Testimonials</h2>
        <p className="text-gray-300 text-2xl mb-12">Here's what people are saying</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">

          <div className="bg-white text-black p-6 rounded-2xl shadow-lg">
            <p className="text-lg mb-4">
              “Passio hizo que la gestión de boletos fuera rapidísima. El control de accesos fue impecable y no tuvimos filas largas por primera vez. Totalmente recomendado.”
            </p>
            <h3 className="font-semibold">Usuario 1</h3>
            <span className="text-gray-500 text-sm">Evento 1</span>
          </div>

          <div className="bg-white text-black p-6 rounded-2xl shadow-lg">
            <p className="text-lg mb-4">
              “Comprar mis boletos fue súper fácil y la entrada al evento fue instantánea. Solo escaneé y entré. La experiencia completa se sintió muy moderna.”
            </p>
            <h3 className="font-semibold">Usuario 2</h3>
            <span className="text-gray-500 text-sm">Evento 2</span>
          </div>

          <div className="bg-white text-black p-6 rounded-2xl shadow-lg">
            <p className="text-lg mb-4">
              “Gracias a Passio aumentamos nuestras ventas anticipadas y tuvimos una visibilidad mucho más clara del aforo. Definitivamente elevó la calidad de nuestros eventos.”
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

export default HomePage;