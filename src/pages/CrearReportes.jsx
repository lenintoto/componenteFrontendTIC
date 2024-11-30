import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthProvider';

const CrearReportes = () => {
  const { auth } = useContext(AuthContext);
  const [isCompleted, setIsCompleted] = useState(false);
  const [formData, setFormData] = useState({
    numero_acta: '',
    nombre_custodio: '',
    fecha_creacion: '',
    Dependencia: '',
    cantidad_bienes: '',
    observacion: '',
    estado: 'pendiente',
    operarioId: auth._id || '',
  });
  const [archivo, setArchivo] = useState(null);
  const [mensaje, setMensaje] = useState({ error: false, msg: '' });

  useEffect(() => {
    if (auth) {
      setFormData(prevData => ({
        ...prevData,
        operarioId: auth._id || '',
      }));
    }
  }, [auth]);

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

  const dependencias = [
    'Consejo Politecnico',
    'Rectorado',
    'Vicerrectorado de Docencia',
    'Vicerrectorado de Investación,Innovación y Vinculación',
    'Escuela de Formación de Tecnólogos',
    'Centros de Modelización Matematica',
    'Museo',
    'Observatorio Astrónomico de Quito',
    'Auditoria Interna',
    'Asesoria Jurídica',
    'Planificación',
    'Relaciones Institucionales',
    'Comunicación',
    'Secretaria General',
    'Administrativo--PENDIENTE(GESTION,BODEGAS/INMUEBLES/HEMICILIO)',
    'Financiero',
    'Talento Humano',
    'Gestión de la Información y Procesos',
    'Facultad de Ciencias',
    'Facultad de Ciencias Administrativas',
    'Facultad de Ingeniería Química y Agroindustria',
    'Facultad de Ingeniería Eléctrica y Electrónica',
    'Facultad de Ingeniería en Geología y Petroleos',
    'Facultad de Ingeniería Civíl y Ambiental',
    'Facultad de Ingeniería en Sistemas',
    'Departamento de Formación Básica',
    'Departamento de Ciencias Sociales',
    'Metal Mecanica San Bartolo',
    'Geofisíco',
    'Centro de Educación Continua'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!formData.numero_acta || !formData.nombre_custodio || !formData.fecha_creacion || !formData.Dependencia || !formData.cantidad_bienes) {
        setMensaje({
          error: true,
          msg: 'Por favor complete todos los campos obligatorios'
        });
        return;
      }

      const formDataToSend = new FormData();

      if (auth.rol === 'operario' && !isCompleted && archivo) {
        setMensaje({
          error: true,
          msg: 'Los operarios solo pueden subir archivos cuando el acta está firmada'
        });
        return;
      }

      if (auth.rol === 'administrador' && isCompleted && !archivo) {
        setMensaje({
          error: true,
          msg: 'Debe adjuntar un archivo cuando el acta está firmada'
        });
        return;
      }

      const fecha = formData.fecha_creacion ? new Date(formData.fecha_creacion) : '';

      Object.keys(formData).forEach(key => {
        if (key === 'fecha_creacion') {
          formDataToSend.append(key, fecha);
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      if (archivo) {
        formDataToSend.append('archivo', archivo);
      }

      const token = localStorage.getItem('token');
      if (!token) {
        setMensaje({
          error: true,
          msg: 'Token no encontrado. Por favor, inicie sesión nuevamente.'
        });
        return;
      }

      const url = auth.rol === 'administrador'
        ? `${import.meta.env.VITE_BACKEND_URL}/reporte/registrar-reporte`
        : `${import.meta.env.VITE_BACKEND_URL}/reporte/registrar-reporte-operario`;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      const { data } = await axios.post(url, formDataToSend, config);

      setMensaje({
        error: false,
        msg: data.msg || 'Reporte creado con éxito'
      });

    } catch (error) {
      console.error('Error al crear el reporte:', error);
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
        <div className={`p-4 mb-4 rounded-lg ${mensaje.error ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
          }`}>
          {mensaje.msg}
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="numero_acta" className="block text-sm font-medium text-gray-700">
            N° de Acta <span className="text-red-500">*</span>
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
            Nombre del Custodio <span className="text-red-500">*</span>
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
            Fecha de Asignación <span className="text-red-500">*</span>
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
            Dependencia <span className="text-red-500">*</span>
          </label>
          <select
            name="Dependencia"
            id="Dependencia"
            value={formData.Dependencia}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
          >
            <option value="">Seleccionar Dependencia</option>
            {dependencias.map((dep, index) => (
              <option key={index} value={dep}>
                {dep}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="cantidad_bienes" className="block text-sm font-medium text-gray-700">
            Cantidad de Bienes <span className="text-red-500">*</span>
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

        {(auth.rol === 'administrador' || isCompleted) && (
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
