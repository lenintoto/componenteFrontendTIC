import { useState, useEffect, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    // Inicializar el estado con los datos del localStorage si existen
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : {};
  });
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setCargando(false);
        return;
      }

      try {
        // Obtener datos del usuario del localStorage
        const userData = localStorage.getItem('userData');
        if (!userData) {
          throw new Error('No user data found');
        }

        const parsedUserData = JSON.parse(userData);
        
        // Determinar la URL basada en el rol
        const url = parsedUserData.rol === 'administrador'
          ? `${import.meta.env.VITE_BACKEND_URL}/administrador/perfil`
          : `${import.meta.env.VITE_BACKEND_URL}/operario/perfil`;

        // Verificar con el backend
        const { data } = await axios.get(url, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });

        // Combinar los datos existentes con los nuevos del backend
        const updatedUserData = {
          ...parsedUserData,
          ...data,
          username: parsedUserData.username, // Mantener el username original
          rol: parsedUserData.rol // Mantener el rol original
        };

        setAuth(updatedUserData);
        localStorage.setItem('userData', JSON.stringify(updatedUserData));

      } catch (error) {
        console.error('Error de autenticación:', error);
        // Solo limpiar si es un error de autenticación
        if (error.response?.status === 401) {
          setAuth({});
          localStorage.removeItem('token');
          localStorage.removeItem('userData');
        }
      } finally {
        setCargando(false);
      }
    };

    autenticarUsuario();
  }, []);

  const cerrarSesion = () => {
    setAuth({});
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
  };

  // Función para actualizar el auth
  const actualizarAuth = (nuevosData) => {
    const updatedData = { ...auth, ...nuevosData };
    setAuth(updatedData);
    localStorage.setItem('userData', JSON.stringify(updatedData));
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth: actualizarAuth,
        cargando,
        cerrarSesion
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;
