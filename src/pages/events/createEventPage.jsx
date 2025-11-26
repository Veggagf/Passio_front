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
    const inputClasses = "w-full p-3 bg-black border border-white rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500";
  
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4">
      
      <div className="
        bg-black text-white rounded-xl shadow-2xl 
        w-full h-full max-w-7xl max-h-[95vh] 
        flex flex-col 
        overflow-hidden 
        relative
      ">

        <div className="flex justify-between items-center border-b border-gray-700 pb-3 p-6">
          <h2 className="text-3xl font-bold">Crea tu evento</h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-white text-4xl leading-none"
            type="button"
          >
            &times; 
          </button>
        </div>
        
        <div 
          className="relative w-full h-40 flex items-center justify-center overflow-hidden"
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
        
        <form onSubmit={handleSubmit} className="flex-grow p-6 overflow-y-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 h-full">
            
            <div className="space-y-6">
              <div>
                <label htmlFor="nombre" className="block text-gray-300 text-sm font-semibold mb-2">Nombre del Evento</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className={inputClasses}
                  required
                />
              </div>

              <div>
                <label htmlFor="fecha" className="block text-gray-300 text-sm font-semibold mb-2">Fecha</label>
                <input
                  type="date"
                  id="fecha"
                  name="fecha"
                  value={formData.fecha}
                  onChange={handleChange}
                  className={inputClasses}
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
                  className={inputClasses}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col space-y-6">
              <div>
                <label htmlFor="ubicacion" className="block text-gray-300 text-sm font-semibold mb-2">Ubicación</label>
                <input
                  type="text"
                  id="ubicacion"
                  name="ubicacion"
                  value={formData.ubicacion}
                  onChange={handleChange}
                  className={inputClasses}
                  required
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="descripcion" className="block text-gray-300 text-sm font-semibold mb-2">Descripción</label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  className={`${inputClasses} min-h-[100px]`}
                  required
                ></textarea>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex-grow">
                <label htmlFor="imagen" className="block text-gray-300 text-sm font-semibold mb-2">Imagen</label>
                <div 
                  className="bg-black rounded-lg p-8 w-full flex items-center justify-center cursor-pointer border-dashed border-2 border-white hover:border-gray-500 transition duration-150 h-[350px]"
                  onClick={() => document.getElementById('imagen-upload').click()}
                >
                  {formData.imagen ? (
                    <p className="text-sm text-gray-400 text-center">Archivo: **{formData.imagen.name}**</p>
                  ) : (
                    <span className="text-7xl text-gray-400 block">+</span>
                  )}
                  <input
                    type="file"
                    id="imagen-upload"
                    name="imagen"
                    onChange={handleChange}
                    className="hidden"
                    accept="image/*"
                  />
                </div>
              </div>

              <div className="pt-8 mt-auto">
                <button
                  type="submit"
                  className="w-full bg-black hover:bg-gray-900 text-white font-normal py-4 px-6 rounded-md focus:outline-none focus:shadow-outline border border-white transition duration-150 text-lg"
                >
                  Registrar Evento
                </button>
              </div>
            </div>
            
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateEventModal;