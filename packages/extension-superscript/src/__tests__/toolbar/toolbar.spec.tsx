import { ToolbarButton } from '../../toolbar';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FakeEditor from '../editor.mock';
jest.mock('../editor.mock', () => {
  return jest.fn().mockImplementation(() => {
    return {
      toggleSuperscript: jest.fn().mockReturnThis(),
      chain: jest.fn().mockReturnThis(),
      run: jest.fn().mockReturnThis(),
      focus: jest.fn().mockReturnThis(),
      can: jest.fn().mockReturnThis(),
      isActive: jest.fn().mockReturnValue(false),
    };
  });
});

describe('Superscript toolbar button', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should toggle superscript on click', () => {
    const editor = new FakeEditor() as any;

    render(<ToolbarButton.Button editor={editor} config={{}} />);

    const button = screen.getByTestId('superscript-button');
    fireEvent.click(button);

    expect(editor.chain).toHaveBeenCalledTimes(1);
    expect(editor.focus).toHaveBeenCalledTimes(1);
    expect(editor.toggleSuperscript).toHaveBeenCalledTimes(2);
    expect(editor.run).toHaveBeenCalledTimes(1);
  });

  it('should disable when it cannot toggle superscript', () => {
    const editor = new FakeEditor() as any;
    editor.toggleSuperscript = jest.fn().mockReturnValue(false);

    render(<ToolbarButton.Button editor={editor} config={{}} />);

    const button = screen.getByTestId('superscript-button');
    expect(button).toBeDisabled();
  });

  it('should not superscript on click if disabled', () => {
    const editor = new FakeEditor() as any;
    editor.toggleSuperscript = jest.fn().mockReturnValue(false);

    render(<ToolbarButton.Button editor={editor} config={{}} />);

    const button = screen.getByTestId('superscript-button');
    fireEvent.click(button);

    expect(editor.chain).toHaveBeenCalledTimes(0);
    expect(editor.focus).toHaveBeenCalledTimes(0);
    expect(editor.toggleSuperscript).toHaveBeenCalledTimes(1);
    expect(editor.run).toHaveBeenCalledTimes(0);
  });

  it('should have active class when active', () => {
    const editor = new FakeEditor() as any;
    editor.isActive = jest.fn().mockReturnValue(true);

    render(<ToolbarButton.Button editor={editor} config={{}} />);

    const button = screen.getByTestId('superscript-button');
    const classNamesAmount = button.className.split(' ').length;
    expect(classNamesAmount).toBe(2);
  });

  it('should not have active class when not active', () => {
    const editor = new FakeEditor() as any;
    editor.isActive = jest.fn().mockReturnValue(false);

    render(<ToolbarButton.Button editor={editor} config={{}} />);

    const button = screen.getByTestId('superscript-button');
    const classNamesAmount = button.className.split(' ').length;
    expect(classNamesAmount).toBe(1);
  });
});
