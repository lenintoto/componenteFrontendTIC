import React, { useState, useEffect, useContext } from 'react';
import { MdDeleteForever, MdNoteAdd, MdInfo, MdPersonAdd } from "react-icons/md";
import ModalCrearUsuario from '../components/modals/ModalCrearUsuario';
import ModalEditarUsuario from '../components/modals/ModalEditarUsuario';
import ModalInfoUsuario from '../components/modals/ModalInfoUsuario';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';

const VisualizarUsuarios = () => {
  const { auth } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [mensaje, setMensaje] = useState({ error: false, msg: '' });
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.rol === 'operario') {
      navigate('/forbidden');
      return;
    }
    obtenerUsuarios();
  }, [auth, navigate]);

  const obtenerUsuarios = async () => {
    try {
      const token = auth.token;
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/administrador/listar-operarios`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );
      setUsuarios(data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      if (error.response?.status === 401) {
        navigate('/');
      }
    }
  };

  const eliminarUsuario = async (id) => {
    if (!confirm('¿Está seguro de eliminar este usuario?')) return;

    try {
      const token = auth.token;
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/admin/estado-operario/${id}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );
      obtenerUsuarios();
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };

  const handleEdit = (usuario) => {
    setSelectedUser(usuario);
    setIsEditModalOpen(true);
  };

  const handleInfo = (usuario) => {
    setSelectedUser(usuario);
    setIsInfoModalOpen(true);
  };

  return (
    <div className="flex flex-col h-full p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Gestión de Usuarios</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <MdPersonAdd className="text-xl" />
          Crear Usuario
        </button>
      </div>

      <ModalCrearUsuario 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onUserCreated={obtenerUsuarios}
      />

      <ModalEditarUsuario
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedUser(null);
        }}
        usuario={selectedUser}
        onUserUpdated={obtenerUsuarios}
      />

      <ModalInfoUsuario
        isOpen={isInfoModalOpen}
        onClose={() => {
          setIsInfoModalOpen(false);
          setSelectedUser(null);
        }}
        usuario={selectedUser}
      />

      <div>
        {usuarios.length === 0 ? (
          <div className="bg-gray-200 p-4">
            <div className="alert error">No existen registros</div>
          </div>
        ) : (
          <table className="w-full mt-5 table-auto shadow-lg bg-white">
            <thead className="bg-gray-800 text-slate-400">
              <tr>
                <th className="p-2">N°</th>
                <th className="p-2">Nombre de usuario</th>
                <th className="p-2">Nombre</th>
                <th className="p-2">Apellido</th>
                <th className="p-2">Extensión</th>
                <th className="p-2">Email</th>
                <th className="p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario, index) => (
                <tr key={usuario._id} className="border-b hover:bg-gray-300 text-center">
                  <td>{index + 1}</td>
                  <td>{usuario.username}</td>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.apellido}</td>
                  <td>{usuario.telefono}</td>
                  <td>{usuario.email}</td>
                  <td className="py-2 text-center">
                    <MdNoteAdd 
                      className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                      onClick={() => handleEdit(usuario)}
                    />
                    <MdInfo 
                      className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                      onClick={() => handleInfo(usuario)}
                    />
                    <MdDeleteForever 
                      className="h-7 w-7 text-red-900 cursor-pointer inline-block"
                      onClick={() => eliminarUsuario(usuario._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default VisualizarUsuarios;