import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';

const Sidebar = () => {
  const location = useLocation();
  const { auth } = useContext(AuthContext);

  const nombreUsuario = auth.username || auth.usernameO || 'Usuario';
  const isAdmin = auth.rol === 'administrador';

  return (
    <div className="bg-gray-900 text-white w-64 h-screen flex flex-col">
      <div className="flex items-center justify-center py-4">
        <div className="text-base font-bold text-left">Unidad de Bienes</div>
      </div>

      <ul className="mt-6 flex-grow">
        <li className={`px-4 py-2 ${location.pathname === '/inicio' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>
          <Link to="/inicio" className="flex items-center">
            <i className="fas fa-home mr-3"></i>
            Inicio
          </Link>
        </li>
        <li className={`px-4 py-2 ${location.pathname === '/crear-reportes' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>
          <Link to="/crear-reportes" className="flex items-center">
          <i className="fas fa-file-alt mr-3"></i>
            Crear Registros
          </Link>
        </li>
        <li className={`px-4 py-2 ${location.pathname === '/visualizar-reportes' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>
          <Link to="/visualizar-reportes" className="flex items-center">
          <i className="fas fa-chart-pie mr-3"></i>
            Visualizar Reportes
          </Link>
        </li>
        {isAdmin && (
          <li className={`px-4 py-2 ${location.pathname === '/visualizar-usuarios' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>
            <Link to="/visualizar-usuarios" className="flex items-center">
              <i className="fas fa-users mr-2"></i>
              Gestión de Usuarios
            </Link>
          </li>
        )}
      </ul>

      <div className="w-full text-center py-4 bg-gray-800">
        <div className="text-sm">Bienvenido:</div>
        <div className="font-bold">{nombreUsuario}</div>

      </div>
    </div>
  );
};

export default Sidebar;
