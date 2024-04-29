import React from 'react';
import { ToolbarButton } from '../../toolbar';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FakeEditor from '../editor.mock';
import { currentSelectionAttributeValue } from '@rrte/common';

jest.mock('../editor.mock', () => {
  return jest.fn().mockImplementation(() => {
    return {
      setColor: jest.fn().mockReturnThis(),
      unsetColor: jest.fn().mockReturnThis(),
      chain: jest.fn().mockReturnThis(),
      run: jest.fn().mockReturnThis(),
      focus: jest.fn().mockReturnThis(),
      can: jest.fn().mockReturnThis(),
      isActive: jest.fn().mockReturnValue(false),
    };
  });
});

jest.mock('@rrte/common', () => {
  return {
    currentSelectionAttributeValue: jest.fn().mockReturnValue('255, 255, 255'),
  };
});

describe('Color toolbar button', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should set color on color change', () => {
    const editor = new FakeEditor() as any;
    render(<ToolbarButton.Button editor={editor} config={{}} editorContainerRef={null} />);

    const colorInput = screen.getByTestId('color-input');

    fireEvent.change(colorInput, { target: { value: '#00000C' } });

    expect(editor.chain).toHaveBeenCalledTimes(1);
    expect(editor.focus).toHaveBeenCalledTimes(1);
    expect(editor.setColor).toHaveBeenCalledTimes(2);
    expect(editor.run).toHaveBeenCalledTimes(1);
  });

  it('should have a reset button when color is set', () => {
    const editor = new FakeEditor() as any;
    (currentSelectionAttributeValue as jest.Mock).mockReturnValue('#00000A');
    render(<ToolbarButton.Button editor={editor} config={{}} editorContainerRef={null} />);

    const resetButton = screen.getByTestId('color-reset');
    expect(resetButton).toBeInTheDocument();
  });

  it('should unset color on reset click', () => {
    const editor = new FakeEditor() as any;
    (currentSelectionAttributeValue as jest.Mock).mockReturnValue('#00000B');
    render(<ToolbarButton.Button editor={editor} config={{}} editorContainerRef={null} />);

    const resetButton = screen.getByTestId('color-reset');
    fireEvent.click(resetButton);

    expect(editor.chain).toHaveBeenCalledTimes(1);
    expect(editor.focus).toHaveBeenCalledTimes(1);
    expect(editor.unsetColor).toHaveBeenCalledTimes(1);
    expect(editor.run).toHaveBeenCalledTimes(1);
  });

  it('letter color should be the same as selected color', () => {
    const editor = new FakeEditor() as any;
    (currentSelectionAttributeValue as jest.Mock).mockReturnValue('#AAAAAA');
    render(<ToolbarButton.Button editor={editor} config={{}} editorContainerRef={null} />);

    const colorInput = screen.getByTestId<HTMLInputElement>('color-input');
    const colorLetter = screen.getByTestId('color-letter');
    expect(colorInput.value).toBe('#aaaaaa');
    expect(colorLetter.style.color).toBe('rgb(170, 170, 170)');
  });

  it('bar color should be the same as selected color', () => {
    const editor = new FakeEditor() as any;
    (currentSelectionAttributeValue as jest.Mock).mockReturnValue('#AAAAAA');
    render(<ToolbarButton.Button editor={editor} config={{}} editorContainerRef={null} />);

    const colorInput = screen.getByTestId<HTMLInputElement>('color-input');
    const colorBar = screen.getByTestId('color-bar');
    expect(colorInput.value).toBe('#aaaaaa');
    expect(colorBar.style.background).toBe('rgb(170, 170, 170)');
  });
});
