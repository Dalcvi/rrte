import { LeftAlignToolbarButton } from '../../toolbar';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FakeEditor from '../editor.mock';
jest.mock('../editor.mock', () => {
  return jest.fn().mockImplementation(() => {
    return {
      setTextAlign: jest.fn().mockReturnThis(),
      chain: jest.fn().mockReturnThis(),
      run: jest.fn().mockReturnThis(),
      focus: jest.fn().mockReturnThis(),
      can: jest.fn().mockReturnThis(),
      isActive: jest.fn().mockReturnValue(false),
    };
  });
});

describe('Text align left toolbar button', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should set text align left on click', () => {
    const editor = new FakeEditor() as any;

    render(<LeftAlignToolbarButton.Button editor={editor} config={{ types: ['paragraph'] }} />);

    const button = screen.getByTestId('text-align-left-button');
    fireEvent.click(button);

    expect(editor.chain).toHaveBeenCalledTimes(1);
    expect(editor.focus).toHaveBeenCalledTimes(1);
    expect(editor.setTextAlign).toHaveBeenCalledTimes(2);
    expect(editor.setTextAlign).toHaveBeenCalledWith('left');
    expect(editor.run).toHaveBeenCalledTimes(1);
  });

  it('should disable when it cannot toggle text align left', () => {
    const editor = new FakeEditor() as any;
    editor.setTextAlign = jest.fn().mockReturnValue(false);

    render(<LeftAlignToolbarButton.Button editor={editor} config={{ types: ['paragraph'] }} />);

    const button = screen.getByTestId('text-align-left-button');
    expect(button).toBeDisabled();
  });

  it('should not text align left on click if disabled', () => {
    const editor = new FakeEditor() as any;
    editor.setTextAlign = jest.fn().mockReturnValue(false);

    render(<LeftAlignToolbarButton.Button editor={editor} config={{ types: ['paragraph'] }} />);

    const button = screen.getByTestId('text-align-left-button');
    fireEvent.click(button);

    expect(editor.chain).toHaveBeenCalledTimes(0);
    expect(editor.focus).toHaveBeenCalledTimes(0);
    expect(editor.setTextAlign).toHaveBeenCalledTimes(1);
    expect(editor.run).toHaveBeenCalledTimes(0);
  });

  it('should have active class when active', () => {
    const editor = new FakeEditor() as any;
    editor.isActive = jest.fn().mockReturnValue(true);

    render(<LeftAlignToolbarButton.Button editor={editor} config={{ types: ['paragraph'] }} />);

    const button = screen.getByTestId('text-align-left-button');
    const classNamesAmount = button.className.split(' ').length;
    expect(classNamesAmount).toBe(2);
  });

  it('should not have active class when not active', () => {
    const editor = new FakeEditor() as any;
    editor.isActive = jest.fn().mockReturnValue(false);

    render(<LeftAlignToolbarButton.Button editor={editor} config={{ types: ['paragraph'] }} />);

    const button = screen.getByTestId('text-align-left-button');
    const classNamesAmount = button.className.split(' ').length;
    expect(classNamesAmount).toBe(1);
  });
});
