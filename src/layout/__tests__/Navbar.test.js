import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import Navbar from './Navbar';

const mockCerrarSesion = jest.fn();

describe('Navbar', () => {
  test('renders navbar and calls cerrarSesion on logout', () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ cerrarSesion: mockCerrarSesion }}>
          <Navbar />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Cerrar Sesión/i)).toBeInTheDocument();

    // Simular clic en "Cerrar Sesión"
    fireEvent.click(screen.getByText(/Cerrar Sesión/i));
    expect(mockCerrarSesion).toHaveBeenCalled();
  });
}); 