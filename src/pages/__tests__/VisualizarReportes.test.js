import { render, screen, fireEvent } from '@testing-library/react';
import VisualizarReportes from '../VisualizarReportes';
import { AuthContext } from '../../context/AuthProvider';
import React from 'react';
import axios from 'axios';

jest.mock('axios');

const mockAuth = {
  token: 'mockToken',
  rol: 'administrador',
};

describe('VisualizarReportes', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: [] });
  });

  test('should render report management and filter reports', () => {
    render(
      <AuthContext.Provider value={{ auth: mockAuth }}>
        <VisualizarReportes />
      </AuthContext.Provider>
    );

    expect(screen.getByText(/Gestión de Reportes/i)).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText(/Número de Acta/i), { target: { value: '123' } });
    fireEvent.click(screen.getByText(/Buscar/i));
    expect(axios.get).toHaveBeenCalled();
  });
}); 