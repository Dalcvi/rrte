import { Toolbar } from '../toolbar';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { SingleToolbarItem } from '../toolbar.types';
import { i18nContext } from '@rrte/i18n';

describe('toolbar', () => {
  it('should correctly prioritize items', () => {
    const firstItem: { toolbar: SingleToolbarItem<any>; config: any } = {
      toolbar: {
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
      },
      config: {},
    };
    const secondItem: { toolbar: SingleToolbarItem<any>; config: any } = {
      toolbar: {
        name: 'btn-second-place',
        type: 'dropdown' as const,
        priority: 2,
        text: 'second-place',
        dropdownName: 'second-place',
        DropdownPriority: 1,
        values: [],
        group: {
          name: 'group-2',
          text: 'group-2',
          priority: 6,
          toolbar: 'main',
        },
      },
      config: {},
    };
    const thirdItem: { toolbar: SingleToolbarItem<any>; config: any } = {
      toolbar: {
        name: 'btn-third-place',
        type: 'input-icon',
        priority: 3,
        text: 'third-place',
        Icon: () => <div data-testid="third-place-button-icon"></div>,
        onChange: () => {},
        getAcceptableFiles: () => '',
        getIsDisabled: () => false,
        iconStyling: 'fill',
        group: {
          name: 'group-3',
          text: 'group-3',
          priority: 5,
          toolbar: 'main',
        },
      },
      config: {},
    };

    const fourthItem: { toolbar: SingleToolbarItem<any>; config: any } = {
      toolbar: {
        name: 'btn-fourth-place',
        type: 'color-selection',
        priority: 4,
        text: 'fourth-place',
        removeText: 'remove-fourth-place',
        Icon: () => <div data-testid="fourth-place-button-icon"></div>,
        onChange: () => {},
        getValue: () => '',
        getCanReset: () => false,
        onReset: () => {},
        getIsDisabled: () => false,
        group: {
          name: 'group-4',
          text: 'group-4',
          priority: 4,
          toolbar: 'main',
        },
      },
      config: {},
    };

    const fifthItem: { toolbar: SingleToolbarItem<any>; config: any } = {
      toolbar: {
        name: 'btn-fifth-place',
        type: 'modal',
        priority: 5,
        text: 'fifth-place',
        Icon: () => <div data-testid="fifth-place-button-icon"></div>,
        ModalContent: () => <div></div>,
        getIsDisabled: () => false,
        iconStyling: 'fill',
        group: {
          name: 'group-5',
          text: 'group-5',
          priority: 3,
          toolbar: 'main',
        },
      },
      config: {},
    };

    const sixthItem: { toolbar: SingleToolbarItem<any>; config: any } = {
      toolbar: {
        name: 'btn-sixth-place',
        type: 'number-control',
        priority: 6,
        text: 'sixth-place',
        decreaseText: 'decrease-sixth-place',
        increaseText: 'increase-sixth-place',
        getValue: () => 0,
        onChange: () => {},
        getIsDisabled: () => false,
        group: {
          name: 'group-6',
          text: 'group-6',
          priority: 2,
          toolbar: 'main',
        },
      },
      config: {},
    };

    const seventhItem: { toolbar: SingleToolbarItem<any>; config: any } = {
      toolbar: {
        name: 'btn-seventh-place',
        type: 'custom-logic',
        priority: 7,
        text: 'seventh-place',
        Component: () => <div data-testid="seventh-place-button-icon"></div>,
        group: {
          name: 'group-7',
          text: 'group-7',
          priority: 1,
          toolbar: 'main',
        },
      },
      config: {},
    };

    const container = document.createElement('div');

    render(
      <i18nContext.Provider value={{ t: (key: string) => key, language: 'en' }}>
        <Toolbar
          editor={null as any}
          items={[seventhItem, secondItem, sixthItem, firstItem, fifthItem, fourthItem, thirdItem]}
          editorContainerRef={container}
        />
      </i18nContext.Provider>
    );
    const toolbarListGroups = screen.queryAllByTestId('toolbar-list');

    const toolbarListItems = [
      ...toolbarListGroups?.map(group => [...group.querySelectorAll('li')]),
    ].flat();

    const firstToolbarItem = toolbarListItems[0].querySelector(
      '[data-testid=first-place-regular-button]'
    );
    const secondToolbarItem = toolbarListItems[1].querySelector(
      '[data-testid=second-place-dropdown-button]'
    );
    const thirdToolbarItem = toolbarListItems[2].querySelector(
      '[data-testid=third-place-input-icon-button]'
    );
    const fourthToolbarItem = toolbarListItems[3].querySelector(
      '[data-testid=fourth-place-color-selection-input]'
    );
    const fifthToolbarItem = toolbarListItems[4].querySelector(
      '[data-testid=fifth-place-modal-button]'
    );
    const sixthToolbarItem = toolbarListItems[5].querySelector(
      '[data-testid=sixth-place-number-control-input]'
    );
    const seventhToolbarItem = toolbarListItems[6].querySelector(
      '[data-testid=seventh-place-button-icon]'
    );

    expect(firstToolbarItem).toBeInTheDocument();
    expect(secondToolbarItem).toBeInTheDocument();
    expect(thirdToolbarItem).toBeInTheDocument();
    expect(fourthToolbarItem).toBeInTheDocument();
    expect(fifthToolbarItem).toBeInTheDocument();
    expect(sixthToolbarItem).toBeInTheDocument();
    expect(seventhToolbarItem).toBeInTheDocument();
  });
});
