import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { i18nContext } from '@rrte/i18n';
import { ModalButton, ModalButtonConfig } from '../../modal-button';

const config: ModalButtonConfig = {
  name: 'modal-button',
  type: 'modal',
  priority: 5,
  text: 'modal-button',
  Icon: () => <div data-testid="modal-button-icon"></div>,
  ModalContent: () => <div data-testid="modal-content"></div>,
  getIsDisabled: () => false,
  iconStyling: 'fill',
  group: {
    name: 'group-5',
    text: 'group-5',
    priority: 3,
    toolbar: 'main',
  },
};

describe('modal button', () => {
  it('should render correct button', () => {
    render(
      <i18nContext.Provider value={{ t: (key: string) => key, language: 'en' }}>
        <ModalButton {...config} editor={null as any} config={{}} />
      </i18nContext.Provider>
    );

    expect(screen.getByTestId('modal-button-icon')).toBeInTheDocument();
  });

  it('should display modal content onClick', () => {
    render(
      <i18nContext.Provider value={{ t: (key: string) => key, language: 'en' }}>
        <ModalButton {...config} editor={null as any} config={{}} />
      </i18nContext.Provider>
    );

    const button = screen.getByTestId('modal-button-icon').parentElement;
    if (!button) {
      throw new Error('Button not found');
    }

    fireEvent.click(button);

    screen.getByTestId('modal-content');

    expect(screen.getByTestId('modal-content')).toBeInTheDocument();
  });

  it('should close display modal content on outside click', () => {
    const { container } = render(
      <i18nContext.Provider value={{ t: (key: string) => key, language: 'en' }}>
        <ModalButton {...config} editor={null as any} config={{}} />
      </i18nContext.Provider>
    );

    const button = screen.getByTestId('modal-button-icon').parentElement;
    if (!button) {
      throw new Error('Button not found');
    }

    fireEvent.click(button);

    screen.getByTestId('modal-content');

    expect(screen.getByTestId('modal-content')).toBeInTheDocument();

    fireEvent.click(container);

    expect(screen.queryByTestId('modal-content')).not.toBeInTheDocument();
  });

  it('should close display modal content on escape click', () => {
    const { container } = render(
      <i18nContext.Provider value={{ t: (key: string) => key, language: 'en' }}>
        <ModalButton {...config} editor={null as any} config={{}} />
      </i18nContext.Provider>
    );

    const button = screen.getByTestId('modal-button-icon').parentElement;
    if (!button) {
      throw new Error('Button not found');
    }

    fireEvent.click(button);

    screen.getByTestId('modal-content');

    expect(screen.getByTestId('modal-content')).toBeInTheDocument();

    fireEvent.keyDown(container, { key: 'Escape', code: 'Escape', charCode: 27 });

    expect(screen.queryByTestId('modal-content')).not.toBeInTheDocument();
  });

  it('should open display modal content on arrow down click when focused', () => {
    render(
      <i18nContext.Provider value={{ t: (key: string) => key, language: 'en' }}>
        <ModalButton {...config} editor={null as any} config={{}} />
      </i18nContext.Provider>
    );

    const button = screen.getByTestId('modal-button-icon').parentElement;
    if (!button) {
      throw new Error('Button not found');
    }

    button.focus();

    fireEvent.keyDown(button, { key: 'ArrowDown', code: 'ArrowDown', charCode: 40 });

    screen.getByTestId('modal-content');

    expect(screen.getByTestId('modal-content')).toBeInTheDocument();
  });

  it('should call getIsDisabled when disabled', () => {
    const getIsDisabled = jest.fn().mockReturnValue(true);
    render(
      <i18nContext.Provider value={{ t: (key: string) => key, language: 'en' }}>
        <ModalButton {...config} editor={null as any} config={{}} getIsDisabled={getIsDisabled} />
      </i18nContext.Provider>
    );

    expect(screen.getByTestId('modal-button-icon').parentElement).toBeDisabled();
  });
});
