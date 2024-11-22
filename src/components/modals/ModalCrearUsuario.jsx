import React, { useState } from 'react';
import axios from 'axios';

const ModalCrearUsuario = ({ isOpen, onClose, onUserCreated }) => {
  const [formData, setFormData] = useState({
    username: '',
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No hay token de autenticación');
        return;
      }

      console.log('Enviando datos:', formData);

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/administrador/registrar-operario`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log('Respuesta:', response.data);
      
      if (response.data) {
        onUserCreated();
        onClose();
        setFormData({
          username: '',
          nombre: '',
          apellido: '',
          telefono: '',
          email: '',
        });
      }
    } catch (error) {
      console.error('Error completo:', error);
      setError(
        error.response?.data?.msg || 
        'Error al crear usuario. Por favor, intente nuevamente'
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold"
        >
          ×
        </button>
        
        <div className="p-5">
          <h2 className="text-2xl font-bold mb-6 text-center">Registro de Usuario</h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
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
              className="w-full bg-indigo-500 text-white px-4 py-3 rounded-lg hover:bg-indigo-600"
            >
              Registrar Usuario
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalCrearUsuario; 