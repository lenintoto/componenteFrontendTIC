import { render, screen, fireEvent } from '@testing-library/react';
import RecoverPasswordPage from '../RecoverPasswordPage';
import React from 'react';
import axios from 'axios';

jest.mock('axios');

describe('RecoverPasswordPage', () => {
  test('should show success message on valid email submission', async () => {
    axios.post.mockResolvedValue({ data: { msg: 'Email enviado' } });

    render(<RecoverPasswordPage />);

    fireEvent.change(screen.getByLabelText(/Email address/i), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByText(/Send Recovery Email/i));

    expect(await screen.findByText(/Email enviado/i)).toBeInTheDocument();
  });
}); 