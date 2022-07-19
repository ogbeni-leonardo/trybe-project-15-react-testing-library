import React from 'react';
import { screen } from '@testing-library/react';

import data from '../data';
import PokemonDetails from '../pages/PokemonDetails';
import renderWithRouter from './utils/renderWithRouter';

const detailsParams = {
  pokemons: data,
  match: {
    params: {
      id: '25',
    },
  },
  isPokemonFavoriteById: { 25: true },
  onUpdateFavoritePokemons: () => {},
};

test(
  'O título da página de detalhes é exibido corretamente com o nome do pokémon',
  () => {
    renderWithRouter(<PokemonDetails { ...detailsParams } />);

    const detailsTitle = screen.getByRole('heading', { name: 'Pikachu Details' });
    expect(detailsTitle).toBeInTheDocument();
  },
);

test('O sumário do pokémon é exibido corretamente', () => {
  renderWithRouter(<PokemonDetails { ...detailsParams } />);

  const summary = screen.getByText(data[0].summary);
  expect(summary).toBeInTheDocument();
});

test('Verifique se o título "Summary" está contigo na página', () => {
  renderWithRouter(<PokemonDetails { ...detailsParams } />);

  const summary = screen.getByRole('heading', { name: 'Summary' });
  expect(summary).toBeInTheDocument();
});

test('Verifique se o título "Game Locations of..." está contigo na página', () => {
  renderWithRouter(<PokemonDetails { ...detailsParams } />);

  const locationsTitle = screen
    .getByRole('heading', { name: 'Game Locations of Pikachu' });

  expect(locationsTitle).toBeInTheDocument();
});

test('Verifique se os mapas estão no documento', () => {
  renderWithRouter(<PokemonDetails { ...detailsParams } />);

  const maps = screen.getAllByAltText('Pikachu location');
  expect(maps).toHaveLength(2);

  maps.forEach((map) => {
    expect(map.alt).toBe('Pikachu location');
  });

  const map01Src = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
  const map02Src = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';

  expect(maps[0].src).toBe(map01Src);
  expect(maps[1].src).toBe(map02Src);
});

test('Verifique se a label "Pokémon favoritado?" existe', () => {
  renderWithRouter(<PokemonDetails { ...detailsParams } />);

  const checkbox = screen.getByLabelText('Pokémon favoritado?');
  expect(checkbox).toBeInTheDocument();
});
