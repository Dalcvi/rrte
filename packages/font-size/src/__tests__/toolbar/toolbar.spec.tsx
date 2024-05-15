import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { ToolbarButton } from '../../toolbar';
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

  it('should getCurrent value', () => {
    const editor = new FakeEditor() as any;
    (currentSelectionAttributeValue as jest.Mock).mockReturnValue('14');

    const value = ToolbarButton.getValue({ editor });

    expect(value).toBe(14);
  });

  it('should getCurrent value from elementId', () => {
    const editor = new FakeEditor() as any;

    const fakeElement = document.createElement('div');
    fakeElement.id = 'test-element';
    fakeElement.style.fontSize = '14px';

    (currentSelectionAttributeValue as jest.Mock).mockReturnValue({ id: 'test-element' });

    document.getElementById = jest.fn().mockReturnValue(fakeElement);

    const value = ToolbarButton.getValue({ editor });

    expect(value).toBe(14);
  });

  it('should return if value is undefined', () => {
    const editor = new FakeEditor() as any;

    (currentSelectionAttributeValue as jest.Mock).mockReturnValue(undefined);

    const value = ToolbarButton.getValue({ editor });

    expect(value).toBeUndefined();
  });

  it('should return undefined if there is no id or if the value isnt string', () => {
    const editor = new FakeEditor() as any;

    (currentSelectionAttributeValue as jest.Mock).mockReturnValue({});

    const value = ToolbarButton.getValue({ editor });

    expect(value).toBeUndefined();
  });

  it('should return undefined if no element exists with the id', () => {
    const editor = new FakeEditor() as any;
    (currentSelectionAttributeValue as jest.Mock).mockReturnValue({ id: 'test' });

    document.getElementById = jest.fn().mockReturnValue(undefined);

    const value = ToolbarButton.getValue({ editor });

    expect(value).toBeUndefined();
  });

  it('should set font size on change', () => {
    const editor = new FakeEditor() as any;
    ToolbarButton.onChange({ editor, value: 16 });

    expect(editor.chain).toHaveBeenCalledTimes(1);
    expect(editor.setFontSize).toHaveBeenCalledWith('16px');
    expect(editor.run).toHaveBeenCalledTimes(1);
  });

  it('should return true on disable when you cannot set font size', () => {
    const editor = new FakeEditor();
    editor.setFontSize = jest.fn().mockReturnValue(false);

    const isDisabled = ToolbarButton.getIsDisabled({ editor } as any);

    expect(isDisabled).toBe(true);
  });

  // it('should not be able to go lower than 1px', () => {
  //   const editor = new FakeEditor() as any;
  //   render(<ToolbarButton.Button editor={editor} config={{}} />);

  //   const fontSizeInput = screen.getByTestId<HTMLInputElement>('font-size-input');

  //   fireEvent.change(fontSizeInput, { target: { value: '0' } });
  //   expect(editor.setFontSize).toHaveBeenCalledWith('1px');
  // });
});
