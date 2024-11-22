import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';
import Mensaje from '../components/Alerts/Alertas';
import axios from 'axios';

const LoginPage = () => {
  const { setAuth } = useContext(AuthContext)
  const navigate = useNavigate()
  
  const [form, setForm] = useState({
    username: "",
    password: ""
  })

  const [mensaje, setMensaje] = useState({})

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username || !form.password) {
      setMensaje({
        respuesta: "Todos los campos son obligatorios",
        tipo: false
      });
      return;
    }

    try {
      const esAdmin = form.username.startsWith('admin');
      const url = esAdmin 
        ? `${import.meta.env.VITE_BACKEND_URL}/administrador/loginAdmin`
        : `${import.meta.env.VITE_BACKEND_URL}/operario/login`;

      const { data } = await axios.post(url, form);

      if (!data._id || !data.token) {
        throw new Error('Datos de autenticación incompletos');
      }

      const userData = {
        id: data._id,
        nombre: data.nombre,
        rol: esAdmin ? 'administrador' : 'operario',
        username: data.username || data.usernameO,
        email: data.email
      };

      localStorage.setItem('userData', JSON.stringify(userData));
      localStorage.setItem('token', data.token);
      localStorage.setItem('rol', userData.rol);

      setAuth(userData);

      navigate('/inicio');

    } catch (error) {
      console.error('Error de login:', error);
      setMensaje({
        respuesta: error.response?.data?.msg || "Error al iniciar sesión",
        tipo: false
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
        <h2 className="text-center text-2xl font-bold mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={form.username || ""}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password || ""}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <input type="checkbox" id="remember" className="mr-2" />
              <label htmlFor="remember" className="text-gray-700 text-sm">
                Remember Password
              </label>
            </div>
          </div>
          <div className="mb-4">
            <button className="w-full bg-blue-500 text-white p-2 rounded text-center block hover:bg-blue-600 transition">
              Login
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-gray-700 text-sm">
            Forgot your password?{' '}
            <Link to="/register" className="text-blue-500">
              Sign up!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
