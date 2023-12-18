import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from '.';

describe('Home Component', () => {
  test('renders Home with accounts and withdraw options', () => {
    render(<Home />);

    expect(screen.getByText(/accounts/i)).toBeInTheDocument();
    expect(screen.getByText(/withdraw/i)).toBeInTheDocument();
  });

  test('shows Accounts component when "Accounts" is clicked', () => {
    render(<Home />);

    const accountsButton = screen.getByText(/accounts/i);
    fireEvent.click(accountsButton);

    expect(screen.getByText(/Accounts Section/i)).toBeInTheDocument();
  });

  test('shows Withdraw component when "Withdraw" is clicked', () => {
    render(<Home />);

    const withdrawButton = screen.getByText(/withdraw/i);
    fireEvent.click(withdrawButton);

    expect(screen.getByText(/Withdraw Section/i)).toBeInTheDocument();
  });
});
