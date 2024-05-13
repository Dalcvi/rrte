import '@testing-library/jest-dom';
import { ToolbarButton } from '../../toolbar';
import FakeEditor from '../editor.mock';
jest.mock('../editor.mock', () => {
  return jest.fn().mockImplementation(() => {
    return {
      toggleSubscript: jest.fn().mockReturnThis(),
      chain: jest.fn().mockReturnThis(),
      run: jest.fn().mockReturnThis(),
      focus: jest.fn().mockReturnThis(),
      can: jest.fn().mockReturnThis(),
      isActive: jest.fn().mockReturnValue(false),
    };
  });
});

describe('Subscript toolbar button', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should toggle subscript on click', () => {
    const editor = new FakeEditor();
    ToolbarButton.onClick({ editor: editor as any, config: {} });

    expect(editor.chain).toHaveBeenCalledTimes(1);
    expect(editor.focus).toHaveBeenCalledTimes(1);
    expect(editor.toggleSubscript).toHaveBeenCalledTimes(1);
    expect(editor.run).toHaveBeenCalledTimes(1);
  });

  it('should return true on disable when you cannot toggleSubscript', () => {
    const editor = new FakeEditor();
    editor.toggleSubscript = jest.fn().mockReturnValue(false);

    const isDisabled = ToolbarButton.getIsDisabled({ editor: editor as any, config: {} });

    expect(isDisabled).toBe(true);
  });

  it('should return true on active when content is subscript', () => {
    const editor = new FakeEditor();
    editor.isActive = jest.fn().mockReturnValue(true);

    const isActive = ToolbarButton.getIsActive({ editor: editor as any, config: {} });

    expect(isActive).toBe(true);
  });
});
