import { render, screen, fireEvent } from '@testing-library/react';
import VisualizarUsuarios from '../VisualizarUsuarios';
import { AuthContext } from '../../context/AuthProvider';
import React from 'react';
import axios from 'axios';

jest.mock('axios');

const mockAuth = {
  token: 'mockToken',
  rol: 'administrador',
};

describe('VisualizarUsuarios', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: [] });
  });

  test('should render user management and open create user modal', () => {
    render(
      <AuthContext.Provider value={{ auth: mockAuth }}>
        <VisualizarUsuarios />
      </AuthContext.Provider>
    );

    expect(screen.getByText(/Gestión de Usuarios/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Crear Usuario/i));
    expect(screen.getByText(/Registro de Usuario/i)).toBeInTheDocument();
  });
}); 