import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import data from '../data';
import { Pokemon } from '../components';
import renderWithRouter from './utils/renderWithRouter';

test('Ao carregar a página do Pokémon verifique se o tipo dele é exibido', () => {
  renderWithRouter(
    <Pokemon pokemon={ data[0] } isFavorite={ false } showDetailsLink={ false } />,
  );

  const type = screen.getByTestId('pokemon-type');
  expect(type).toBeInTheDocument();
  expect(type).not.toHaveTextContent('');
});

test(
  `Ao clicar no link de detalhes do pokémon a aplicação é redirecionada 
  para a página de detalhes`,
  () => {
    const { history } = renderWithRouter(
      <Pokemon pokemon={ data[0] } isFavorite={ false } />,
    );

    const detailsLink = screen.getByRole('link', 'More details');
    userEvent.click(detailsLink);

    expect(history.location.pathname).toBe('/pokemons/25');
  },
);

test('A imagem do pokémon é exibida na tela', () => {
  renderWithRouter(
    <Pokemon pokemon={ data[0] } isFavorite={ false } showDetailsLink={ false } />,
  );

  const pokemonImage = screen.getByAltText('Pikachu sprite');
  expect(pokemonImage).toBeInTheDocument();
  expect(pokemonImage.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
});

test('Se o pokémon é um dos favoritos a imagem da estrela é exibida', () => {
  renderWithRouter(
    <Pokemon pokemon={ data[0] } isFavorite />,
  );

  const starImage = screen.getByAltText('Pikachu is marked as favorite');
  expect(starImage).toBeInTheDocument();
  expect(starImage.src).toContain('/star-icon.svg');
});
