import axios from "axios";
import { React, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Mensaje from "../components/Alerts/Alertas";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const NewPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    password: "",
    confirmarPassword: ""
  });
  const [mensaje, setMensaje] = useState({});
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmarPassword: false
  });

  useEffect(() => {
    const validateToken = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/comprobar/${token}`;
        await axios.get(url);
        setIsTokenValid(true);
      } catch (error) {
        setMensaje({
          respuesta: error.response.data?.msg || "Token no válido o ha expirado.",
          tipo: false
        });
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    };

    validateToken();
  }, [token, navigate]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/nuevo-password/${token}`;
      const respuesta = await axios.post(url, form);
      setMensaje({
        respuesta: respuesta.data.msg,
        tipo: true
      });
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      setMensaje({
        respuesta: error.response.data?.msg,
        tipo: false
      });
      setTimeout(() => {
        setMensaje({});
      }, 3000);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
        {isTokenValid ? (
          <>
            <h2 className="text-center text-2xl font-bold mb-6">Nueva Contraseña</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700">Nueva Contraseña</label>
                <div className="relative">
                  <input
                    type={showPassword.password ? "text" : "password"}
                    id="password"
                    name="password"
                    value={form.password || ""}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mt-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => togglePasswordVisibility('password')}
                  >
                    {showPassword.password ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="confirmarPassword" className="block text-gray-700">Confirmar Contraseña</label>
                <div className="relative">
                  <input
                    type={showPassword.confirmarPassword ? "text" : "password"}
                    id="confirmarPassword"
                    name="confirmarPassword"
                    value={form.confirmarPassword || ""}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mt-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => togglePasswordVisibility('confirmarPassword')}
                  >
                    {showPassword.confirmarPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              <div className="mb-4">
                <button className="w-full bg-blue-500 text-white p-2 rounded text-center block hover:bg-blue-600 transition">
                  Actualizar Contraseña
                </button>
              </div>
            </form>
          </>
        ) : (
          <h2 className="text-center text-2xl font-bold mb-6">Validando Token...</h2>
        )}
      </div>
    </div>
  );
};

export default NewPasswordPage; 