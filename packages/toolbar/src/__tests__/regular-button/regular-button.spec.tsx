import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RegularButton, RegularButtonConfig } from '../../regular-button';
import React from 'react';
import { i18nContext } from '@rrte/i18n';

const config: RegularButtonConfig = {
  name: 'btn-first-place',
  type: 'icon' as const,
  priority: 1,
  text: 'first-place',
  Icon: () => <div data-testid="first-place-button-icon"></div>,
  onClick: () => {},
  getIsActive: () => false,
  getIsDisabled: () => false,
  iconStyling: 'fill',
  group: {
    name: 'group-1',
    text: 'group-1',
    priority: 7,
    toolbar: 'main',
  },
};

describe('regular button', () => {
  it('should render correct button', () => {
    render(
      <i18nContext.Provider value={{ t: (key: string) => key, language: 'en' }}>
        <RegularButton {...config} editor={null as any} config={{}} />
      </i18nContext.Provider>
    );

    expect(screen.getByTestId('first-place-button-icon')).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const onClick = jest.fn();
    render(
      <i18nContext.Provider value={{ t: (key: string) => key, language: 'en' }}>
        <RegularButton {...config} editor={null as any} config={{}} onClick={onClick} />
      </i18nContext.Provider>
    );

    screen.getByTestId('first-place-button-icon').parentElement?.click();

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should call getIsDisabled when disabled', () => {
    const getIsDisabled = jest.fn().mockReturnValue(true);
    render(
      <i18nContext.Provider value={{ t: (key: string) => key, language: 'en' }}>
        <RegularButton {...config} editor={null as any} config={{}} getIsDisabled={getIsDisabled} />
      </i18nContext.Provider>
    );

    expect(screen.getByTestId('first-place-button-icon').parentElement).toBeDisabled();
  });

  it('should call getIsActive', () => {
    const getIsActive = jest.fn().mockReturnValue(true);
    render(
      <i18nContext.Provider value={{ t: (key: string) => key, language: 'en' }}>
        <RegularButton {...config} editor={null as any} config={{}} getIsActive={getIsActive} />
      </i18nContext.Provider>
    );

    expect(getIsActive).toHaveBeenCalledTimes(1);
  });
});
