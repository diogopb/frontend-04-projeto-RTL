import { screen } from '@testing-library/react';
import { About } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente <About.tsx />.', () => {
  it('2- Testa se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />, { route: '/about' });

    expect(screen.getByText('About Pokédex')).toBeInTheDocument();
  });

  it('3- Testa se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />, { route: '/about' });

    expect(screen.getByText('This application simulates a Pokédex, a digital encyclopedia containing all Pokémon.')).toBeInTheDocument();
    expect(screen.getByText('One can filter Pokémon by type, and see more details for each one of them.')).toBeInTheDocument();
  });

  it('4- Testa se a página contém a seguinte imagem de uma Pokédex:', () => {
    renderWithRouter(<About />, { route: '/about' });

    expect(screen.getByAltText(/pokédex/i)).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
