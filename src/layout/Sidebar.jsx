import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="bg-gray-900 text-white w-64 h-screen flex flex-col">
      <div className="flex items-center justify-center py-4">
        <div className="text-base font-bold text-left">Dpto. Control de Bienes</div>
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
          <i class="fas fa-file-alt mr-3"></i>
            Crear Reportes
          </Link>
        </li>
        <li className={`px-4 py-2 ${location.pathname === '/visualizar-reportes' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>
          <Link to="/visualizar-reportes" className="flex items-center">
          <i class="fas fa-chart-pie mr-3"></i>
            Visualizar Reportes
          </Link>
        </li>
        <li className={`px-4 py-2 ${location.pathname === '/crear-usuario' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>
          <Link to="/crear-usuarios" className="flex items-center">
          <i class="fas fa-user-plus mr-2"></i>
            Crear Usuarios
          </Link>
        </li>
        <li className={`px-4 py-2 ${location.pathname === '/visualizar-usuarios' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>
          <Link to="/visualizar-usuarios" className="flex items-center">
          <i class="fas fa-users mr-2"></i>
            Visualizar Usuarios
          </Link>
        </li>
      </ul>

      <div className="w-full text-center py-4 bg-gray-800">
        <div className="text-sm">Bienvenido:</div>
        <div className="font-bold">Usuario</div>
      </div>
    </div>
  );
};

export default Sidebar;
