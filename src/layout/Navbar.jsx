import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';

const Navbar = () => {
  const { cerrarSesion } = useContext(AuthContext);

  return (
    <nav className="bg-gray-800 text-white shadow px-4 py-2 flex justify-between items-center">
      <div></div>
      <div className="flex justify-end space-x-4">
        <Link 
          className="hover:text-gray-400" 
          onClick={cerrarSesion} 
          to="/login"
        >
          Cerrar Sesión
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
