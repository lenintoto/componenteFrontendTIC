import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Layout from './Layout';

describe('Layout', () => {
  test('renders layout with sidebar and navbar', () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );

    expect(screen.getByText(/Dpto. Control de Bienes/i)).toBeInTheDocument();
    expect(screen.getByText(/Cerrar Sesión/i)).toBeInTheDocument();
  });
}); 