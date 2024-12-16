import { render, screen, fireEvent } from '@testing-library/react';
import ModalEditarUsuario from './ModalEditarUsuario';
import axios from 'axios';

jest.mock('axios');

describe('ModalEditarUsuario', () => {
  const onClose = jest.fn();
  const onUserUpdated = jest.fn();
  const usuario = { _id: '1', username: 'testuser', nombre: 'Test', apellido: 'User', email: 'test@example.com' };

  beforeEach(() => {
    render(<ModalEditarUsuario isOpen={true} onClose={onClose} usuario={usuario} onUserUpdated={onUserUpdated} />);
  });

  test('should render modal when open', () => {
    expect(screen.getByText(/Editar Usuario/i)).toBeInTheDocument();
  });

  test('should show error message when form is submitted without username', async () => {
    fireEvent.click(screen.getByText(/Actualizar Usuario/i));
    expect(await screen.findByText(/Error al actualizar usuario/i)).toBeInTheDocument();
  });

  test('should call onUserUpdated when user is updated successfully', async () => {
    axios.put.mockResolvedValueOnce({ data: { msg: 'Usuario actualizado con éxito' } });
    
    fireEvent.change(screen.getByLabelText(/Username:/i), { target: { value: 'updateduser' } });
    fireEvent.click(screen.getByText(/Actualizar Usuario/i));
    
    expect(await screen.findByText(/Usuario actualizado con éxito/i)).toBeInTheDocument();
    expect(onUserUpdated).toHaveBeenCalled();
  });
}); 