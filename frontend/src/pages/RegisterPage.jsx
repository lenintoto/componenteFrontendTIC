import axios from "axios";
import { React,useState} from 'react';
import { Link } from 'react-router-dom';
import Mensaje from "../components/Alerts/Alertas";

const RegisterPage = () => {
  const [form,setForm]= useState({
    nombre:"",
    apellido:"",
    email:"",
    password:"",
  })
  
  const [mensaje,setMensaje]=useState({})

  const handleChange=(e) =>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    })
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/admin/registrar`
      const respuesta = await axios.post(url,form)
      console.log(respuesta)
      setMensaje({
        respuesta: respuesta.data.message,
        tipo:true
      })
    } catch (error) {
      console.log(error)
      setMensaje({
        respuesta: error.response.data?.message,
        tipo:false
      })
      setTimeout(()=>{
        setMensaje({})
      },3000)
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      {Object.keys(mensaje).length>0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
        <h2 className="text-center text-2xl font-bold mb-6">Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-gray-700">First name</label>
            <input
              type="text"
              id="firstName"
              name="nombre"
              value={form.nombre || ""} 
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your first name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-gray-700">Last name</label>
            <input
              type="text"
              id="lastName"
              name="apellido"
              value={form.apellido || ""}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your last name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email || ""} 
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="name@example.com"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password || ""} 
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Create a password"
            />
          </div>
          <div className="mb-4">
            <button className="w-full bg-blue-500 text-white p-2 rounded text-center block hover:bg-blue-600 transition">
              Create Account
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-gray-700 text-sm">
            Have an account?{' '}
            <Link to="/login" className="text-blue-500">
              Go to login
            </Link>
          </p>
        </div>
      </div>
      <footer className="absolute bottom-0 w-full text-center py-4 text-gray-700 bg-gray-100">
        <div>Copyright © Your Website 2023</div>
        <div>
          <Link to="#" className="text-blue-500">Privacy Policy</Link> · <Link to="#" className="text-blue-500">Terms & Conditions</Link>
        </div>
      </footer>
    </div>
  );
};

export default RegisterPage;
