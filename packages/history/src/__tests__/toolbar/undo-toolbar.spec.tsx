import { RegularButtonConfig } from '@rrte/common';
import '@testing-library/jest-dom';
import { ToolbarButtons } from '../../toolbar';
import FakeEditor from '../editor.mock';
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

const ToolbarButton = ToolbarButtons.find(t => t.name === 'Undo') as RegularButtonConfig;

describe('Undo toolbar button', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should undo on click', () => {
    const editor = new FakeEditor();
    ToolbarButton.onClick({ editor: editor as any, config: {} });

    expect(editor.chain).toHaveBeenCalledTimes(1);
    expect(editor.focus).toHaveBeenCalledTimes(1);
    expect(editor.undo).toHaveBeenCalledTimes(1);
    expect(editor.run).toHaveBeenCalledTimes(1);
  });

  it('should return true on disable when you cannot undo', () => {
    const editor = new FakeEditor();
    editor.undo = jest.fn().mockReturnValue(false);

    const isDisabled = ToolbarButton.getIsDisabled({ editor: editor as any, config: {} });

    expect(isDisabled).toBe(true);
  });

  it('should always be not active', () => {
    const editor = new FakeEditor();
    editor.isActive = jest.fn().mockReturnValue(true);

    const isActive = ToolbarButton.getIsActive({ editor: editor as any, config: {} });

    expect(isActive).toBe(false);
  });
});
