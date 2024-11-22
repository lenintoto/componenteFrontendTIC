import React from 'react';

const ModalInfoUsuario = ({ isOpen, onClose, usuario }) => {
  if (!isOpen || !usuario) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Información del Usuario</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">×</button>
        </div>

        <div className="space-y-4">
          <div>
            <p className="font-semibold">Username:</p>
            <p className="text-gray-600">{usuario.username}</p>
          </div>
          <div>
            <p className="font-semibold">Nombre:</p>
            <p className="text-gray-600">{usuario.nombre}</p>
          </div>
          <div>
            <p className="font-semibold">Apellido:</p>
            <p className="text-gray-600">{usuario.apellido}</p>
          </div>
          <div>
            <p className="font-semibold">Teléfono:</p>
            <p className="text-gray-600">{usuario.telefono || 'No especificado'}</p>
          </div>
          <div>
            <p className="font-semibold">Email:</p>
            <p className="text-gray-600">{usuario.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalInfoUsuario; 