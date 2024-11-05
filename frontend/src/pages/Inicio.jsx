import React from 'react';

const Inicio = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Bienvenidos a RentCar</h1>
      <p className="text-lg text-gray-700 mb-6 leading-relaxed">
        Bienvenido a <strong>RentCar</strong>, tu herramienta confiable para la gestión de reservas de vehiculos. Diseñado para facilitar la organización de reservas, RentCar te ayuda a coordinar cada detalle de manera eficiente y sencilla.
      </p>
      <div className="mb-6">
        <img 
          src="../public/renta.png" 
          alt="RentCar" 
          className="w-auto h-auto object-cover mx-auto"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
      </div>
    </div>
  );
};

export default Inicio;
