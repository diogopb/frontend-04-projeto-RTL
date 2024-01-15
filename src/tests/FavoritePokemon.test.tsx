import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import { FavoritePokemon } from '../pages';

describe('Testa o componente <FavoritePokemon.tsx />', () => {
  it('1- É exibida na tela a mensagem No favorite pokemon found caso a pessoa não tenha Pokémon favorito.', () => {
    renderWithRouter(<FavoritePokemon />);

    expect(screen.getByText(/No favorite pokémon found/i)).toBeInTheDocument();
  });

  it('2- Testa se apenas são exibidos os Pokémon favoritados.', async () => {
    renderWithRouter(<App />, { route: '/pokemon/4' });

    const check = screen.getByRole('checkbox', { name: /Pokémon favoritado?\?/i });
    await check.click();
    await userEvent.click(screen.getByRole('link', { name: /favorite pokémon/i }));
    expect(screen.getByText('Charmander')).toBeInTheDocument();
  });
});
