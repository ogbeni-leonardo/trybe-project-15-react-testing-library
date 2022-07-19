import React from 'react';
import { screen } from '@testing-library/react';

import About from '../pages/About';
import renderWithRouter from './utils/renderWithRouter';

test('A página contém um heading com o texto "About Pokédex"', () => {
  renderWithRouter(<About />);

  const title = screen.getByRole('heading', { name: 'About Pokédex' });
  expect(title).toBeInTheDocument();
});

test('A página contém informações sobre a Pokédex', () => {
  renderWithRouter(<About />);

  const infos = [
    'This application simulates a Pokédex, a digital encyclopedia '
      + 'containing all Pokémons',
    'One can filter Pokémons by type, and see more details for each one of them',
  ];

  infos.forEach((info) => {
    const paragraph = screen.getByText(info);
    expect(paragraph).toBeInTheDocument();
  });
});

test('A imagem padrão dá página está sendo carregada', () => {
  renderWithRouter(<About />);
  const src = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
  const image = screen.getByAltText('Pokédex');

  expect(image).toBeInTheDocument();
  expect(image.src).toBe(src);
});
