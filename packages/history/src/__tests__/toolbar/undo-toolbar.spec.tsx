import { ToolbarButtons } from '../../toolbar';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FakeEditor from '../editor.mock';
import { RegularButtonConfig } from '@rrte/common';
jest.mock('../editor.mock', () => {
  return jest.fn().mockImplementation(() => {
    return {
      undo: jest.fn().mockReturnThis(),
      redo: jest.fn().mockReturnThis(),
      chain: jest.fn().mockReturnThis(),
      run: jest.fn().mockReturnThis(),
      focus: jest.fn().mockReturnThis(),
      can: jest.fn().mockReturnThis(),
      isActive: jest.fn().mockReturnValue(false),
    };
  });
});

const UndoToolbar = ToolbarButtons.find(t => t.name === 'Undo') as RegularButtonConfig;

describe('Undo toolbar button', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should undo on click', () => {
    const editor = new FakeEditor() as any;

    render(<UndoToolbar.Button editor={editor} config={{}} />);

    const button = screen.getByTestId('undo-button');
    fireEvent.click(button);

    expect(editor.chain).toHaveBeenCalledTimes(1);
    expect(editor.focus).toHaveBeenCalledTimes(1);
    expect(editor.undo).toHaveBeenCalledTimes(2);
    expect(editor.run).toHaveBeenCalledTimes(1);
  });

  it('should disable when it cannot toggle undo', () => {
    const editor = new FakeEditor() as any;
    editor.undo = jest.fn().mockReturnValue(false);

    render(<UndoToolbar.Button editor={editor} config={{}} />);

    const button = screen.getByTestId('undo-button');
    expect(button).toBeDisabled();
  });

  it('should not undo on click if disabled', () => {
    const editor = new FakeEditor() as any;
    editor.undo = jest.fn().mockReturnValue(false);

    render(<UndoToolbar.Button editor={editor} config={{}} />);

    const button = screen.getByTestId('undo-button');
    fireEvent.click(button);

    expect(editor.chain).toHaveBeenCalledTimes(0);
    expect(editor.focus).toHaveBeenCalledTimes(0);
    expect(editor.undo).toHaveBeenCalledTimes(1);
    expect(editor.run).toHaveBeenCalledTimes(0);
  });
});
