import React, { useContext } from 'react';
import AuthContext from '../context/AuthProvider';

const Inicio = () => {
  const { auth } = useContext(AuthContext);
  
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
                <h3 className="text-lg font-bold mb-2">Crear Reportes</h3>
                <p>En esta página, puedes registrar nuevos reportes de actas. Completa el formulario con los detalles necesarios y, si eres administrador o el reporte está firmado, sube archivos relacionados. Haz clic en "Crear Reporte" para guardar la información.</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-md shadow-md">
                <h3 className="text-lg font-bold mb-2">Crear Usuario</h3>
                <p>Registra nuevos usuarios llenando el formulario con la información requerida. Una vez registrado, el nuevo usuario podrá acceder al sistema con sus credenciales.</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-md shadow-md">
                <h3 className="text-lg font-bold mb-2">Visualizar Reportes</h3>
                <p>Gestiona y revisa todos los reportes existentes. Utiliza los filtros para buscar reportes por fecha o número de acta y realiza acciones como agregar notas, ver detalles o eliminar reportes.</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-md shadow-md">
                <h3 className="text-lg font-bold mb-2">Visualizar Usuarios</h3>
                <p>Permite ver y gestionar los usuarios del sistema. Realiza acciones como agregar notas, ver detalles o eliminar usuarios.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="md:col-span-4 bg-gray-100 p-4 rounded-md shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Información Personal</h2>
          <table className="min-w-full bg-white border border-gray-300">
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-2 font-semibold text-gray-700">Username:</td>
                <td className="px-4 py-2">{auth.username || auth.usernameO || 'No disponible'}</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-semibold text-gray-700">Nombre:</td>
                <td className="px-4 py-2">{auth.nombre || 'No disponible'}</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-semibold text-gray-700">Apellido:</td>
                <td className="px-4 py-2">{auth.apellido || 'No disponible'}</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-semibold text-gray-700">Teléfono:</td>
                <td className="px-4 py-2">Ext-{auth.telefono || 'No disponible'}</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-semibold text-gray-700">Email:</td>
                <td className="px-4 py-2">{auth.email || 'No disponible'}</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-semibold text-gray-700">Rol:</td>
                <td className="px-4 py-2">{auth.rol || 'No disponible'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
