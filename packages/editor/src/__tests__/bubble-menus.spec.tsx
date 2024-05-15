import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { BubbleMenuList } from '../bubble-menus';
import FakeEditor from './editor.mock';
import React from 'react';
import { i18nContext } from '@rrte/i18n';
jest.mock('./editor.mock', () => {
  return jest.fn().mockImplementation(() => {
    return {
      chain: jest.fn().mockReturnThis(),
      run: jest.fn().mockReturnThis(),
      focus: jest.fn().mockReturnThis(),
      can: jest.fn().mockReturnThis(),
      registerPlugin: jest.fn().mockReturnThis(),
      unregisterPlugin: jest.fn().mockReturnThis(),
      isActive: jest.fn().mockReturnValue(false),
    };
  });
});

describe('Bubble menus', () => {
  it('should render bubble menus', () => {
    const editor = new FakeEditor() as any;

    const bubbleMenuList = [
      {
        name: 'link',
        menu: {
          Menu: () => <div data-testid="bubble-item"></div>,
          shouldShow: () => {
            return true;
          },
        },
        config: {
          bubbleMenu: {
            Menu: () => <div data-testid="bubble-item"></div>,
            shouldShow: () => {
              return true;
            },
          },
        },
      },
    ];
    render(
      <i18nContext.Provider
        value={{
          language: 'en',
          t: (key: string) => key,
        }}
      >
        <BubbleMenuList editor={editor} list={bubbleMenuList} />
      </i18nContext.Provider>
    );
  });
});
