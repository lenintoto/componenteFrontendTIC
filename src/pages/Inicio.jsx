import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../context/AuthProvider';
import ModalActualizarContraseña from '../components/modals/ModalActualizarContraseña';
import axios from 'axios';

const Inicio = () => {
  const { auth } = useContext(AuthContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [userData, setUserData] = useState(auth);

  useEffect(() => {
    setUserData(auth);
  }, [auth]);

  const handleUpdatePassword = async (oldPassword, newPassword, confirmPassword) => {
    try {
      const token = auth.token;
      if (!token) {
        console.error('No hay token de autenticación');
        return;
      }

      const endpoint = auth.rol === 'administrador'
        ? `${import.meta.env.VITE_BACKEND_URL}/administrador/cambiar-password`
        : `${import.meta.env.VITE_BACKEND_URL}/operario/cambiar-password`;

      const response = await axios.post(endpoint, {
        passwordActual: oldPassword,
        nuevoPassword: newPassword,
        confirmarPassword: confirmPassword,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      console.log(response.data.msg);
      setModalOpen(false);
    } catch (error) {
      console.error("Error al actualizar la contraseña:", error.response?.data?.msg || 'Error desconocido');
      alert(error.response?.data?.msg || 'Error al actualizar la contraseña');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Bienvenidos a la Unidad de Bienes</h1>
      <p className="text-lg text-gray-700 mb-6 leading-relaxed">
        Bienvenido a <strong>Unidad de Bienes</strong>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
        <div className="md:col-span-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Mini Tutorial del Sistema</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-100 p-4 rounded-md shadow-md">
                <h3 className="text-lg font-bold mb-2">Crear Registros</h3>
                <p>Ingresa nuevos registros de actas completando el formulario con los detalles necesarios. Si el reporte está firmado, puedes subir los archivos en formato PDF. Haz clic en "Crear Reporte" para guardar la información.</p>
              </div>
              {userData.rol === 'administrador' && (
                <div className="bg-gray-100 p-4 rounded-md shadow-md">
                  <h3 className="text-lg font-bold mb-2">Crear Usuario</h3>
                  <p>Registra nuevos usuarios llenando el formulario con la información requerida. Una vez registrado, el usuario podrá acceder al sistema con sus credenciales.</p>
                </div>
              )}
              <div className="bg-gray-100 p-4 rounded-md shadow-md">
                <h3 className="text-lg font-bold mb-2">Visualizar Reportes</h3>
                <p>Gestiona y revisa todos los registros existentes. Utiliza los filtros para buscar reportes por fecha, número de acta o estado (pendiente y firmado) y realiza acciones como subir archivos en un plazo de 30 días si en el registro creado no se subieron, o como administrador editar la información de los registros</p>
              </div>
              {userData.rol === 'administrador' && (
                <div className="bg-gray-100 p-4 rounded-md shadow-md">
                  <h3 className="text-lg font-bold mb-2">Visualizar Usuarios</h3>
                  <p>Visualiza y gestiona los usuarios del sistema. Puedes editar la información de los usuarios, o cambiar el estado de los usuarios.</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="md:col-span-4 bg-gray-100 p-4 rounded-md shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Información Personal</h2>
          <table className="min-w-full bg-white border border-gray-300">
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-2 font-semibold text-gray-700">Username:</td>
                <td className="px-4 py-2">{userData.username || userData.usernameO || 'No disponible'}</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-semibold text-gray-700">Nombre:</td>
                <td className="px-4 py-2">{userData.nombre || 'No disponible'}</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-semibold text-gray-700">Apellido:</td>
                <td className="px-4 py-2">{userData.apellido || 'No disponible'}</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-semibold text-gray-700">Extensión:</td>
                <td className="px-4 py-2">Ext-{userData.extension || 'No disponible'}</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-semibold text-gray-700">Email:</td>
                <td className="px-4 py-2">{userData.email || 'No disponible'}</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-semibold text-gray-700">Rol:</td>
                <td className="px-4 py-2">{userData.rol || 'No disponible'}</td>
              </tr>
              <tr>
                <td colSpan="2" className="px-4 py-2 text-center">
                  <button
                    onClick={() => setModalOpen(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                  >
                    Actualizar Contraseña
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <ModalActualizarContraseña
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            onUpdate={handleUpdatePassword}
            role={userData.rol}
          />
        </div>
      </div>
    </div>
  );
};

export default Inicio;
