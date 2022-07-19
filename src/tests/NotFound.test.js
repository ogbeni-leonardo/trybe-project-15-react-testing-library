import React from 'react';
import { screen } from '@testing-library/react';

import NotFound from '../pages/NotFound';
import renderWithRouter from './utils/renderWithRouter';

test('Se a página contém um título com o texto "Page requested not found"', () => {
  renderWithRouter(<NotFound />);

  const message = screen.getByRole(
    'heading', { name: 'Page requested not found Crying emoji' },
  );

  expect(message).toBeInTheDocument();
});

test('A página mostra a imagem padrão', () => {
  renderWithRouter(<NotFound />);

  const image = screen.getByAltText(
    'Pikachu crying because the page requested was not found',
  );

  expect(image).toBeInTheDocument();
  expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
