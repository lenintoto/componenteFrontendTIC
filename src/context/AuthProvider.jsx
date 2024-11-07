import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ id: "", rol: "" });
  const [data, setData] = useState("Info del context");

  const obtenerPerfil = async (token) => {
    if (!auth.id) {
      console.log("ID de autenticación no está disponible");
      return;
    }

    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/admin/datos/${auth.id}`;
      const options = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      };
      const respuesta = await axios.get(url, options);
      //console.log(respuesta.data);
      setAuth(respuesta.data);
    } catch (error) {
      console.error("Error al obtener perfil:", error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      obtenerPerfil(token);
      console.log("hay token");
    } else {
      console.log("no hay token");
    }
  }, [auth.id]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, data }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };
export default AuthContext;
