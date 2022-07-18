import React from 'react';
import { screen } from '@testing-library/react';
import About from '../pages/About';

import renderWithRouter from './utils/renderWithRouter';

test('A página contém um heading com o texto "About Pokédex"', () => {
  renderWithRouter(<About />);

  const aboutTitle = screen.getByRole('heading', { name: 'About Pokédex' });
  expect(aboutTitle).toBeInTheDocument();
});

test('A imagem padrão dá página está sendo carregada', () => {
  renderWithRouter(<About />);
  const src = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
  const image = screen.getByAltText('Pokédex');

  expect(image.src).toBe(src);
});
