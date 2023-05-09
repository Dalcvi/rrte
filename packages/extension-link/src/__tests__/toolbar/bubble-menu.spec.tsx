import { LinkBubbleMenu } from '../../toolbar';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FakeEditor from '../editor.mock';
jest.mock('../editor.mock', () => {
  return jest.fn().mockImplementation(() => {
    return {
      toggleLink: jest.fn().mockReturnThis(),
      chain: jest.fn().mockReturnThis(),
      run: jest.fn().mockReturnThis(),
      extendMarkRange: jest.fn().mockReturnThis(),
      updateAttributes: jest.fn().mockReturnThis(),
      state: {
        selection: {
          $from: {
            parent: {
              textContent: '',
            },
          },
        },
      },
      getAttributes: jest.fn().mockReturnValue({
        href: 'https://www.google.com',
      }),
      focus: jest.fn().mockReturnThis(),
      can: jest.fn().mockReturnThis(),
      isActive: jest.fn().mockReturnValue(false),
    };
  });
});

describe('Link bubble menu', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should display current url', () => {
    const editor = new FakeEditor() as any;

    render(<LinkBubbleMenu.Menu editor={editor} config={{}} />);

    const input = screen.getByTestId<HTMLInputElement>('link-input');

    expect(input.value).toBe('https://www.google.com');
  });

  it('should set url on change', () => {
    const editor = new FakeEditor() as any;

    render(<LinkBubbleMenu.Menu editor={editor} config={{}} />);

    const input = screen.getByTestId<HTMLInputElement>('link-input');

    fireEvent.change(input, { target: { value: 'https://www.youtube.com' } });

    expect(editor.chain).toHaveBeenCalledTimes(1);
    expect(editor.extendMarkRange).toHaveBeenCalledTimes(1);
    expect(editor.updateAttributes).toHaveBeenCalledWith('link', { href: 'https://www.youtube.com' });
    expect(editor.run).toHaveBeenCalledTimes(1);
  });

  describe('should not show bubble menu', () => {
    it('when link is not selected', () => {
      const editor = new FakeEditor() as any;
      editor.isActive = jest.fn().mockReturnValue(false);
      if (!LinkBubbleMenu.shouldShow) {
        throw new Error('shouldShow is not defined');
      }

      expect(LinkBubbleMenu.shouldShow({ editor: editor } as any)).toBe(false);
    });

    it('when there is 0 text content', () => {
      const editor = new FakeEditor() as any;
      editor.isActive = jest.fn().mockReturnValue(true);
      if (!LinkBubbleMenu.shouldShow) {
        throw new Error('shouldShow is not defined');
      }

      expect(LinkBubbleMenu.shouldShow({ editor: editor } as any)).toBe(false);
    });
  });

  it('should show bubble menu when link is selected and there is text content', () => {
    const editor = new FakeEditor() as any;
    editor.isActive = jest.fn().mockReturnValue(true);
    editor.state.selection.$from.parent.textContent = 'hello';
    if (!LinkBubbleMenu.shouldShow) {
      throw new Error('shouldShow is not defined');
    }

    expect(LinkBubbleMenu.shouldShow({ editor: editor } as any)).toBe(true);
  });
});
