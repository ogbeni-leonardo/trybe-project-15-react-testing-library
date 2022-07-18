import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

import renderWithRouter from './utils/renderWithRouter';

test('A página contém botões de seleção por tipo de pokémon', () => {
  renderWithRouter(<App />);

  const pokedexTitle = screen.getByRole('heading', { name: 'Encountered pokémons' });
  expect(pokedexTitle).toBeInTheDocument();

  const typeButtons = screen.getAllByTestId('pokemon-type-button');
  const TYPE_BUTTONS_SIZE = 7;
  expect(typeButtons).toHaveLength(TYPE_BUTTONS_SIZE);
});

test('A função chamada pelo botão "All" tem o argumento correto', () => {
  renderWithRouter(<App />);

  const allButton = screen.getByRole('button', { name: 'All' });
  userEvent.click(allButton);

  expect(screen.getByTestId('pokemon-name')).toBeInTheDocument();
});

test('O botão dos tipos mostra o nome tipo no texto do botão', () => {
  renderWithRouter(<App />);

  const typeButtons = screen.getAllByTestId('pokemon-type-button');
  typeButtons.forEach((button) => {
    expect(button).not.toHaveTextContent('');
  });
});
