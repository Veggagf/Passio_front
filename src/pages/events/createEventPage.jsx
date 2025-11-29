import React, { useState } from 'react';
import headerImage from '../../assets/Imagenes/creationback.jpg';
import axios from '../../api/axios';

function CreateEventModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    capacity: '',
    ticketPrice1: '',
    ticketPrice2: '',
    ticketPrice3: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = new FormData();

    Object.keys(formData).forEach(key => {
      dataToSend.append(key, formData[key]);
    });

    try {
      const response = await axios.post('/events', dataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Evento registrado con éxito:', response.data);
      alert('¡Evento registrado con éxito!');

      setFormData({
        title: '',
        description: '',
        date: '',
        location: '',
        capacity: '',
        ticketPrice1: '',
        ticketPrice2: '',
        ticketPrice3: '',
        image: null
      });
      onClose();

    } catch (error) {
      console.error('Error al registrar el evento:', error);
      const errorMessage = error.response?.data?.message || 'Error al conectar con el servidor';
      alert('Error al crear el evento: ' + errorMessage);
    }
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
            "Da el primer paso: <br /> construye tu próximo evento."
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="flex-grow p-6 overflow-y-auto">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 h-full">

            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-gray-300 text-sm font-semibold mb-2">Nombre del Evento</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={inputClasses}
                  required
                />
              </div>

              <div>
                <label htmlFor="date" className="block text-gray-300 text-sm font-semibold mb-2">Fecha</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className={inputClasses}
                  required
                />
              </div>

              <div>
                <label htmlFor="capacity" className="block text-gray-300 text-sm font-semibold mb-2">Capacidad</label>
                <input
                  type="number"
                  id="capacity"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  className={inputClasses}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col space-y-6">
              <div>
                <label htmlFor="location" className="block text-gray-300 text-sm font-semibold mb-2">Ubicación</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className={inputClasses}
                  required
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="description" className="block text-gray-300 text-sm font-semibold mb-2">Descripción</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className={`${inputClasses} min-h-[100px]`}
                  required
                ></textarea>
              </div>

              <div className="space-y-4">
                <label className="block text-gray-300 text-sm font-semibold">Precios de Boletos</label>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="ticketPrice1" className="block text-gray-400 text-xs mb-1">Precio 1</label>
                    <input
                      type="number"
                      id="ticketPrice1"
                      name="ticketPrice1"
                      value={formData.ticketPrice1}
                      onChange={handleChange}
                      className={inputClasses}
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label htmlFor="ticketPrice2" className="block text-gray-400 text-xs mb-1">Precio 2</label>
                    <input
                      type="number"
                      id="ticketPrice2"
                      name="ticketPrice2"
                      value={formData.ticketPrice2}
                      onChange={handleChange}
                      className={inputClasses}
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label htmlFor="ticketPrice3" className="block text-gray-400 text-xs mb-1">Precio 3</label>
                    <input
                      type="number"
                      id="ticketPrice3"
                      name="ticketPrice3"
                      value={formData.ticketPrice3}
                      onChange={handleChange}
                      className={inputClasses}
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex-grow">
                <label htmlFor="image" className="block text-gray-300 text-sm font-semibold mb-2">Imagen</label>
                <div
                  className="bg-black rounded-lg p-8 w-full flex items-center justify-center cursor-pointer border-dashed border-2 border-white hover:border-gray-500 transition duration-150 h-[350px]"
                  onClick={() => document.getElementById('image-upload').click()}
                >
                  {formData.image ? (
                    <p className="text-sm text-gray-400 text-center">Archivo: **{formData.image.name}**</p>
                  ) : (
                    <span className="text-7xl text-gray-400 block">+</span>
                  )}
                  <input
                    type="file"
                    id="image-upload"
                    name="image"
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