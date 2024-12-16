import { render, screen, fireEvent } from '@testing-library/react';
import NewPasswordPage from '../NewPasswordPage';
import React from 'react';
import axios from 'axios';
import { MemoryRouter, Route } from 'react-router-dom';

jest.mock('axios');

describe('NewPasswordPage', () => {
  test('should show success message on password update', async () => {
    const token = 'mockToken';
    axios.get.mockResolvedValue({});
    axios.post.mockResolvedValue({ data: { msg: 'Contraseña actualizada' } });

    render(
      <MemoryRouter initialEntries={[`/nuevo-password/${token}`]}>
        <Route path="/nuevo-password/:token">
          <NewPasswordPage />
        </Route>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Nueva Contraseña/i), { target: { value: 'newpassword' } });
    fireEvent.change(screen.getByLabelText(/Confirmar Contraseña/i), { target: { value: 'newpassword' } });
    fireEvent.click(screen.getByText(/Actualizar Contraseña/i));

    expect(await screen.findByText(/Contraseña actualizada/i)).toBeInTheDocument();
  });
}); 