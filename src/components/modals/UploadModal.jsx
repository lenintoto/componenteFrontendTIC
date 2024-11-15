import React, { useState } from 'react';
import axios from 'axios';
import { MdClose } from 'react-icons/md';

const UploadModal = ({ isOpen, onClose, reporte, onUploadSuccess }) => {
  const [archivo, setArchivo] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!archivo) {
      setUploadError('Por favor seleccione un archivo');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('archivo', archivo);
      formData.append('estado', 'firmado');

      const token = localStorage.getItem('token');
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/reporte/actualizar-reporte-operario/${reporte._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        }
      );

      onUploadSuccess();
      handleClose();
    } catch (error) {
      setUploadError(error.response?.data?.msg || 'Error al subir el archivo');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setArchivo(null);
    setUploadError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <MdClose className="w-6 h-6" />
        </button>

        <h2 className="text-xl font-bold mb-4">Subir Archivo</h2>
        
        {uploadError && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
            {uploadError}
          </div>
        )}

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

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
              disabled={loading}
            >
              {loading ? 'Subiendo...' : 'Subir'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadModal; 