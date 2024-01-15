import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../pages';

describe('Testa o componente <NotFound.tsx />', () => {
  it('1- Testa se a página contém um heading h2 com o texto Page requested not found.', () => {
    renderWithRouter(<NotFound />);

    expect(screen.getByText('Page requested not found')).toBeInTheDocument();
  });

  it('Teste se a página mostra a imagem com o texto alternativo Clefairy pushing buttons randomly with text I have no idea what i am doing.', () => {
    renderWithRouter(<NotFound />);

    expect(screen.getByAltText(/clefairy pushing buttons randomly with text i have no idea what i'm doing/i)).toHaveAttribute('src', '/404.gif');
  });
});
