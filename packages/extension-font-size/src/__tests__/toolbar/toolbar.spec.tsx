import { ToolbarButton } from '../../toolbar';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FakeEditor from '../editor.mock';
import { currentSelectionAttributeValue } from '@rrte/common';

jest.mock('../editor.mock', () => {
  return jest.fn().mockImplementation(() => {
    return {
      setFontSize: jest.fn().mockReturnThis(),
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
    currentSelectionAttributeValue: jest.fn().mockReturnValue('14'),
  };
});

describe('Font size toolbar button', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should set font size on change', () => {
    const editor = new FakeEditor() as any;
    render(<ToolbarButton.Button editor={editor} config={{}} />);

    const fontSizeInput = screen.getByTestId('font-size-input');

    fireEvent.change(fontSizeInput, { target: { value: '12' } });

    expect(editor.chain).toHaveBeenCalledTimes(1);
    expect(editor.setFontSize).toHaveBeenCalledTimes(1);
    expect(editor.run).toHaveBeenCalledTimes(1);
  });

  it('should not be able to go lower than 1px', () => {
    const editor = new FakeEditor() as any;
    render(<ToolbarButton.Button editor={editor} config={{}} />);

    const fontSizeInput = screen.getByTestId<HTMLInputElement>('font-size-input');

    fireEvent.change(fontSizeInput, { target: { value: '0' } });
    expect(editor.setFontSize).toHaveBeenCalledWith('1px');
  });
});
