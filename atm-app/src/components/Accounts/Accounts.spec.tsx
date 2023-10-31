import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Accounts from '.';
import * as atmService from '../../services/atm';

jest.mock('../../services/atm');

describe('Accounts Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch and display accounts', async () => {
    const fakeAccounts = [
      { accountNumber: '123', balance: 100 },
      { accountNumber: '456', balance: 200 },
    ];

    (atmService.getAccounts as jest.Mock).mockResolvedValue(fakeAccounts);

    render(<Accounts />);

    expect(atmService.getAccounts).toHaveBeenCalledTimes(1);

    const listItems = await screen.findAllByRole('listitem');

    expect(listItems).toHaveLength(2);
    expect(screen.getByText(/123/)).toBeInTheDocument();
    expect(screen.getByText(/456/)).toBeInTheDocument();
  });

  it('should handle create account button click', async () => {
    (atmService.createAccount as jest.Mock).mockResolvedValue({
      account: { accountNumber: '789', balance: 300 },
    });

    render(<Accounts />);

    fireEvent.click(screen.getByRole('button', { name: /create account/i }));

    expect(atmService.createAccount).toHaveBeenCalledTimes(1);
  });

  it('should display an error message if fetching accounts fails', async () => {
    (atmService.getAccounts as jest.Mock).mockRejectedValue('Error message');

    render(<Accounts />);

    const errorMessage = await screen.findByText(/error:/i);

    expect(errorMessage).toBeInTheDocument();
  });
});
