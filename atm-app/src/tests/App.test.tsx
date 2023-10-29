import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders App', () => {
  render(<App data-testid="App" />);
  const app = screen.getAllByTestId('App');
  expect(app).toBeInTheDocument();
});
