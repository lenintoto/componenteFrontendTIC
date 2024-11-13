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
import { NotFound } from './pages/NotFound';
//import { Forbidden } from './pages/Forbidden';
import { PrivateRoute } from './routes/PrivateRoutes';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/inicio" element={
              <PrivateRoute>
                <Inicio />
              </PrivateRoute>
            } />
            <Route path="/crear-reportes" element={
              <PrivateRoute>
                <CrearReportes />
              </PrivateRoute>
            } />
            <Route path="/visualizar-reportes" element={
              <PrivateRoute>
                <VisualizarReportes />
              </PrivateRoute>
            } />
            <Route path="/crear-usuarios" element={
              <PrivateRoute>
                <CrearUsuario />
              </PrivateRoute>
            } />
            <Route path="/visualizar-usuarios" element={
              <PrivateRoute>
                <VisualizarUsuarios />
              </PrivateRoute>
            } />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
