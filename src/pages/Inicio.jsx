import React from 'react';

const Inicio = () => {
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Bienvenidos a la Unidad de Bienes</h1>
      <p className="text-lg text-gray-700 mb-6 leading-relaxed">
        Bienvenido a <strong>Unidad de Bienes</strong>
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
        <div className="md:col-span-8">
          <div className="mb-6">
            <p>Aquí va información (mini tutorial de todo lo que tiene el sistema)</p>
          </div>
        </div>
        <div className="md:col-span-4 bg-gray-100 p-4 rounded-md shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Información Personal</h2>
          <div className="space-y-2">
            <p><strong>Username:</strong> [Username]</p>
            <p><strong>Nombre:</strong> [Nombre]</p>
            <p><strong>Apellido:</strong> [Apellido]</p>
            <p><strong>Extensión:</strong> [Extensión]</p>
            <p><strong>Email:</strong> [Email]</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Inicio;
