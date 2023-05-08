import { ToolbarButton } from '../../toolbar';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FakeEditor from '../editor.mock';
import { currentSelectionAttributeValue } from '@rrte/common';

jest.mock('../editor.mock', () => {
  return jest.fn().mockImplementation(() => {
    return {
      setHighlight: jest.fn().mockReturnThis(),
      unsetHighlight: jest.fn().mockReturnThis(),
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

describe('Highlight toolbar button', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should set highlight on change', () => {
    const editor = new FakeEditor() as any;
    render(<ToolbarButton.Button editor={editor} config={{}} />);

    const highlightInput = screen.getByTestId('highlight-input');

    fireEvent.change(highlightInput, { target: { value: '#00000C' } });

    expect(editor.chain).toHaveBeenCalledTimes(1);
    expect(editor.focus).toHaveBeenCalledTimes(1);
    expect(editor.setHighlight).toHaveBeenCalledTimes(2);
    expect(editor.run).toHaveBeenCalledTimes(1);
  });

  it('should have a reset button when highlight is set', () => {
    const editor = new FakeEditor() as any;
    (currentSelectionAttributeValue as jest.Mock).mockReturnValue('#00000A');
    render(<ToolbarButton.Button editor={editor} config={{}} />);

    const resetButton = screen.getByTestId('highlight-reset');
    expect(resetButton).toBeInTheDocument();
  });

  it('should unset highlight on reset click', () => {
    const editor = new FakeEditor() as any;
    (currentSelectionAttributeValue as jest.Mock).mockReturnValue('#00000B');
    render(<ToolbarButton.Button editor={editor} config={{}} />);

    const resetButton = screen.getByTestId('highlight-reset');
    fireEvent.click(resetButton);

    expect(editor.chain).toHaveBeenCalledTimes(1);
    expect(editor.focus).toHaveBeenCalledTimes(1);
    expect(editor.unsetHighlight).toHaveBeenCalledTimes(1);
    expect(editor.run).toHaveBeenCalledTimes(1);
  });
});
