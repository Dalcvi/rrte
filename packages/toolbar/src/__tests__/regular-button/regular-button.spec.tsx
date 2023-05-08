import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RegularButton } from '../../regular-button';

describe('regular button', () => {
  it('should render correct button', () => {
    const Button = () => <button data-testid="correct-button">test</button>;
    const props = { Button } as any;
    render(<RegularButton {...props} />);

    expect(screen.getByTestId('correct-button')).toBeInTheDocument();
  });
});
