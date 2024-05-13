import '@testing-library/jest-dom';
import { ToolbarButton } from '../../toolbar';
import FakeEditor from '../editor.mock';
jest.mock('../editor.mock', () => {
  return jest.fn().mockImplementation(() => {
    return {
      toggleCode: jest.fn().mockReturnThis(),
      chain: jest.fn().mockReturnThis(),
      run: jest.fn().mockReturnThis(),
      focus: jest.fn().mockReturnThis(),
      can: jest.fn().mockReturnThis(),
      isActive: jest.fn().mockReturnValue(false),
    };
  });
});

describe('Code toolbar button', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should toggle code on click', () => {
    const editor = new FakeEditor();
    ToolbarButton.onClick({ editor: editor as any, config: {} });

    expect(editor.chain).toHaveBeenCalledTimes(1);
    expect(editor.focus).toHaveBeenCalledTimes(1);
    expect(editor.toggleCode).toHaveBeenCalledTimes(1);
    expect(editor.run).toHaveBeenCalledTimes(1);
  });

  it('should return true on disable when you cannot toggleCode', () => {
    const editor = new FakeEditor();
    editor.toggleCode = jest.fn().mockReturnValue(false);

    const isDisabled = ToolbarButton.getIsDisabled({ editor: editor as any, config: {} });

    expect(isDisabled).toBe(true);
  });

  it('should return true on active when content is code', () => {
    const editor = new FakeEditor();
    editor.isActive = jest.fn().mockReturnValue(true);

    const isActive = ToolbarButton.getIsActive({ editor: editor as any, config: {} });

    expect(isActive).toBe(true);
  });
});
