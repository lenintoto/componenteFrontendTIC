import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Inicio from './pages/Inicio';
import CrearReportes from './pages/CrearReportes';
import VisualizarReportes from './pages/VisualizarReportes';
import VisualizarUsuarios from './pages/VisualizarUsuarios';
import LoginPage from './pages/LoginPage';
import RecoverPasswordPage from './pages/RecoverPasswordPage';
import NewPasswordPage from './pages/NewPasswordPage';
import { AuthProvider } from './context/AuthProvider';
import { NotFound } from './pages/NotFound';
import { Forbidden } from './pages/Forbidden';
import PrivateRoute from './routes/PrivateRoutes';
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  return (
    <SpeedInsights>
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
              <Route path="/visualizar-usuarios" element={
                <PrivateRoute>
                  <VisualizarUsuarios />
                </PrivateRoute>
              } />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/recuperar-contrasena" element={<RecoverPasswordPage />} />
            <Route path="/nuevo-password/:token" element={<NewPasswordPage />} />
            <Route path="/forbidden" element={<Forbidden />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </SpeedInsights>
  );
}

export default App;
