import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../pages/FavoritePokemons';

import data from '../data';
import renderWithRouter from './utils/renderWithRouter';

test(
  'A página de favoritos mostra a mensagem correta quando não há pokémons favoritos',
  () => {
    renderWithRouter(<FavoritePokemons />);

    const paragraph = screen
      .getByText('No favorite pokemon found');

    expect(paragraph).toBeInTheDocument();
  },
);

test('Todos os pokémons favoritados são exibidos', () => {
  const pikachuAndCharmander = [data[0], data[1]];
  renderWithRouter(<FavoritePokemons pokemons={ pikachuAndCharmander } />);

  expect(screen.getByText('Pikachu')).toBeInTheDocument();
  expect(screen.getByText('Charmander')).toBeInTheDocument();
});
