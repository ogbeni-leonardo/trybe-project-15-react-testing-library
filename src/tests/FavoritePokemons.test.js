import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../pages/FavoritePokemons';

import renderWithRouter from './utils/renderWithRouter';

test(
  'A página de favoritos mostra a mensagem correta quando não há pokemons favoritos',
  () => {
    renderWithRouter(<FavoritePokemons />);

    const paragraph = screen
      .getByText('No favorite pokemon found');

    expect(paragraph).toBeInTheDocument();
  },
);
