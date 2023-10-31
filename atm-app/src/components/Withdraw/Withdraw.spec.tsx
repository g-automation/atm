import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Withdraw from '.';
import * as atmService from '../../services/atm';

jest.mock('../../services/atm');

describe('Withdraw Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle the withdraw process correctly', async () => {
    const fakeResponse = {
      banknotes: { '100': 1, '50': 1 },
      balance: 350,
    };
    (atmService.withdraw as jest.Mock).mockResolvedValue(fakeResponse);

    render(<Withdraw />);

    fireEvent.change(screen.getByPlaceholderText(/enter account number/i), {
      target: { value: '12345' },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter amount/i), {
      target: { value: '150' },
    });

    fireEvent.click(screen.getByRole('button', { name: /withdraw/i }));

    expect(atmService.withdraw).toHaveBeenCalledWith({
      accountNumber: '12345',
      amount: 150,
    });

    expect(screen.getByText('100 : 1')).toBeInTheDocument();
    expect(screen.getByText('50 : 1')).toBeInTheDocument();
    expect(screen.getByText(/balance:/i)).toHaveTextContent('R$ 350,00');
  });

  it('should display an error message if the withdraw process fails', async () => {
    (atmService.withdraw as jest.Mock).mockRejectedValue('Error message');

    render(<Withdraw />);

    fireEvent.click(screen.getByRole('button', { name: /withdraw/i }));

    const errorMessage = await screen.findByText(/error:/i);

    expect(errorMessage).toBeInTheDocument();
  });
});
