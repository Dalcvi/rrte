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
  it('should set highlight on color change', () => {
    const editor = new FakeEditor() as any;
    const e = { target: { value: '#000000' } } as any;
    ToolbarButton.onChange(e, { editor });

    expect(editor.chain).toHaveBeenCalledTimes(1);
    expect(editor.focus).toHaveBeenCalledTimes(1);
    expect(editor.setHighlight).toHaveBeenCalledWith('#000000');
    expect(editor.run).toHaveBeenCalledTimes(1);
  });

  it('should reset color on reset', () => {
    const editor = new FakeEditor() as any;
    ToolbarButton.onReset({ editor });

    expect(editor.chain).toHaveBeenCalledTimes(1);
    expect(editor.focus).toHaveBeenCalledTimes(1);
    expect(editor.unsetHighlight).toHaveBeenCalledTimes(1);
    expect(editor.run).toHaveBeenCalledTimes(1);
  });

  it('should return true for getCanReset when there is a color value', () => {
    const editor = new FakeEditor() as any;
    const canReset = ToolbarButton.getCanReset({ editor }, '#000000');

    expect(canReset).toBe(true);
  });

  it('should be disabled when you cant set color', () => {
    const editor = new FakeEditor() as any;
    editor.setHighlight = jest.fn().mockReturnValue(false);
    const isDisabled = ToolbarButton.getIsDisabled({ editor });

    expect(isDisabled).toBe(true);
  });

  it('should return current color value', () => {
    const editor = new FakeEditor() as any;
    (currentSelectionAttributeValue as jest.Mock).mockReturnValue('#000000');

    const color = ToolbarButton.getValue({ editor });

    expect(color).toBe('#000000');
  });

  it('should return undefined if no color value', () => {
    const editor = new FakeEditor() as any;
    (currentSelectionAttributeValue as jest.Mock).mockReturnValue({});

    const color = ToolbarButton.getValue({ editor });

    expect(color).toBe(undefined);
  });

  it('should return undefined if no element exists with the id', () => {
    const editor = new FakeEditor() as any;
    (currentSelectionAttributeValue as jest.Mock).mockReturnValue({ id: 'test' });

    document.getElementById = jest.fn().mockReturnValue(undefined);

    const color = ToolbarButton.getValue({ editor });

    expect(color).toBe(undefined);
  });

  it('should return current value by id', () => {
    const editor = new FakeEditor() as any;
    (currentSelectionAttributeValue as jest.Mock).mockReturnValue({
      id: 'test',
    });

    const fakeElement = document.createElement('div');
    fakeElement.id = 'test';
    fakeElement.style.backgroundColor = 'red';

    document.getElementById = jest.fn().mockReturnValue(fakeElement);

    const color = ToolbarButton.getValue({ editor });
    expect(color).toBe('red');
  });

  it('should have an icon', () => {
    const icon = ToolbarButton.Icon({ value: '#000000' });

    expect(icon).not.toBeNull();
  });
});
