import '@testing-library/jest-dom';
import { ToolbarButton } from '../../toolbar';
import FakeEditor from '../editor.mock';

jest.mock('../editor.mock', () => {
  return jest.fn().mockImplementation(() => {
    return {
      toggleItalic: jest.fn().mockReturnThis(),
      chain: jest.fn().mockReturnThis(),
      run: jest.fn().mockReturnThis(),
      focus: jest.fn().mockReturnThis(),
      can: jest.fn().mockReturnThis(),
      isActive: jest.fn().mockReturnValue(false),
    };
  });
});

describe('Italic toolbar button', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should toggle italic on click', () => {
    const editor = new FakeEditor() as any;
    ToolbarButton.onClick({ editor, config: {} });

    expect(editor.chain).toHaveBeenCalledTimes(1);
    expect(editor.focus).toHaveBeenCalledTimes(1);
    expect(editor.toggleItalic).toHaveBeenCalledTimes(1);
    expect(editor.run).toHaveBeenCalledTimes(1);
  });

  it('should return true on disable when you cannot toggleItalic', () => {
    const editor = new FakeEditor() as any;
    editor.toggleItalic = jest.fn().mockReturnValue(false);

    const isDisabled = ToolbarButton.getIsDisabled({ editor, config: {} });

    expect(isDisabled).toBe(true);
  });

  it('should return true on active when content is italic', () => {
    const editor = new FakeEditor() as any;
    editor.isActive = jest.fn().mockReturnValue(true);

    const isActive = ToolbarButton.getIsActive({ editor, config: {} });

    expect(isActive).toBe(true);
  });
});
