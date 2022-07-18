import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';

import renderWithRouter from './utils/renderWithRouter';

test('Se a mensagem dá página está sendo exibida', () => {
  renderWithRouter(<NotFound />);

  const message = screen
    .getByRole('heading', { name: 'Page requested not found Crying emoji' });

  expect(message).toBeInTheDocument();
});

test('A imagem da página está sendo carregada', () => {
  renderWithRouter(<NotFound />);

  const alt = 'Pikachu crying because the page requested was not found';
  const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

  const image = screen.getByAltText(alt);
  expect(image.src).toBe(src);
});
