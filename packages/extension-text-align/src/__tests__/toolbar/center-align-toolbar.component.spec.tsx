import { CenterAlignToolbarButton } from '../../toolbar';
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

describe('Text align center toolbar button', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should set text align center on click', () => {
    const editor = new FakeEditor() as any;

    render(<CenterAlignToolbarButton.Button editor={editor} config={{ types: ['paragraph'] }} />);

    const button = screen.getByTestId('text-align-center-button');
    fireEvent.click(button);

    expect(editor.chain).toHaveBeenCalledTimes(1);
    expect(editor.focus).toHaveBeenCalledTimes(1);
    expect(editor.setTextAlign).toHaveBeenCalledTimes(2);
    expect(editor.setTextAlign).toHaveBeenCalledWith('center');
    expect(editor.run).toHaveBeenCalledTimes(1);
  });

  it('should disable when it cannot toggle text align center', () => {
    const editor = new FakeEditor() as any;
    editor.setTextAlign = jest.fn().mockReturnValue(false);

    render(<CenterAlignToolbarButton.Button editor={editor} config={{ types: ['paragraph'] }} />);

    const button = screen.getByTestId('text-align-center-button');
    expect(button).toBeDisabled();
  });

  it('should not text align center on click if disabled', () => {
    const editor = new FakeEditor() as any;
    editor.setTextAlign = jest.fn().mockReturnValue(false);

    render(<CenterAlignToolbarButton.Button editor={editor} config={{ types: ['paragraph'] }} />);

    const button = screen.getByTestId('text-align-center-button');
    fireEvent.click(button);

    expect(editor.chain).toHaveBeenCalledTimes(0);
    expect(editor.focus).toHaveBeenCalledTimes(0);
    expect(editor.setTextAlign).toHaveBeenCalledTimes(1);
    expect(editor.run).toHaveBeenCalledTimes(0);
  });

  it('should have active class when active', () => {
    const editor = new FakeEditor() as any;
    editor.isActive = jest.fn().mockReturnValue(true);

    render(<CenterAlignToolbarButton.Button editor={editor} config={{ types: ['paragraph'] }} />);

    const button = screen.getByTestId('text-align-center-button');
    const classNamesAmount = button.className.split(' ').length;
    expect(classNamesAmount).toBe(2);
  });

  it('should not have active class when not active', () => {
    const editor = new FakeEditor() as any;
    editor.isActive = jest.fn().mockReturnValue(false);

    render(<CenterAlignToolbarButton.Button editor={editor} config={{ types: ['paragraph'] }} />);

    const button = screen.getByTestId('text-align-center-button');
    const classNamesAmount = button.className.split(' ').length;
    expect(classNamesAmount).toBe(1);
  });
});
