import { useState, useEffect, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const rol = localStorage.getItem('rol');
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('userData');
    if (token && userData) {
      return JSON.parse(userData);
    }
    return {};
  });

  useEffect(() => {
    const validarSesion = async () => {
      const rol = localStorage.getItem('rol');
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('userData');

      if (!token || !userData) {
        return;
      }

      try {
        const parsedUserData = JSON.parse(userData);
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        };

        const url = parsedUserData.rol === 'administrador'
          ? `${import.meta.env.VITE_BACKEND_URL}/administrador/perfil-admin`
          : `${import.meta.env.VITE_BACKEND_URL}/operario/perfil-operario`;

        const { data } = await axios.get(url, config);

        const updatedUserData = {
          ...parsedUserData,
          ...data,
          token,
          rol: parsedUserData.rol
        };

        localStorage.setItem('userData', JSON.stringify(updatedUserData));
        setAuth(updatedUserData);

      } catch (error) {
        console.error(error);
        if (error.response?.status === 401) {
          localStorage.removeItem('rol');
          localStorage.removeItem('token');
          localStorage.removeItem('userData');
          setAuth({});
        }
      }
    };

    validarSesion();
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem('rol');
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    setAuth({});
  };

  const actualizarAuth = (datos) => {
    const updatedData = { ...auth, ...datos };
    localStorage.setItem('userData', JSON.stringify(updatedData));
    setAuth(updatedData);
  };

  return (
    <AuthContext.Provider value={{
      auth,
      setAuth: actualizarAuth,
      cerrarSesion
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;
