import React, { useState, useEffect, useContext } from 'react';
import { MdEdit } from "react-icons/md";
import axios from 'axios';
import UploadModal from '../components/modals/UploadModal';
import { useNavigate } from 'react-router-dom';
import Mensaje from '../components/Alerts/Alertas';
import AuthContext from '../context/AuthProvider';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';
import EditModal from '../components/modals/EditModal';

const VisualizarReportes = () => {
  const [reportes, setReportes] = useState([]);
  const [filtros, setFiltros] = useState({
    fecha_inicio: '',
    fecha_fin: '',
    numero_acta: '',
    estado: ''
  });
  const [error, setError] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedReporte, setSelectedReporte] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState({ msg: '', tipo: false });
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const { auth } = useContext(AuthContext);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const verificarAutenticacion = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/');
        return;
      }

      const userDataString = localStorage.getItem('userData');
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        setUserRole(userData.rol);
        obtenerReportes();
      }
    };

    verificarAutenticacion();
  }, [navigate]);

  const mostrarAlerta = (msg, tipo = false) => {
    setMensaje({ msg, tipo });
    setMostrarMensaje(true);
    setTimeout(() => setMostrarMensaje(false), 3000);
  };

  const obtenerReportes = async () => {
    try {
      const token = auth?.token;
      if (!token) return;

      const endpoint = auth.rol === 'administrador'
        ? `${import.meta.env.VITE_BACKEND_URL}/reporte/listar-reportes/${auth._id}`
        : `${import.meta.env.VITE_BACKEND_URL}/reporte/listar-reporte-operario/${auth._id}`;

      const { data } = await axios.get(
        endpoint,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (data.length === 0) {
        mostrarAlerta('No hay reportes disponibles');
      }
      setReportes(data);
    } catch (error) {
      console.error('Error al obtener reportes:', error);
      mostrarAlerta(error.response?.data?.msg || 'Error al cargar los reportes');
      if (error.response?.status === 401) {
        localStorage.clear();
        navigate('/');
      }
    }
  };

  const filtrarReportes = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      if (filtros.numero_acta.trim() && (filtros.fecha_inicio || filtros.fecha_fin)) {
        mostrarAlerta('Por favor, use solo un tipo de filtro a la vez');
        return;
      }

      let params = {};
      const endpoint = auth.rol === 'administrador'
        ? `/reporte/filtrar-reporte-administrador`
        : `/reporte/filtrar-reporte-operario`;

      if (filtros.numero_acta.trim()) {
        params.numero_acta = filtros.numero_acta;
      } else if (filtros.fecha_inicio && filtros.fecha_fin) {
        if (new Date(filtros.fecha_inicio) > new Date(filtros.fecha_fin)) {
          mostrarAlerta('La fecha de inicio no puede ser posterior a la fecha final');
          return;
        }
        params = {
          fecha_inicio: filtros.fecha_inicio,
          fecha_fin: filtros.fecha_fin
        };
      } else if ((filtros.fecha_inicio && !filtros.fecha_fin) || (!filtros.fecha_inicio && filtros.fecha_fin)) {
        mostrarAlerta('Por favor, seleccione ambas fechas');
        return;
      } else if (filtros.estado.trim()) {
        params.estado = filtros.estado;
      } else {
        obtenerReportes();
        return;
      }


      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}${endpoint}`,
        {
          params,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );

      const reportesConDependencia = data.map(reporte => ({
        ...reporte,
        Dependencia: reporte.Dependencia || { nombre: 'No asignada' }
      }));

      setReportes(reportesConDependencia);
      if (reportesConDependencia.length === 0) {
        mostrarAlerta('No se encontraron reportes con los filtros aplicados');
      }
    } catch (error) {
      console.error('Error al filtrar reportes:', error);
      mostrarAlerta(error.response?.data?.msg || 'Error al filtrar los reportes');
    }
  };

  const limpiarFiltros = () => {
    setFiltros({
      fecha_inicio: '',
      fecha_fin: '',
      numero_acta: '',
      estado: ''
    });
    obtenerReportes();
  };

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Título principal
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text('Gestión de Reportes', 105, 15, { align: 'center' });
    doc.setFontSize(12);
    doc.text('Reporte de Actividades', 105, 22, { align: 'center' });
    doc.line(10, 30, 200, 30); // Línea horizontal

    // Fecha de generación
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 150, 10);
    
    // Datos de la tabla
    const tableData = reportes.map(reporte => {
        const row = [
            reporte.numero_acta,
            reporte.nombre_custodio,
            new Date(reporte.fecha_ingreso).toLocaleDateString(),
            reporte.Dependencia?.nombre || 'No asignada',
            reporte.cantidad_bienes,
            reporte.estado,
            reporte.observacion,
        ];

        // Agregar el campo de "Operario" solo si el usuario es administrador
        if (userRole === 'administrador') {
            row.push(reporte.operario?.username || 'No asignado');
        }

        return row;
    });

    // Encabezados de la tabla
    const headers = [
        'N° Acta',
        'Nombre del Custodio',
        'Fecha de Asignación',
        'Dependencia',
        'Cantidad de Bienes',
        'Estado',
        'Observaciones',
    ];

    // Agregar el encabezado de "Operario" solo si el usuario es administrador
    if (userRole === 'administrador') {
        headers.push('Operario');
    }

    // Crear la tabla
    doc.autoTable({
        head: [headers],
        body: tableData,
        startY: 40,
        theme: 'grid',
        styles: { 
            cellPadding: 2,
            fontSize: 10,
            overflow: 'linebreak',
            cellWidth: 'auto',
            halign: 'center'
        },
        headStyles: {
            fillColor: [35, 58, 77],
            textColor: [255, 255, 255],
            halign: 'center'
        },
        alternateRowStyles: {
            fillColor: [240, 240, 240]
        }
    });

    // Descargar el PDF
    doc.save(`reportes.pdf`);
  };

  const openEditModal = (reporte) => {
    setSelectedReporte(reporte);
    setShowEditModal(true);
  };

  return (
    <div className="flex flex-col h-full p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Gestión de Reportes</h1>
      {mostrarMensaje && (
        <Mensaje tipo={mensaje.tipo}>
          {mensaje.msg}
        </Mensaje>
      )}

      <button
        onClick={generatePDF}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Descargar PDF
      </button>

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

              <div>
                <label className="block text-gray-700 mb-1">Filtrar por Estado:</label>
                <select
                  name="estado"
                  value={filtros.estado}
                  onChange={handleFiltroChange}
                  className="p-2 border rounded-md text-gray-700"
                >
                  <option value="">Todos</option>
                  <option value="firmado">Firmado</option>
                  <option value="pendiente">Pendiente</option>
                </select>
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

          <table id="reportes-table" className="w-full mt-5 table-auto shadow-lg bg-white">
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
                {userRole === 'administrador' && <th className="p-2">Operario</th>}
                <th className="p-2">Archivo</th>
                {userRole === 'administrador' && <th className="p-2">Acciones</th>}
              </tr>
            </thead>
            <tbody>
              {reportes.map((reporte, index) => (
                <tr key={reporte._id} className="border-b hover:bg-gray-300 text-center">
                  <td>{index + 1}</td>
                  <td>{reporte.numero_acta}</td>
                  <td>{reporte.nombre_custodio}</td>
                  <td>{new Date(reporte.fecha_ingreso).toLocaleDateString()}</td>
                  <td>{reporte.Dependencia?.nombre || 'No asignada'}</td>
                  <td>{reporte.cantidad_bienes}</td>
                  <td>{reporte.estado}</td>
                  <td>{reporte.observacion}</td>
                  {userRole === 'administrador' && <td>{reporte.operario?.username || reporte.administrador?.username || 'No asignado'}</td>}
                  <td>
                    {reporte.archivo ? (
                      <a
                        href={`${import.meta.env.VITE_BACKEND_URL}/reporte/pdf/${reporte._id}`}
                        className="text-green-600"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Cargado
                      </a>
                    ) : (
                      <button
                        onClick={() => {
                          setSelectedReporte(reporte);
                          setShowUploadModal(true);
                        }}
                        className="text-blue-600"
                      >
                        Subir
                      </button>
                    )}
                  </td>
                  {userRole === 'administrador' && (
                    <td className="py-2 text-center">
                      <button
                        onClick={() => openEditModal(reporte)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <MdEdit className="h-6 w-6 inline" />
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

      <EditModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        reporte={selectedReporte}
        onEditSuccess={obtenerReportes}
        showAlert={mostrarAlerta}
      />
    </div>
  );
};

export default VisualizarReportes;