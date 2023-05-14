import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FakeEditor from './editor.mock';
import { BubbleMenuList } from '../bubble-menus';
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
    render(<BubbleMenuList editor={editor} list={bubbleMenuList} />);
  });
});
