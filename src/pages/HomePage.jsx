import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";
import Fondoini from "../assets/imagenes/Fondoini.jpg";
import Card from "../components/common/Card.jsx";

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
      <Footer />
    </>
  );
}

export default HomePage;