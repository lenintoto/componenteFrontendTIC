import React, { useState } from 'react';
import axios from 'axios';
import Draggable from 'react-draggable';

const ModalCrearUsuario = ({ isOpen, onClose, onUserCreated }) => {
  const [formData, setFormData] = useState({
    username: '',
    nombre: '',
    apellido: '',
    extension: '',
    email: '',
  });

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
        onUserCreated(false, 'No hay token de autenticación');
        return;
      }

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/administrador/registrar-operario`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );

      setFormData({
        username: '',
        nombre: '',
        apellido: '',
        extension: '',
        email: '',
      });
      
      onUserCreated(true, 'Usuario creado exitosamente');
      onClose();
      
    } catch (error) {
      onUserCreated(false, error.response?.data?.msg || 'Error al crear usuario');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Draggable handle=".modal-header" bounds="parent">
        <div className="bg-white rounded-lg w-full max-w-md relative">
          <div className="modal-header p-4 bg-gray-200 rounded-t-lg flex justify-between items-center cursor-move">
            <h2 className="text-2xl font-bold">Registro de Usuario</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-3xl font-bold">×</button>
          </div>
          
          <div className="p-5">
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
                <label className="block text-gray-700">Extensión:</label>
                <input
                  type="tel"
                  name="extension"
                  value={formData.extension}
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
      </Draggable>
    </div>
  );
};

export default ModalCrearUsuario; 