import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import data from '../data';
import renderWithRouter from './utils/renderWithRouter';
import Pokedex from '../pages/Pokedex';

const pokedexParams = {
  pokemons: data,
  isPokemonFavoriteById: { 25: true, 4: false },
};

test('A página contém um heading com o texto "Encountered pokémons"', () => {
  renderWithRouter(<Pokedex { ...pokedexParams } />);

  const title = screen.getByRole('heading', { name: 'Encountered pokémons' });
  expect(title).toBeInTheDocument();
});

test('O próximo pokémon da lista é exibido ao clicar em "Próximo pokémon"', () => {
  renderWithRouter(<Pokedex { ...pokedexParams } />);

  const nextButton = screen.getByRole('button', { name: 'Próximo pokémon' });
  userEvent.click(nextButton);

  expect(screen.getByText('Charmander')).toBeInTheDocument();
});

test('A página mostra apenas um pokémon por vez', () => {
  renderWithRouter(<Pokedex { ...pokedexParams } />);

  const detailsLink = screen.getAllByRole('link', { name: 'More details' });
  expect(detailsLink).toHaveLength(1);
});

test('A pokédex tem os botões de filtro', () => {
  renderWithRouter(<Pokedex { ...pokedexParams } />);

  const typeButtons = screen.getAllByTestId('pokemon-type-button');
  const TYPES_LENGTH = 7;
  expect(typeButtons).toHaveLength(TYPES_LENGTH);
});

test('A pokédex contém um botão para resetar o filtro', () => {
  renderWithRouter(<Pokedex { ...pokedexParams } />);

  const allButton = screen.getByRole('button', { name: 'All' });
  expect(allButton).toBeInTheDocument();
});

test('Ao clicar no botão "All" o primeiro pokémon da lista é exibido', () => {
  renderWithRouter(<Pokedex { ...pokedexParams } />);

  const fireTypeButton = screen.getByRole('button', { name: 'Fire' });
  userEvent.click(fireTypeButton);

  const allButton = screen.getByRole('button', { name: 'All' });
  userEvent.click(allButton);

  expect(screen.getByText('Pikachu')).toBeInTheDocument();
});

test('Os botões de tipo não podem conter um texto vazio', () => {
  renderWithRouter(<Pokedex { ...pokedexParams } />);

  const typeButtons = screen.getAllByTestId('pokemon-type-button');

  typeButtons.forEach((button) => {
    expect(button).not.toHaveTextContent('');
  });
});
