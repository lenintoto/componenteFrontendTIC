import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import Sidebar from './Sidebar';

const mockAuth = {
  username: 'testuser',
  usernameO: '',
  rol: 'administrador',
};

describe('Sidebar', () => {
  test('renders sidebar with user information and links', () => {
    render(
      <MemoryRouter initialEntries={['/inicio']}>
        <AuthContext.Provider value={{ auth: mockAuth }}>
          <Sidebar />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Dpto. Control de Bienes/i)).toBeInTheDocument();
    expect(screen.getByText(/Inicio/i)).toBeInTheDocument();
    expect(screen.getByText(/Crear Reportes/i)).toBeInTheDocument();
    expect(screen.getByText(/Visualizar Reportes/i)).toBeInTheDocument();
    expect(screen.getByText(/Gestión de Usuarios/i)).toBeInTheDocument();
    expect(screen.getByText(/Bienvenido:/i)).toBeInTheDocument();
    expect(screen.getByText(/testuser/i)).toBeInTheDocument();
  });
}); 