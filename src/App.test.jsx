import { render, screen } from '@testing-library/react';
import App from './App';
import { AuthProvider } from './context/AuthProvider';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';

describe('App', () => {
  it('should render the layout component', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    );
    
    expect(screen.getByText(/Registro de Usuario/i)).toBeInTheDocument(); // Asegúrate de que este texto esté presente en el Layout
  });

  it('should render the login page', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    );

    expect(screen.getByText(/Iniciar sesión/i)).toBeInTheDocument(); // Asegúrate de que este texto esté presente en la página de login
  });

  // Puedes agregar más pruebas según sea necesario
}); 