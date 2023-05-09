import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Dropdown } from '../../dropdown';

const config = {
  name: 'correct-config',
  type: 'dropdown',
  text: 'correct-config',
  DropdownPriority: 100,
  priority: 1,
  values: [
    {
      name: 'correct-value-last',
      text: 'correct-value-last',
      priority: 1,
      isActive: () => false,
    },
    {
      name: 'correct-value-first',
      text: 'correct-value-first',
      priority: 2,
      isActive: () => false,
    },
  ],
  editor: {
    isActive: () => true,
  },
} as any;

describe('dropdown', () => {
  it('should render the values in correct priority', () => {
    render(<Dropdown {...config} />);

    expect(screen.getByTestId('correct-config')).toBeInTheDocument();
  });

  it('should render values in correct priority', () => {
    render(<Dropdown {...config} />);

    const button = screen.getByTestId('correct-config');
    fireEvent.click(button);

    const values = screen.getAllByTestId('correct-value', { exact: false });
    const firstValueTestId = values[0].getAttribute('data-testid');
    const secondValueTestId = values[1].getAttribute('data-testid');

    expect(firstValueTestId).toBe('correct-value-first');
    expect(secondValueTestId).toBe('correct-value-last');
  });
});
