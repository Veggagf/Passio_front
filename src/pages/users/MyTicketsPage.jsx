import React, { useState, useEffect } from 'react';
import Navbar from "../../components/layout/navbar";
import Footer from "../../components/layout/footer";
import { getUserTickets } from '../../api/ticketService';
import { useAuthStore } from '../../store/authStore';
import { Link } from 'react-router-dom';

function MyTicketsPage() {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const { isAuthenticated } = useAuthStore();

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const data = await getUserTickets();
                setTickets(data);
            } catch (error) {
                console.error("Error fetching user tickets:", error);
            } finally {
                setLoading(false);
            }
        };

        if (isAuthenticated) {
            fetchTickets();
        } else {
            setLoading(false);
        }
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return (
            <div className="bg-black text-white flex flex-col min-h-screen">
                <Navbar />
                <div className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-3xl mb-4">Debes iniciar sesión</h2>
                        <Link to="/login" className="text-blue-500 hover:underline">Ir al login</Link>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

    return (
        <div className="bg-black text-white flex flex-col min-h-screen">
            <Navbar />

            <div className="flex-grow w-full px-10 py-10">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-6xl font-normal mb-10">Mis Boletos</h2>

                    {loading ? (
                        <p>Cargando boletos...</p>
                    ) : tickets.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-2xl text-gray-400 mb-6">No tienes boletos comprados aún.</p>
                            <Link to="/events" className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition">
                                Explorar Eventos
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {tickets.map((sale) => (
                                <div key={sale.id} className="bg-white text-black rounded-xl overflow-hidden shadow-lg flex flex-col">
                                    <div className="p-6 flex-grow">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-2xl font-bold mb-1">{sale.ticket?.event?.name || sale.ticket?.event?.title || 'Evento Desconocido'}</h3>
                                                <p className="text-sm text-gray-500">{sale.ticket?.name}</p>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${sale.status === 'pagado' ? 'bg-green-100 text-green-800' :
                                                sale.status === 'usado' ? 'bg-gray-100 text-gray-800' :
                                                    'bg-red-100 text-red-800'
                                                }`}>
                                                {sale.status === 'pagado' ? 'NO USADO' : sale.status.toUpperCase()}
                                            </span>
                                        </div>

                                        <div className="space-y-2 mb-6">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Fecha:</span>
                                                <span className="font-medium">
                                                    {sale.ticket?.event?.date ? new Date(sale.ticket.event.date).toLocaleDateString() : 'N/A'}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Lugar:</span>
                                                <span className="font-medium">{sale.ticket?.event?.location || 'N/A'}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Precio:</span>
                                                <span className="font-medium">${sale.ticket?.price}</span>
                                            </div>
                                            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                                                <span className="text-gray-500 text-sm">Código de acceso:</span>
                                                <span className="font-mono text-lg font-bold tracking-wider bg-gray-100 px-3 py-1 rounded">
                                                    {sale.qr_code}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default MyTicketsPage;
