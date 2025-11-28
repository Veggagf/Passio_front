import React from 'react';
import EventForm from '../events/EventForm';

function EventModal({ isOpen, onClose, onSaved, initialEvent = null }) {
    if (!isOpen) return null;

    const handleSaveAndClose = () => {
        onSaved();
        onClose();
    };

    return (
        <div
            className="fixed inset-0 z-[9999] bg-black bg-opacity-75 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden relative"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-5 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {initialEvent ? 'Editar Evento' : 'Crear Nuevo Evento'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-700 text-3xl leading-none"
                        type="button"
                    >
                        &times;
                    </button>
                </div>

                <div className="p-6">
                    <EventForm
                        initialEvent={initialEvent}
                        onSaved={handleSaveAndClose}
                    />
                </div>
            </div>
        </div>
    );
}

export default EventModal;
