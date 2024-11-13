import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Asegúrate de tener axios instalado

const CrearReportes = () => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [formData, setFormData] = useState({
    numero_acta: '',
    nombre_custodio: '',
    fecha_creacion: '',
    Dependencia: '',
    cantidad_bienes: '',
    observacion: '',
    estado: 'pendiente',
  });
  const [archivo, setArchivo] = useState(null);
  const [mensaje, setMensaje] = useState({ error: false, msg: '' });
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    setUserRole(userData?.rol);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (e) => {
    setIsCompleted(e.target.checked);
    setFormData({
      ...formData,
      estado: e.target.checked ? 'firmado' : 'pendiente'
    });
  };

  const handleFileChange = (e) => {
    setArchivo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const formDataToSend = new FormData();
      
      // Agregar todos los campos del formulario
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });
      
      // Agregar el archivo si existe
      if (archivo) {
        formDataToSend.append('archivo', archivo);
      }

      const token = localStorage.getItem('token');

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/reporte/registrar-reporte`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          },
        }
      );

      setMensaje({
        error: false,
        msg: 'Reporte creado exitosamente'
      });
      
      // Limpiar el formulario
      setFormData({
        numero_acta: '',
        nombre_custodio: '',
        fecha_creacion: '',
        Dependencia: '',
        cantidad_bienes: '',
        observacion: '',
        estado: 'pendiente',
      });
      setIsCompleted(false);
      setArchivo(null);

    } catch (error) {
      setMensaje({
        error: true,
        msg: error.response?.data?.msg || 'Error al crear el reporte'
      });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Registro de Actas</h1>
      
      {mensaje.msg && (
        <div className={`p-4 mb-4 rounded-lg ${
          mensaje.error ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
        }`}>
          {mensaje.msg}
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="numero_acta" className="block text-sm font-medium text-gray-700">
            N° de Acta
          </label>
          <input
            type="number"
            name="numero_acta"
            id="numero_acta"
            value={formData.numero_acta}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
            min="0"
          />
        </div>

        <div>
          <label htmlFor="nombre_custodio" className="block text-sm font-medium text-gray-700">
            Nombre del Custodio
          </label>
          <input
            type="text"
            name="nombre_custodio"
            id="nombre_custodio"
            value={formData.nombre_custodio}
            onChange={handleInputChange}
            placeholder="Nombre del custodio que recibe"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="fecha_creacion" className="block text-sm font-medium text-gray-700">
            Fecha de Asignación
          </label>
          <input
            type="date"
            name="fecha_creacion"
            id="fecha_creacion"
            value={formData.fecha_creacion}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="observacion" className="block text-sm font-medium text-gray-700">
            Observaciones
          </label>
          <textarea
            name="observacion"
            id="observacion"
            value={formData.observacion}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
          ></textarea>
        </div>

        <div>
          <label htmlFor="Dependencia" className="block text-sm font-medium text-gray-700">
            Dependencia
          </label>
          <select
            name="Dependencia"
            id="Dependencia"
            value={formData.Dependencia}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
          >
            <option value="">Seleccionar Dependencia</option>
            <option value="Facultad 1">Facultad 1</option>
            <option value="Facultad 2">Facultad 2</option>
          </select>
        </div>

        <div>
          <label htmlFor="cantidad_bienes" className="block text-sm font-medium text-gray-700">
            Cantidad de Bienes
          </label>
          <input
            type="number"
            name="cantidad_bienes"
            id="cantidad_bienes"
            value={formData.cantidad_bienes}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
            min="0"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="estado"
            id="estado"
            checked={isCompleted}
            onChange={handleCheckboxChange}
            className="mt-1"
          />
          <label htmlFor="estado" className="ml-2 text-sm font-medium text-gray-700">
            Firmado
          </label>
        </div>

        {(userRole === 'administrador' || isCompleted) && (
          <div>
            <label htmlFor="archivo" className="block text-sm font-medium text-gray-700">
              Subir Archivos
            </label>
            <input
              type="file"
              name="archivo"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
            />
          </div>
        )}

        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Crear Reporte
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrearReportes;
