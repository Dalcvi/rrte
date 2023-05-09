import { Toolbar } from '../toolbar';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('toolbar', () => {
  it('should correctly prioritize items', () => {
    const firstItem = {
      toolbar: {
        name: 'btn-second-place',
        type: 'icon',
        priority: 2,
        Button: () => <div data-testid="second-button"></div>,
      },
      config: {},
    };
    const secondItem = {
      toolbar: {
        name: 'btn-third-place',
        type: 'icon',
        priority: 1,
        Button: () => <div data-testid="third-button"></div>,
      },
      config: {},
    };
    const thirdItem = {
      toolbar: {
        name: 'btn-first-place',
        type: 'icon',
        priority: 3,
        Button: () => <div data-testid="first-button"></div>,
      },
      config: {},
    };

    render(<Toolbar editor={null as any} items={[firstItem, secondItem, thirdItem] as any[]} />);
    const buttons = screen.getAllByTestId('-button', { exact: false });
    const firstPlaceTestId = buttons[0].getAttribute('data-testid');
    const secondPlaceTestId = buttons[1].getAttribute('data-testid');
    const thirdPlaceTestId = buttons[2].getAttribute('data-testid');
    expect(firstPlaceTestId).toBe('first-button');
    expect(secondPlaceTestId).toBe('second-button');
    expect(thirdPlaceTestId).toBe('third-button');
  });
});
