import Navbar from "../../components/layout/navbar";
import Footer from "../../components/layout/footer";

function EventsListPage() {
  return (
    <>
      <Navbar />
      <div className="relative w-full h-[600px] bg-black flex items-center justify-center">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-white text-7xl font-light drop-shadow-lg">
            Eventos disponibles
          </h1>
          <h3 className="text-white text-4xl font-light drop-shadow-lg mt-4">
            “Where every ticket becomes a story”
          </h3>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default EventsListPage;

