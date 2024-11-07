import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Inicio from './pages/Inicio';
import CrearReportes from './pages/CrearReportes';
import CrearUsuario from './pages/CrearUsuario';
import VisualizarReportes from './pages/VisualizarReportes';
import VisualizarUsuarios from './pages/VisualizarUsuarios';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { AuthProvider } from './context/AuthProvider';
//import Forbidden from './pages/Forbidden';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/crear-reportes" element={<CrearReportes />} />
            <Route path="/visualizar-reportes" element={<VisualizarReportes />} />
            <Route path="/crear-usuarios" element={<CrearUsuario />} />
            <Route path="/visualizar-usuarios" element={<VisualizarUsuarios />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/*<Route path="/forbidden" element={<Forbidden />} />*/}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
