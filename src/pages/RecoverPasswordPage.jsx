import axios from "axios";
import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Mensaje from "../components/Alerts/Alertas";

const RecoverPasswordPage = () => {
  const [form, setForm] = useState({
    email: "",
  });

  const [mensaje, setMensaje] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/recuperar-password`;
      const respuesta = await axios.post(url, form);
      console.log(respuesta);
      setMensaje({
        respuesta: respuesta.data.msg,
        tipo: true
      });
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      console.log(error);
      setMensaje({
        respuesta: error.response.data?.msg,
        tipo: false
      });
      setTimeout(() => {
        setMensaje({});
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
        <h2 className="text-center text-2xl font-bold mb-6">Recuperar Contraseña</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Correo electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email || ""}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="name@example.com"
              required
            />
          </div>
          <div className="mb-4">
            <button className="w-full bg-blue-500 text-white p-2 rounded text-center block hover:bg-blue-600 transition">
              Enviar Correo de Recuperación
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-gray-700 text-sm">
            Recordaste tu contraseña?{' '}
            <Link to="/login" className="text-blue-500">
              Iniciar Sesión
            </Link>
          </p>
        </div>
      </div>
      <footer className="absolute bottom-0 w-full text-center py-4 text-gray-700 bg-gray-100">
        <p>:D</p>
      </footer>
    </div>
  );
};

export default RecoverPasswordPage;
