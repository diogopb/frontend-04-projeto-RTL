import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <PokemonDetails.tsx />', () => {
  it('1- Testa se as informações detalhadas do Pokémon selecionado são mostradas na tela:', () => {
    renderWithRouter(<App />, { route: '/pokemon/4' });

    expect(screen.getByRole('heading', { name: /charmander details/i })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /more details/i })).toBe(null);
    expect(screen.getByRole('heading', { name: /Summary/i })).toBeInTheDocument();
    expect(screen.getByText(/The flame on its tail shows the strength of its life force. If it is weak, the flame also burns weakly./i)).toBeInTheDocument();
  });

  it('2- Testa se existe na página uma seção com os mapas contendo as localizações do Pokémon:', () => {
    renderWithRouter(<App />, { route: '/pokemon/4' });

    expect(screen.getByRole('heading', { name: /Game locations of charmander/i })).toBeInTheDocument();

    const charmanderLoc = screen.getAllByAltText('Charmander location');
    expect(charmanderLoc).toHaveLength(4);

    const map0 = 'https://archives.bulbagarden.net/media/upload/9/93/Alola_Route_3_Map.png';
    expect(charmanderLoc[0]).toHaveAttribute('src', map0);

    const map1 = 'https://archives.bulbagarden.net/media/upload/4/4a/Kanto_Route_3_Map.png';
    expect(charmanderLoc[1]).toHaveAttribute('src', map1);

    const map2 = 'https://archives.bulbagarden.net/media/upload/2/24/Kanto_Route_4_Map.png';
    expect(charmanderLoc[2]).toHaveAttribute('src', map2);

    const map3 = 'https://archives.bulbagarden.net/media/upload/6/6f/Kanto_Rock_Tunnel_Map.png';
    expect(charmanderLoc[3]).toHaveAttribute('src', map3);
  });

  it('3- Testa se o usuário pode favoritar um Pokémon por meio da página de detalhes:', async () => {
    renderWithRouter(<App />, { route: '/pokemon/10' });

    const checkFav = screen.getByRole('checkbox', { name: /Pokémon favoritado?\?/i });
    expect(checkFav).toBeInTheDocument();
    expect(checkFav).not.toBeChecked();
    await checkFav.click();

    const isFavorite = screen.getByAltText(/Caterpie is marked as favorite/i);
    expect(isFavorite).toBeInTheDocument();
  });
});
