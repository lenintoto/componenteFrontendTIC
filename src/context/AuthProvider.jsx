import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ id: "", rol: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const obtenerPerfil = async (token) => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/admin/datos/${auth.id}`;
      const options = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      };
      const respuesta = await axios.get(url, options);
      setAuth(respuesta.data);
    } catch (error) {
      console.error("Error al obtener perfil:", error.response ? error.response.data : error.message);
      setError("Error al obtener perfil");
    } finally {
      setLoading(false);
    }
  };

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    setAuth({ id: "", rol: "" });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      obtenerPerfil(token);
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading, error, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };
export default AuthContext;
