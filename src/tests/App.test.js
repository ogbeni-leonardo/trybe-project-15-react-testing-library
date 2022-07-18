import React from 'react';
import { screen } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import App from '../App';

import renderWithRouter from './utils/renderWithRouter';

test('Se o topo da aplicação contém links fixos', () => {
  renderWithRouter(<App />);

  const links = ['Home', 'About', 'Favorite Pokémons'];
  links.forEach((link) => {
    const linkTo = screen.getByRole('link', { name: link });
    expect(linkTo).toBeInTheDocument();
  });
});

test(
  'Ao clicar no link "Home" a aplicação é redirecionada para a página inicial',
  () => {
    const { history } = renderWithRouter(<App />);

    const linkToHome = screen.getByRole('link', { name: 'Home' });
    UserEvent.click(linkToHome);

    expect(history.location.pathname).toBe('/');
  },
);

test(
  'Ao clicar no link "About" a aplicação é redirecionada para a página de sobre',
  () => {
    const { history } = renderWithRouter(<App />);

    const linkToHome = screen.getByRole('link', { name: 'About' });
    UserEvent.click(linkToHome);

    expect(history.location.pathname).toBe('/about');
  },
);

test(
  `Ao clicar no link "Favorite Pokémons" a aplicação é redirecionada para a 
    página de favoritos`,
  () => {
    const { history } = renderWithRouter(<App />);

    const linkToHome = screen.getByRole('link', { name: 'Favorite Pokémons' });
    UserEvent.click(linkToHome);

    expect(history.location.pathname).toBe('/favorites');
  },
);

test(
  `A aplicação deve ser redirecionada para a página "Not Found" ao entrar
    em uma URL desconhecida`,
  () => {
    const { history } = renderWithRouter(<App />);
    history.push('/rota-desconhecida');

    const notFoundImage = screen
      .getByAltText('Pikachu crying because the page requested was not found');

    expect(notFoundImage).toBeInTheDocument();
  },
);
