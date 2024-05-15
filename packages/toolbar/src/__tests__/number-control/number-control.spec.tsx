import { i18nContext } from '@rrte/i18n';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { NumberControl, NumberControlConfig } from '../../number-control';

const config: NumberControlConfig = {
  name: 'number-control',
  type: 'number-control',
  priority: 6,
  text: 'number-control',
  decreaseText: 'number-control-decrease',
  increaseText: 'number-control-increase',
  getValue: () => 1,
  onChange: () => {},
  getIsDisabled: () => false,
  group: {
    name: 'group-6',
    text: 'group-6',
    priority: 2,
    toolbar: 'main',
  },
};

describe('number control', () => {
  it('should render correct button', () => {
    render(
      <i18nContext.Provider value={{ t: (key: string) => key, language: 'en' }}>
        <NumberControl {...config} editor={null as any} />
      </i18nContext.Provider>
    );

    expect(screen.getByTestId('number-control')).toBeInTheDocument();
  });

  it('should call getValue', () => {
    const getValue = jest.fn();
    render(
      <i18nContext.Provider value={{ t: (key: string) => key, language: 'en' }}>
        <NumberControl {...config} editor={null as any} getValue={getValue} />
      </i18nContext.Provider>
    );

    expect(getValue).toHaveBeenCalledTimes(1);
  });

  it('should call onChange', () => {
    const onChange = jest.fn();
    render(
      <i18nContext.Provider value={{ t: (key: string) => key, language: 'en' }}>
        <NumberControl {...config} editor={null as any} onChange={onChange} />
      </i18nContext.Provider>
    );

    const section = screen.getByTestId('number-control');
    const buttons = section.querySelectorAll('button');

    buttons[0]?.click();

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('should call getIsDisabled', () => {
    const getIsDisabled = jest.fn().mockReturnValue(true);
    render(
      <i18nContext.Provider value={{ t: (key: string) => key, language: 'en' }}>
        <NumberControl {...config} editor={null as any} getIsDisabled={getIsDisabled} />
      </i18nContext.Provider>
    );

    const section = screen.getByTestId('number-control');
    const buttons = section.querySelectorAll('button');
    const input = section.querySelector('input');

    expect(buttons[0]).toBeDisabled();
    expect(buttons[1]).toBeDisabled();
    expect(input).toBeDisabled();
  });

  it('should increase value on increase click', () => {
    const getValue = jest.fn().mockReturnValue(1);
    const onChange = jest.fn();
    render(
      <i18nContext.Provider value={{ t: (key: string) => key, language: 'en' }}>
        <NumberControl {...config} editor={null as any} getValue={getValue} onChange={onChange} />
      </i18nContext.Provider>
    );

    const section = screen.getByTestId('number-control');
    const buttons = section.querySelectorAll('button');

    buttons[1].click();

    expect(onChange).toHaveBeenCalledWith({ editor: null, value: 2 });
  });

  it('should decrease value on decrease click', () => {
    const getValue = jest.fn().mockReturnValue(1);
    const onChange = jest.fn();
    render(
      <i18nContext.Provider value={{ t: (key: string) => key, language: 'en' }}>
        <NumberControl {...config} editor={null as any} getValue={getValue} onChange={onChange} />
      </i18nContext.Provider>
    );

    const section = screen.getByTestId('number-control');
    const buttons = section.querySelectorAll('button');

    buttons[0].click();

    expect(onChange).toHaveBeenCalledWith({ editor: null, value: 0 });
  });
});
