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
          <div className="space-y-2">
            <p><strong>Username:</strong> {auth.username || auth.usernameO || 'No disponible'}</p>
            <p><strong>Nombre:</strong> {auth.nombre || 'No disponible'}</p>
            <p><strong>Apellido:</strong> {auth.apellido || 'No disponible'}</p>
            <p><strong>Teléfono:</strong> {auth.telefono || 'No disponible'}</p>
            <p><strong>Email:</strong> {auth.email || 'No disponible'}</p>
            <p><strong>Rol:</strong> {auth.rol || 'No disponible'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
