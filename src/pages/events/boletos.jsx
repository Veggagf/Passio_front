import React, { useState } from 'react';
import Navbar from "../../components/layout/navbar";
import Footer from "../../components/layout/footer";
import EventInfoCard from "../../components/common/CardInfo";

function Boletos() {
  const [selectedTicket, setSelectedTicket] = useState(null);

  const tickets = [
    { id: 1, name: "Normal", price: 500 },
    { id: 2, name: "Preferencial", price: 1000 },
    { id: 3, name: "VIP", price: 1500 },
  ];

  const handleBuy = () => {
    if (selectedTicket) {
      console.log(`Boleto: ${selectedTicket.name} por $${selectedTicket.price}`);
    } else {
      console.log("Debes seleccionar un boleto antes de comprar.");
    }
  };

  return (
    <div className="bg-black text-white flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-grow w-full px-10 py-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-6xl font-normal mb-3">Innovate Summit 2025</h2>

          <p className="text-lg text-gray-400 max-w-4xl mb-10">
            La Innovate Summit 2025 reúne a líderes, emprendedores y visionarios para
            explorar las tendencias que están transformando el mundo. Un evento diseñado
            para impulsar ideas, presentar nuevas tecnologías y conectar a profesionales del
            sector. Incluye: conferencias magistrales, paneles y networking en un ambiente
            moderno y dinámico.
          </p>

          <div className="flex gap-6 mb-16 flex-wrap">
            <div className="bg-white text-black p-8 rounded-xl shadow-lg w-full md:w-1/2 lg:w-1/3 flex flex-col justify-between">
              <span className="text-4xl font-normal mb-2">15 de noviembre del 2025</span>
              <span className="text-sm text-gray-500">Fecha</span>
            </div>
            <div className="bg-white text-black p-8 rounded-xl shadow-lg w-full md:w-1/2 lg:w-1/3 flex flex-col justify-between">
              <span className="text-4xl font-normal mb-2">Centro de conferencias</span>
              <span className="text-sm text-gray-500">Ubicación</span>
            </div>
          </div>

          <h3 className="text-4xl font-normal mb-8">Boletos</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-white text-black p-8 rounded-xl shadow-lg flex flex-col items-center justify-center cursor-pointer hover:shadow-xl transition duration-300 min-h-[180px]"
              >
                <span className="text-2xl font-normal mb-2">{ticket.name}</span>
                <p className="text-5xl font-normal">${ticket.price}</p>
              </div>
            ))}
          </div>

          <div className="bg-transparent p-0 rounded-2xl">
            <h4 className="text-4xl font-normal mb-6 text-white">ELIGE TU BOLETO</h4>

            <div className="grid grid-cols-1 gap-6">
              {tickets.map((ticket) => (
                <label
                  key={ticket.id}
                  className={`flex items-center justify-between p-6 rounded-xl cursor-pointer transition duration-150 border border-2
                    ${
                      selectedTicket?.id === ticket.id
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-black border-black hover:bg-gray-100'
                    }`}
                >
                  <div className="flex flex-col">
                    <span className={`text-2xl font-normal ${selectedTicket?.id === ticket.id ? 'text-white' : 'text-black'}`}>{ticket.name}</span>
                    <span className={`text-4xl font-normal ${selectedTicket?.id === ticket.id ? 'text-white' : 'text-black'}`}>
                      ${ticket.price}
                    </span>
                  </div>

                  <input
                    type="radio"
                    name="ticket"
                    value={ticket.id}
                    checked={selectedTicket?.id === ticket.id}
                    onChange={() => setSelectedTicket(ticket)}
                    className={`form-radio h-6 w-6 text-black border-black focus:ring-black ${selectedTicket?.id === ticket.id ? 'bg-white' : 'bg-transparent'}`}
                  />
                </label>
              ))}
            </div>

            <button
              onClick={handleBuy}
              disabled={!selectedTicket}
              className={`mt-8 w-full py-4 rounded-xl text-lg font-normal transition duration-300 ease-in-out
                ${
                  selectedTicket
                    ? 'bg-black text-white border border-white hover:bg-white hover:text-black shadow-lg'
                    : 'bg-gray-200 text-gray-500 border border-gray-400 cursor-not-allowed'
                }`}
            >
              {selectedTicket ? `COMPRAR BOLETO (${selectedTicket.name} - $${selectedTicket.price})` : 'SELECCIONA UN BOLETO'}
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Boletos;