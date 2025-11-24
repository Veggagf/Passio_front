import React, { useState } from 'react';
import headerImage from '../../assets/Imagenes/creationback.jpg';

function CreateEventModal({ isOpen, onClose }) {
  if (!isOpen) return null; 
  
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    fecha: '',
    ubicacion: '',
    capacidad: '',
    imagen: null,
  });
  
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del evento a crear:', formData);
    onClose(); 
    setFormData({ nombre: '', descripcion: '', fecha: '', ubicacion: '', capacidad: '', imagen: null });
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-black text-white rounded-b-lg p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b border-gray-700 pb-3 mb-6">
          <h2 className="text-2xl font-bold">Crea tu evento</h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-white text-3xl leading-none"
            type="button"
          >
            &times; 
          </button>
        </div>
        
        <div 
          className="relative w-full h-32 flex items-center justify-center mb-8 overflow-hidden -mx-8 -mt-8"
          style={{
            backgroundImage: `url(${headerImage})`, 
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black opacity-40"></div>
          
          <h2 className="relative text-3xl font-light text-center text-white z-10 p-4">
            "Da el primer paso: <br/> construye tu próximo evento."
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="nombre" className="block text-gray-300 text-sm font-semibold mb-2">Nombre del Evento</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="descripcion" className="block text-gray-300 text-sm font-semibold mb-2">Descripción</label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows="4"
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="fecha" className="block text-gray-300 text-sm font-semibold mb-2">Fecha</label>
            <input
              type="date"
              id="fecha"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="ubicacion" className="block text-gray-300 text-sm font-semibold mb-2">Ubicación</label>
            <input
              type="text"
              id="ubicacion"
              name="ubicacion"
              value={formData.ubicacion}
              onChange={handleChange}
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="capacidad" className="block text-gray-300 text-sm font-semibold mb-2">Capacidad</label>
            <input
              type="number"
              id="capacidad"
              name="capacidad"
              value={formData.capacidad}
              onChange={handleChange}
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="imagen" className="block text-gray-300 text-sm font-semibold mb-2">Imagen</label>
            <div 
              className="bg-gray-100 rounded-lg p-8 w-full max-w-[200px] h-[150px] flex items-center justify-center cursor-pointer border-dashed border-2 border-gray-400"
              onClick={() => document.getElementById('imagen-upload').click()}
            >
              <span className="text-7xl text-gray-400 block">+</span>
              <input
                type="file"
                id="imagen-upload"
                name="imagen"
                onChange={handleChange}
                className="hidden"
                accept="image/*"
              />
            </div>
            {formData.imagen && <p className="mt-2 text-sm text-gray-400">Archivo seleccionado: {formData.imagen.name}</p>}
          </div>
          <div className="pt-6">
            <button
              type="submit"
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-md focus:outline-none focus:shadow-outline"
            >
              Registrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateEventModal;