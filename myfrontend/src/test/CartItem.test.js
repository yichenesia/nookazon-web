import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CartItem from '../CartItem';

const products = {"id": 1,"name": "Tom Nook", "price": 300, "img": "./assets/tom.png", "count" : 0, "tax": 0, "subtotal": 0, "linetotal": 0, "yousave": 0};

test('renders the number of items in cart', () => {
    const { getByText } = render(<CartItem data={products}/>);
    const linkElement = getByText(/Number in Cart: 0/i);
    expect(linkElement).toBeInTheDocument();
  });

test('renders the number of items in cart', () => {
    const { getByText } = render(<CartItem data={products}/>);
    const linkElement = getByText(/Number in Cart: 0/i);
    expect(linkElement).toBeInTheDocument();
    });

test('renders the price', () => {
    const { getByText } = render(<CartItem data={products}/>);
    const linkElement = getByText(/Price: /i);
    expect(linkElement).toBeInTheDocument();
    });

test('renders the add to cart button', () => {
    const { getByText } = render(<CartItem data={products}/>);
    const linkElement = getByText(/Add to Cart/i);
    expect(linkElement).toBeInTheDocument();
    });

test('renders the remove from cart button', () => {
    const { getByText } = render(<CartItem data={products}/>);
    const linkElement = getByText(/Remove from Cart/i);
    expect(linkElement).toBeInTheDocument();
    });