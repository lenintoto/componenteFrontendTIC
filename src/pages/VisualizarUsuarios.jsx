import React, { useState, useEffect, useContext } from 'react';
import { MdNoteAdd, MdPersonAdd, MdToggleOn, MdToggleOff } from "react-icons/md";
import ModalCrearUsuario from '../components/modals/ModalCrearUsuario';
import ModalEditarUsuario from '../components/modals/ModalEditarUsuario';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';
import Mensaje from '../components/Alerts/Alertas';

const VisualizarUsuarios = () => {
  const { auth } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [mensaje, setMensaje] = useState({ msg: '', tipo: false });
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
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

  const mostrarAlerta = (msg, tipo = false) => {
    setMensaje({ msg, tipo });
    setMostrarMensaje(true);
    setTimeout(() => setMostrarMensaje(false), 3000);
  };

  const cambiarEstadoUsuario = async (id, estadoActual) => {
    const confirmToggle = window.confirm('¿Está seguro de que desea cambiar el estado de este usuario?');
    if (!confirmToggle) return;

    try {
      const token = auth.token;
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/administrador/estado/${id}`,
        { estado: !estadoActual },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );
      mostrarAlerta('Estado del usuario actualizado exitosamente', true);
      obtenerUsuarios();
    } catch (error) {
      mostrarAlerta(error.response?.data?.msg || 'Error al cambiar el estado del usuario', false);
    }
  };

  const handleEdit = (usuario) => {
    setSelectedUser(usuario);
    setIsEditModalOpen(true);
  };

  return (
    <div className="flex flex-col h-full p-6">
      {mostrarMensaje && (
        <Mensaje tipo={mensaje.tipo}>{mensaje.msg}</Mensaje>
      )}

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
        onUserCreated={() => {
          obtenerUsuarios();
          mostrarAlerta('Usuario creado exitosamente', true);
        }}
      />

      <ModalEditarUsuario
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedUser(null);
        }}
        usuario={selectedUser}
        onUserUpdated={() => {
          obtenerUsuarios();
          mostrarAlerta('Usuario actualizado exitosamente', true);
        }}
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
                <th className="p-2">Estado</th>
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
                  <td>{usuario.extension}</td>
                  <td>{usuario.email}</td>
                  <td>{usuario.estado ? 'Habilitado' : 'Deshabilitado'}</td>
                  <td className="py-2 text-center flex justify-center items-center space-x-2">
                    <button
                        onClick={() => handleEdit(usuario)}
                        className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full hover:bg-gray-300"
                    >
                        <MdNoteAdd className="w-6 h-6 text-gray-800" />
                    </button>
                    <button
                        onClick={() => cambiarEstadoUsuario(usuario._id, usuario.estado)}
                        className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full hover:bg-gray-300"
                    >
                        {usuario.estado ? (
                            <MdToggleOn className="w-6 h-6 text-green-500" />
                        ) : (
                            <MdToggleOff className="w-6 h-6 text-red-500" />
                        )}
                    </button>
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