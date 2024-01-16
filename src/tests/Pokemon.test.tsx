import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <Pokemon.tsx />', () => {
  it('1- Testa se é renderizado um card com as informações de determinado Pokémon:', () => {
    renderWithRouter(<App />);

    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    expect(screen.getByTestId('pokemon-type').innerHTML).toBe('Electric');
    expect(screen.getByTestId('pokemon-weight').innerHTML).toBe('Average weight: 6.0 kg');
    expect(screen.getByRole('img', { name: /pikachu sprite/i })).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
    expect(screen.getByRole('img', { name: /pikachu sprite/i })).toHaveAttribute('alt', 'Pikachu sprite');
  });

  it('2- Testa se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes desse Pokémon. O link deve ter a URL /pokemon/<id>, em que <id> é o id do Pokémon exibido.', async () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /More details/i });
    await moreDetails.click();

    expect(window.location.pathname).toBe('/pokemon/25');
  });

  it('3- Testa se existe um ícone de estrela nos Pokémon favoritados:', async () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /More details/i });
    await moreDetails.click();

    const check = screen.getByRole('checkbox', { name: /Pokémon favoritado?\?/i });
    await check.click();

    expect(screen.getByRole('img', { name: /pikachu is marked as favorite/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /pikachu is marked as favorite/i })).toHaveAttribute('src', '/star-icon.png');
  });
});
