import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';

test('renders the title Nookazon', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Nookazon/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders the checkout button', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Checkout/i);
  expect(linkElement).toBeInTheDocument();
});
