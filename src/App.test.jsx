import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Webthuldra Market app name in footer', () => {
  render(<App />);
  const nameInFooter = screen.getByText('Webthuldra © 2021');
  expect(nameInFooter).toBeInTheDocument();
});

test('renders /users/my-profile in navbar', () => {
  render(<App />);
  const anchorElement = screen.getByText('Perfil').closest('a');
  expect(anchorElement).toHaveAttribute('href', '/users/my-profile');
});

test('renders Webthuldra Market /stores in navbar', () => {
  render(<App />);
  const anchorElement = screen.getByText('Tiendas').closest('a');
  expect(anchorElement).toHaveAttribute('href', '/stores');
});
