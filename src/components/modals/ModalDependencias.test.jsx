import { render, screen, fireEvent } from '@testing-library/react';
import DependenciaModal from './ModalDependencias';
import axios from 'axios';
import { describe, it, expect } from 'vitest';

jest.mock('axios');

describe('DependenciaModal', () => {
  const onClose = jest.fn();
  const refreshDependencias = jest.fn();
  const dependencias = [{ _id: '1', nombre: 'Dependencia 1' }];

  beforeEach(() => {
    render(<DependenciaModal isOpen={true} onClose={onClose} dependencias={dependencias} refreshDependencias={refreshDependencias} />);
  });

  it('should render modal when open', () => {
    expect(screen.getByText(/Manage Dependencias/i)).toBeInTheDocument();
  });

  test('should show error message when adding empty dependencia', async () => {
    fireEvent.click(screen.getByText(/Agregar/i));
    expect(await screen.findByText(/El nombre de la dependencia es obligatorio/i)).toBeInTheDocument();
  });

  test('should call refreshDependencias when dependencia is added successfully', async () => {
    axios.post.mockResolvedValueOnce({ data: { msg: 'Dependencia agregada con éxito' } });
    
    fireEvent.change(screen.getByPlaceholderText(/Nueva Dependencia/i), { target: { value: 'Nueva Dependencia' } });
    fireEvent.click(screen.getByText(/Agregar/i));
    
    expect(await screen.findByText(/Dependencia agregada con éxito/i)).toBeInTheDocument();
    expect(refreshDependencias).toHaveBeenCalled();
  });
}); 