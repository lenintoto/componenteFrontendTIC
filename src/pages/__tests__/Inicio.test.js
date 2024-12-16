import { render, screen, fireEvent } from '@testing-library/react';
import Inicio from '../Inicio';
import { AuthContext } from '../../context/AuthProvider';
import React from 'react';

const mockAuth = {
  token: 'mockToken',
  rol: 'administrador',
  username: 'testuser',
  nombre: 'Test',
  apellido: 'User',
  extension: '123',
  email: 'test@example.com',
};

describe('Inicio', () => {
  test('should render user information and open password modal', () => {
    render(
      <AuthContext.Provider value={{ auth: mockAuth }}>
        <Inicio />
      </AuthContext.Provider>
    );

    expect(screen.getByText(/Bienvenidos a la Unidad de Bienes/i)).toBeInTheDocument();
    expect(screen.getByText(/Username:/i)).toBeInTheDocument();
    expect(screen.getByText(/testuser/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Actualizar Contraseña/i));
    expect(screen.getByText(/Actualizar Contraseña/i)).toBeInTheDocument();
  });
}); 