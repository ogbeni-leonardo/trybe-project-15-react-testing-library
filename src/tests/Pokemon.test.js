import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import data from '../data';
import renderWithRouter from './utils/renderWithRouter';
import Pokemon from '../components/Pokemon';

const pokemonParams = {
  pokemon: data[0],
  showDetailsLink: true,
  isFavorite: true,
};

test('A página renderiza os dados de um determinado pokémon', () => {
  renderWithRouter(<Pokemon { ...pokemonParams } />);

  const pikachuImage = screen.getByAltText('Pikachu sprite');

  expect(pikachuImage).toBeInTheDocument();
  expect(pikachuImage.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');

  expect(screen.getByText('Pikachu')).toBeInTheDocument();
  expect(screen.getByText('Electric')).toBeInTheDocument();
  expect(screen.getByText('Average weight: 6.0 kg')).toBeInTheDocument();
});

test('O card contém o link para mais detalhes com a URL válida', () => {
  renderWithRouter(<Pokemon { ...pokemonParams } />);

  const detailsLink = screen.getByRole('link', { name: 'More details' });
  expect(detailsLink.href).toContain('/pokemons/25');
});

test(
  'Ao clicar no link de detalhes a página é redirecionada para a página de'
    + 'detalhes do pokémon',
  () => {
    const { history } = renderWithRouter(<Pokemon { ...pokemonParams } />);

    const detailsLink = screen.getByRole('link', { name: 'More details' });
    userEvent.click(detailsLink);

    expect(history.location.pathname).toBe('/pokemons/25');
  },
);

test('Existe um ícone de estrela no pokémon favoritado', () => {
  renderWithRouter(<Pokemon { ...pokemonParams } />);

  const starImage = screen.getByAltText('Pikachu is marked as favorite');
  expect(starImage).toBeInTheDocument();
  expect(starImage.src).toContain('/star-icon.svg');
});
