import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../context/AuthProvider';
import Draggable from 'react-draggable';

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

    const confirmEdit = window.confirm('¿Está seguro de que desea actualizar este reporte?');
    if (!confirmEdit) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        onEditSuccess(false, 'No hay token de autenticación');
        return;
      }

      const endpoint = auth.rol === 'administrador'
        ? `/reporte/actualizar-reporte/${reporte._id}`
        : `/reporte/actualizar-reporte-operario/${reporte._id}`;

      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}${endpoint}`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );

      onEditSuccess(true, 'Reporte actualizado exitosamente');
      onClose();
      
    } catch (error) {
      onEditSuccess(false, error.response?.data?.msg || 'Error al actualizar reporte');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Draggable handle=".modal-header" bounds="parent">
        <div className="bg-white rounded-lg w-full max-w-md relative">
          <div className="modal-header p-4 bg-gray-200 rounded-t-lg flex justify-between items-center cursor-move">
            <h2 className="text-2xl font-bold">Editar Reporte</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-3xl font-bold">×</button>
          </div>
          
          <div className="p-5">
            <form onSubmit={handleSubmit}>
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
          </div>
        </div>
      </Draggable>
    </div>
  );
};

export default EditModal;