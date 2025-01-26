import React, { useState, useContext } from 'react';
import axios from 'axios';
import { MdClose } from 'react-icons/md';
import AuthContext from '../../context/AuthProvider';
import Draggable from 'react-draggable';

const UploadModal = ({ isOpen, onClose, reporte, onUploadSuccess }) => {
  const { auth } = useContext(AuthContext);
  const [archivo, setArchivo] = useState(null);
  const [firmado, setFirmado] = useState(false);

  if (!isOpen) return null;

  const handleFileUpload = async (e) => {
    e.preventDefault();
    
    if (!archivo) {
      onUploadSuccess(false, 'Por favor seleccione un archivo');
      return;
    }

    if (!firmado) {
      onUploadSuccess(false, 'Por favor confirme que el documento está firmado');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('archivo', archivo);
      formData.append('estado', 'firmado');

      const token = localStorage.getItem('token');
      if (!token) {
        onUploadSuccess(false, 'No hay token de autenticación');
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
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        }
      );

      onUploadSuccess(true, 'Archivo subido exitosamente');
      handleClose();
    } catch (error) {
      onUploadSuccess(false, error.response?.data?.msg || 'Error al subir el archivo');
    }
  };

  const handleClose = () => {
    setArchivo(null);
    setFirmado(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Draggable handle=".modal-header" bounds="parent">
        <div className="bg-white rounded-lg w-full max-w-md relative">
          <div className="modal-header p-4 bg-gray-200 rounded-t-lg flex justify-between items-center cursor-move">
            <h2 className="text-2xl font-bold">Subir Archivo</h2>
            <button onClick={handleClose} className="text-gray-500 hover:text-gray-700 text-3xl font-bold">×</button>
          </div>
          
          <div className="p-5">
            <form onSubmit={handleFileUpload}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Archivo para el acta N° {reporte?.numero_acta}
                </label>
                <input
                  type="file"
                  onChange={(e) => setArchivo(e.target.files[0])}
                  className="w-full p-2 border rounded"
                  accept=".pdf"
                />
              </div>

              <div className="mb-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={firmado}
                    onChange={(e) => setFirmado(e.target.checked)}
                    className="form-checkbox h-5 w-5 text-blue-500"
                  />
                  <span className="text-sm text-gray-700">Firmado</span>
                </label>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 rounded text-white transition-all duration-300 ${
                    firmado && archivo
                      ? 'bg-blue-500 hover:bg-blue-600'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                  disabled={!firmado || !archivo}
                >
                  Subir
                </button>
              </div>
            </form>
          </div>
        </div>
      </Draggable>
    </div>
  );
};

export default UploadModal; 