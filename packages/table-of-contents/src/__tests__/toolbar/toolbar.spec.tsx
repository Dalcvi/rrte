import '@testing-library/jest-dom';
import { ToolbarButton } from '../../toolbar';
import FakeEditor from '../editor.mock';
jest.mock('../editor.mock', () => {
  return jest.fn().mockImplementation(() => {
    return {
      setTableOfContents: jest.fn().mockReturnThis(),
      removeTableOfContents: jest.fn().mockReturnThis(),
      chain: jest.fn().mockReturnThis(),
      run: jest.fn().mockReturnThis(),
      focus: jest.fn().mockReturnThis(),
      can: jest.fn().mockReturnThis(),
      isActive: jest.fn().mockReturnValue(false),
    };
  });
});

describe('Table of contents toolbar button', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should add table of contents on click', () => {
    const editor = new FakeEditor();
    ToolbarButton.onClick({ editor: editor as any, config: {} });

    expect(editor.chain).toHaveBeenCalledTimes(1);
    expect(editor.focus).toHaveBeenCalledTimes(1);
    expect(editor.setTableOfContents).toHaveBeenCalledTimes(1);
    expect(editor.run).toHaveBeenCalledTimes(1);
  });

  it('should remove table of contents if one is already selected', () => {
    const editor = new FakeEditor();
    editor.isActive = jest.fn().mockReturnValue(true);
    ToolbarButton.onClick({ editor: editor as any, config: {} });

    expect(editor.chain).toHaveBeenCalledTimes(2);
    expect(editor.focus).toHaveBeenCalledTimes(2);
    expect(editor.removeTableOfContents).toHaveBeenCalledTimes(1);
    expect(editor.run).toHaveBeenCalledTimes(2);
  });

  it('should return true on disable when you cannot setTableOfContents', () => {
    const editor = new FakeEditor();
    editor.setTableOfContents = jest.fn().mockReturnValue(false);

    const isDisabled = ToolbarButton.getIsDisabled({ editor: editor as any, config: {} });

    expect(isDisabled).toBe(true);
  });

  it('should always return false to isActive', () => {
    const editor = new FakeEditor();
    const isActive = ToolbarButton.getIsActive({ editor: editor as any, config: {} });

    expect(isActive).toBe(false);
  });
});
