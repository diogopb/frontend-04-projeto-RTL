import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente <App.tsx />', () => {
  it('1- Testa se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />, { route: '/' });

    const home = screen.getByRole('link', { name: /home/i });
    expect(home).toBeInTheDocument();

    const about = screen.getByRole('link', { name: /about/i });
    expect(about).toBeInTheDocument();

    const favPokemon = screen.getByRole('link', { name: /Favorite Pokémon/i });
    expect(favPokemon).toBeInTheDocument();
  });

  it('2- Testa se a aplicação é redirecionada para a página inicial, na URL /, ao clicar no link Home da barra de navegação', () => {
    renderWithRouter(<App />, { route: '/' });

    const redirectHome = screen.getByRole('link', { name: /Home/i });
    redirectHome.click();
    expect(screen.getByText('Encountered Pokémon')).toBeInTheDocument();
  });

  it('3- Testa se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação.', async () => {
    renderWithRouter(<App />, { route: '/' });

    const redirectAbout = screen.getByRole('link', { name: /About/i });
    await redirectAbout.click();

    expect(screen.getByText('About Pokédex')).toBeInTheDocument();
  });

  it('4- Testa se a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação.', () => {
    renderWithRouter(<App />, { route: '/' });

    const redirectFavorites = screen.getByRole('link', { name: /Favorite Pokémon/i });
    redirectFavorites.click();

    expect(screen.getByText('Favorite Pokémon'));
  });

  it('5- Testa se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.', () => {
    renderWithRouter(<App />, { route: '/notfound' });

    expect(screen.getByText('This page was not found!')).toBeInTheDocument();
  });
});
