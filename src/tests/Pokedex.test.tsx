import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <Pokedex.tsx />', () => {
  it('1- Testa se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);

    expect(screen.getByText(/Encountered Pokémon/i)).toBeInTheDocument();
  });

  it('2- Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado:', async () => {
    renderWithRouter(<App />);

    const next = screen.getByRole('button', { name: /Próximo Pokémon/i });

    await next.click();
    expect(screen.getByText(/charmander/i)).toBeInTheDocument();

    await next.click();
    expect(screen.getByText(/caterpie/i)).toBeInTheDocument();

    await next.click();
    expect(screen.getByText(/ekans/i)).toBeInTheDocument();

    await next.click();
    expect(screen.getByText(/alakazam/i)).toBeInTheDocument();
  });

  it('3- Testa se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);

    expect(screen.getAllByText('Próximo Pokémon').length).toBe(1);
  });

  it('4- Teste se a Pokédex tem os botões de filtro:', async () => {
    renderWithRouter(<App />);

    expect(screen.getAllByTestId('pokemon-type-button').length).toBe(7);
    expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();

    const btn = screen.getByRole('button', { name: /psychic/i });
    expect(btn).toBeInTheDocument();

    await btn.click();
    expect(screen.getByText(/alakazam/i)).toBeInTheDocument();

    const allBtn = screen.getByRole('button', { name: /all/i });
    await userEvent.click(allBtn);
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  });
});
