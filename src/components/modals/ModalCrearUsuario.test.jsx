import { render, screen, fireEvent } from '@testing-library/react';
import ModalCrearUsuario from './ModalCrearUsuario';
import axios from 'axios';
import { describe, it, expect } from 'vitest';

jest.mock('axios');

describe('ModalCrearUsuario', () => {
  const onClose = jest.fn();
  const onUserCreated = jest.fn();

  beforeEach(() => {
    render(<ModalCrearUsuario isOpen={true} onClose={onClose} onUserCreated={onUserCreated} />);
  });

  it('should render modal when open', () => {
    expect(screen.getByText(/Registro de Usuario/i)).toBeInTheDocument();
  });

  test('should show error message when form is submitted without username', async () => {
    fireEvent.click(screen.getByText(/Registrar Usuario/i));
    expect(await screen.findByText(/Error al crear usuario/i)).toBeInTheDocument();
  });

  test('should call onUserCreated when user is created successfully', async () => {
    axios.post.mockResolvedValueOnce({ data: { msg: 'Usuario creado con éxito' } });
    
    fireEvent.change(screen.getByLabelText(/Username:/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/Nombre:/i), { target: { value: 'Test' } });
    fireEvent.change(screen.getByLabelText(/Apellido:/i), { target: { value: 'User' } });
    fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: 'test@example.com' } });
    
    fireEvent.click(screen.getByText(/Registrar Usuario/i));
    
    expect(await screen.findByText(/Usuario creado con éxito/i)).toBeInTheDocument();
    expect(onUserCreated).toHaveBeenCalled();
  });
}); 