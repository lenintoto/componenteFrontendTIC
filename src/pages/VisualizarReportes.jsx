import React, { useState, useEffect } from 'react';
import { MdDeleteForever, MdUploadFile } from "react-icons/md";
import axios from 'axios';
import UploadModal from '../components/modals/UploadModal';

const VisualizarReportes = () => {
  const [reportes, setReportes] = useState([]);
  const [filtros, setFiltros] = useState({
    fecha_inicio: '',
    fecha_fin: '',
    numero_acta: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedReporte, setSelectedReporte] = useState(null);
  const [userRole, setUserRole] = useState(null);

  // Obtener todos los reportes
  const obtenerReportes = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/reporte/listar-reportes`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );
      setReportes(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError('Error al cargar los reportes');
      setLoading(false);
    }
  };

  // Filtrar reportes
  const filtrarReportes = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/reporte/filtar-reporte`,
        {
          params: filtros,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );
      setReportes(data);
    } catch (error) {
      console.error(error);
      setError('Error al filtrar los reportes');
    }
  };

  // Eliminar reporte
  const eliminarReporte = async (id) => {
    if (!userRole) {
      setError('No tienes permisos para eliminar reportes');
      return;
    }

    if (!confirm('¿Está seguro de eliminar este reporte?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/reporte/eliminar-reporte/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );
      obtenerReportes();
    } catch (error) {
      console.error(error);
      setError('Error al eliminar el reporte');
    }
  };

  // Manejar cambios en los filtros
  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Cargar reportes al montar el componente
  useEffect(() => {
    // Obtener el rol del usuario al cargar el componente
    const userData = JSON.parse(localStorage.getItem('userData'));
    setUserRole(userData?.rol);
    obtenerReportes();
  }, []);

  
  // Función para verificar si han pasado 30 días
  const isDentroDelPlazo = (fechaCreacion) => {
    const fechaLimite = new Date(fechaCreacion);
    fechaLimite.setDate(fechaLimite.getDate() + 30);
    return new Date() <= fechaLimite;
  };

  // Verificar si el usuario es administrador
  const isAdmin = userRole === 'administrador';

  if (loading) return <div>Cargando...</div>;
  if (error) return <div className="bg-red-100 text-red-700 p-4 rounded-lg">{error}</div>;

  return (
    <div className="flex flex-col h-full p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Gestión de Reportes</h1>
      
      {reportes.length === 0 ? (
        <div className="bg-gray-200 p-4">
          <div className="alert error">No existen registros</div>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-4">
              <div>
                <label className="block text-gray-700 mb-1">Filtrar por Fecha:</label>
                <input
                  type="date"
                  name="fecha_inicio"
                  value={filtros.fecha_inicio}
                  onChange={handleFiltroChange}
                  className="p-2 border rounded-md text-gray-700"
                />-
                <input
                  type="date"
                  name="fecha_fin"
                  value={filtros.fecha_fin}
                  onChange={handleFiltroChange}
                  className="p-2 border rounded-md text-gray-700"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Buscar por N° Acta:</label>
                <input
                  type="text"
                  name="numero_acta"
                  value={filtros.numero_acta}
                  onChange={handleFiltroChange}
                  placeholder="Número de Acta"
                  className="p-2 border rounded-md text-gray-700"
                />
              </div>
            </div>

            <button 
              onClick={filtrarReportes}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Buscar
            </button>
          </div>

          <table className="w-full mt-5 table-auto shadow-lg bg-white">
            <thead className="bg-gray-800 text-slate-400">
              <tr>
                <th className="p-2">N°</th>
                <th className="p-2">N° Acta</th>
                <th className="p-2">Nombre del Custodio</th>
                <th className="p-2">Fecha de Asignación</th>
                <th className="p-2">Dependencia</th>
                <th className="p-2">Cantidad de Bienes</th>
                <th className="p-2">Estado</th>
                <th className="p-2">Observaciones</th>
                <th className="p-2">Archivo</th>
                {isAdmin && <th className="p-2">Acciones</th>}
              </tr>
            </thead>
            <tbody>
              {reportes.map((reporte, index) => (
                <tr key={reporte._id} className="border-b hover:bg-gray-300 text-center">
                  <td>{index + 1}</td>
                  <td>{reporte.numero_acta}</td>
                  <td>{reporte.nombre_custodio}</td>
                  <td>{new Date(reporte.fecha_creacion).toLocaleDateString()}</td>
                  <td>{reporte.Dependencia}</td>
                  <td>{reporte.cantidad_bienes}</td>
                  <td>{reporte.estado}</td>
                  <td>{reporte.observacion}</td>
                  <td>
                    {reporte.archivo ? (
                      <span className="text-green-600">Cargado</span>
                    ) : isDentroDelPlazo(reporte.fecha_creacion) ? (
                      <button
                        onClick={() => {
                          setSelectedReporte(reporte);
                          setShowUploadModal(true);
                        }}
                        className="flex items-center justify-center space-x-1 text-blue-600 hover:text-blue-800"
                      >
                        <MdUploadFile className="h-5 w-5" />
                        <span>Subir</span>
                      </button>
                    ) : (
                      <span className="text-red-600">Plazo vencido</span>
                    )}
                  </td>
                  {isAdmin && (
                    <td className="py-2 text-center">
                      <button
                        onClick={() => eliminarReporte(reporte._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <MdDeleteForever className="h-6 w-6 inline" />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <UploadModal
        isOpen={showUploadModal}
        onClose={() => {
          setShowUploadModal(false);
          setSelectedReporte(null);
        }}
        reporte={selectedReporte}
        onUploadSuccess={() => {
          obtenerReportes();
        }}
      />
    </div>
  );
};

export default VisualizarReportes;
