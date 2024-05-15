import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Dropdown, DropdownConfig } from '../../dropdown';
import React from 'react';
import { i18nContext } from '@rrte/i18n';

const config: DropdownConfig = {
  name: 'dropdown-btn',
  type: 'dropdown' as const,
  priority: 2,
  text: 'dropdown-btn',
  dropdownName: 'dropdown-btn',
  DropdownPriority: 1,
  values: [
    {
      name: 'last',
      text: 'last',
      belongsTo: 'dropdown-btn',
      isActive: () => false,
      onClick: () => {},
      getIsDisabled: () => false,
      priority: 1,
    },
    {
      name: 'first',
      text: 'first',
      belongsTo: 'dropdown-btn',
      isActive: () => false,
      onClick: () => {},
      getIsDisabled: () => false,
      priority: 2,
    },
  ],
  group: {
    name: 'group-2',
    text: 'group-2',
    priority: 6,
    toolbar: 'main',
  },
};

describe('dropdown', () => {
  it('should render the dropdown button', () => {
    render(
      <i18nContext.Provider value={{ t: (key: string) => key, language: 'en' }}>
        <Dropdown {...config} configs={{}} editor={null as any} />
      </i18nContext.Provider>
    );

    expect(screen.getByTestId(`${config.text}-dropdown-button`)).toBeInTheDocument();
  });

  it('should render values in correct priority', () => {
    render(
      <i18nContext.Provider value={{ t: (key: string) => key, language: 'en' }}>
        <Dropdown {...config} configs={{}} editor={null as any} />
      </i18nContext.Provider>
    );

    const button = screen.getByTestId(`${config.text}-dropdown-button`);
    fireEvent.click(button);

    const dropdownItems = [
      ...screen.getByTestId(`${config.text}-dropdown-items`).querySelectorAll('li'),
    ];

    const firstItem = dropdownItems[0].querySelector('[data-testid=first-dropdown-item-0]');
    const secondItem = dropdownItems[1].querySelector('[data-testid=last-dropdown-item-1]');

    expect(firstItem).toBeInTheDocument();
    expect(secondItem).toBeInTheDocument();
  });

  it('should call onClick when clicking on a value', () => {
    const onClick = jest.fn();

    const newConfig = {
      ...config,
      values: [
        {
          name: 'first',
          text: 'first',
          belongsTo: 'dropdown-btn',
          isActive: () => false,
          onClick,
          getIsDisabled: () => false,
          priority: 1,
        },
      ],
    };

    render(
      <i18nContext.Provider value={{ t: (key: string) => key, language: 'en' }}>
        <Dropdown {...newConfig} configs={{}} editor={null as any} />
      </i18nContext.Provider>
    );

    const button = screen.getByTestId(`${config.text}-dropdown-button`);

    fireEvent.click(button);

    screen.getByTestId('first-dropdown-item-0').click();

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should check if value is disabled', () => {
    const getIsDisabled = jest.fn().mockReturnValue(true);

    const newConfig = {
      ...config,
      values: [
        {
          name: 'first',
          text: 'first',
          belongsTo: config.name,
          isActive: () => false,
          onClick: () => {},
          getIsDisabled,
          priority: 1,
        },
        {
          name: 'second',
          text: 'second',
          belongsTo: config.name,
          isActive: () => false,
          onClick: () => {},
          getIsDisabled: () => false,
          priority: 1,
        },
      ],
    };

    render(
      <i18nContext.Provider value={{ t: (key: string) => key, language: 'en' }}>
        <Dropdown {...newConfig} configs={{}} editor={null as any} />
      </i18nContext.Provider>
    );

    const button = screen.getByTestId(`${config.text}-dropdown-button`);

    fireEvent.click(button);

    const firstItem = screen.getByTestId('first-dropdown-item-0');

    expect(firstItem).toBeDisabled();
  });
  it('should check if all values are active', () => {
    const isActive = jest.fn().mockReturnValue(true);

    const newConfig = {
      ...config,
      values: [
        {
          name: 'first',
          text: 'first',
          belongsTo: config.name,
          isActive,
          onClick: () => {},
          getIsDisabled: () => false,
          priority: 1,
        },
        {
          name: 'second',
          text: 'second',
          belongsTo: config.name,
          isActive,
          onClick: () => {},
          getIsDisabled: () => false,
          priority: 1,
        },
      ],
    };

    render(
      <i18nContext.Provider value={{ t: (key: string) => key, language: 'en' }}>
        <Dropdown {...newConfig} configs={{}} editor={null as any} />
      </i18nContext.Provider>
    );

    expect(isActive).toHaveBeenCalledTimes(2);
  });
});
