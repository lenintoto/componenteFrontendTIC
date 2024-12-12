import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../context/AuthProvider';

const EditModal = ({ isOpen, onClose, reporte, onEditSuccess }) => {
  const { auth } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    numero_acta: '',
    nombre_custodio: '',
    fecha_ingreso: '',
    dependencias: '',
    cantidad_bienes: '',
    observacion: '',
    estado: 'pendiente',
  });
  const [dependencias, setDependencias] = useState([]);
  const [editError, setEditError] = useState(null);

  useEffect(() => {
    if (reporte) {
      setFormData({
        numero_acta: reporte.numero_acta,
        nombre_custodio: reporte.nombre_custodio,
        fecha_ingreso: reporte.fecha_ingreso ? new Date(reporte.fecha_ingreso).toISOString().split('T')[0] : '',
        dependencias: reporte.Dependencia?._id || '',
        cantidad_bienes: reporte.cantidad_bienes,
        observacion: reporte.observacion,
        estado: reporte.estado,
      });
    }
  }, [reporte]);

  useEffect(() => {
    const fetchDependencias = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Token no encontrado. Por favor, inicie sesión nuevamente.');
          return;
        }

        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/dependencia/listar`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setDependencias(data);
      } catch (error) {
        console.error('Error fetching dependencies:', error);
      }
    };

    fetchDependencias();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });

      const token = localStorage.getItem('token');
      const endpoint = auth.rol === 'administrador'
        ? `${import.meta.env.VITE_BACKEND_URL}/reporte/actualizar-reporte/${reporte._id}`
        : `${import.meta.env.VITE_BACKEND_URL}/reporte/actualizar-reporte-operario/${reporte._id}`;

      const { data } = await axios.put(
        endpoint,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        }
      );

      onEditSuccess();
      onClose();
    } catch (error) {
      setEditError(error.response?.data?.msg || 'Error al actualizar el reporte');
    }
  };

  useEffect(() => {
    if (editError) {
      const timer = setTimeout(() => {
        setEditError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [editError]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Editar Reporte</h2>
        {editError && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {editError}
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
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="fecha_ingreso" className="block text-sm font-medium text-gray-700">
              Fecha de Asignación
            </label>
            <input
              type="date"
              name="fecha_ingreso"
              id="fecha_ingreso"
              value={formData.fecha_ingreso}
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
            <label htmlFor="dependencias" className="block text-sm font-medium text-gray-700">
              Dependencia
            </label>
            <select
              name="dependencias"
              id="dependencias"
              value={formData.dependencias}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
            >
              <option value="">Seleccionar Dependencia</option>
              {dependencias.map((dep) => (
                <option key={dep._id} value={dep._id}>
                  {dep.nombre}
                </option>
              ))}
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
          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300">
            Guardar Cambios
          </button>
        </form>
        <button onClick={onClose} className="mt-4 text-red-500">Cancelar</button>
      </div>
    </div>
  );
};

export default EditModal;