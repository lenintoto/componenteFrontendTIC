import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ModalEditarUsuario = ({ isOpen, onClose, usuario, onUserUpdated }) => {
  const [formData, setFormData] = useState({
    username: '',
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (usuario) {
      setFormData({
        username: usuario.username,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        telefono: usuario.telefono,
        email: usuario.email,
      });
    }
  }, [usuario]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/administrador/actualizar-operario/${usuario._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      onUserUpdated();
      onClose();
    } catch (error) {
      setError(error.response?.data?.msg || 'Error al actualizar usuario');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Editar Usuario</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">×</button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Campos del formulario similar al ModalCrearUsuario */}
          <div className="mb-4">
              <label className="block text-gray-700">Username:</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Nombre:</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Apellido:</label>
              <input
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Teléfono:</label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
          
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Actualizar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalEditarUsuario; 