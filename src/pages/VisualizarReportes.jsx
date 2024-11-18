import React, { useState, useEffect } from 'react';
import { MdDeleteForever, MdUploadFile } from "react-icons/md";
import axios from 'axios';
import UploadModal from '../components/modals/UploadModal';
import { useNavigate } from 'react-router-dom';
import Mensaje from '../components/Alerts/Alertas';

const VisualizarReportes = () => {
  const [reportes, setReportes] = useState([]);
  const [filtros, setFiltros] = useState({
    fecha_inicio: '',
    fecha_fin: '',
    numero_acta: ''
  });
  const [error, setError] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedReporte, setSelectedReporte] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState({ msg: '', tipo: false });
  const [mostrarMensaje, setMostrarMensaje] = useState(false);

  // Función para mostrar mensajes temporales
  const mostrarAlerta = (msg, tipo = false) => {
    setMensaje({ msg, tipo });
    setMostrarMensaje(true);
    setTimeout(() => setMostrarMensaje(false), 3000);
  };

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
    } catch (error) {
      console.error(error);
      mostrarAlerta('Error al cargar los reportes');
    }
  };

  // Filtrar reportes
  const filtrarReportes = async () => {
    try {
      const token = localStorage.getItem('token');
      let params = {};

      if (filtros.numero_acta.trim() && (filtros.fecha_inicio || filtros.fecha_fin)) {
        mostrarAlerta('Por favor, use solo un tipo de filtro a la vez');
        return;
      }

      if (filtros.numero_acta.trim()) {
        params.numero_acta = filtros.numero_acta;
      }
      else if (filtros.fecha_inicio || filtros.fecha_fin) {
        if (!filtros.fecha_inicio || !filtros.fecha_fin) {
          mostrarAlerta('Por favor, seleccione ambas fechas');
          return;
        }
        params = {
          fecha_inicio: filtros.fecha_inicio,
          fecha_fin: filtros.fecha_fin
        };
      } else {
        obtenerReportes();
        return;
      }

      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/reporte/filtar-reporte`,
        {
          params,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );

      setReportes(data);
      if (data.length === 0) {
        mostrarAlerta('No se encontraron reportes');
      }
    } catch (error) {
      console.error('Error al filtrar:', error);
      mostrarAlerta(error.response?.data?.msg || 'Error al filtrar los reportes');
    }
  };

  // Función para limpiar filtros
  const limpiarFiltros = () => {
    setFiltros({
      fecha_inicio: '',
      fecha_fin: '',
      numero_acta: ''
    });
    obtenerReportes();
  };

  // Eliminar reporte
  const eliminarReporte = async (id) => {
    if (!userRole) {
      mostrarAlerta('No tienes permisos para eliminar reportes');
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
      mostrarAlerta('Reporte eliminado correctamente', true);
      obtenerReportes();
    } catch (error) {
      console.error(error);
      mostrarAlerta('Error al eliminar el reporte');
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

  if (error) return <div className="bg-red-100 text-red-700 p-4 rounded-lg">{error}</div>;

  return (
    <div className="flex flex-col h-full p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Gestión de Reportes</h1>
      {mostrarMensaje && (
        <Mensaje tipo={mensaje.tipo}>
          {mensaje.msg}
        </Mensaje>
      )}

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
                />
                <span className="mx-2">-</span>
                <input
                  type="date"
                  name="fecha_fin"
                  value={filtros.fecha_fin}
                  onChange={handleFiltroChange}
                  className="p-2 border rounded-md text-gray-700"
                />
              </div>

              <div className="text-center">
                <label className="block text-gray-700 mb-1">o</label>
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

            <div className="space-x-2">
              <button
                onClick={filtrarReportes}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Buscar
              </button>
              <button
                onClick={limpiarFiltros}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Limpiar Filtros
              </button>
            </div>
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
