import { ToolbarDropdown } from '../../toolbar';
import FakeEditor from '../editor.mock';

const toolbarValueNames = ToolbarDropdown.values.map(value => ({ name: value.name }));

describe('heading toolbar button', () => {
  describe.each(toolbarValueNames)('$name', ({ name }) => {
    it('should check if isActive', () => {
      const fakeEditor = new FakeEditor();
      fakeEditor.isActive = jest.fn().mockReturnValue(true);

      const heading = ToolbarDropdown.values.find(item => item.name === name);
      heading?.isActive({ editor: fakeEditor as any, config: {} });

      expect(fakeEditor.isActive).toHaveBeenCalledWith('heading', {
        level: ToolbarDropdown.values.indexOf(heading as any) + 1,
      });
    });

    it('should check if isDisabled', () => {
      const fakeEditor = new FakeEditor();
      const heading = ToolbarDropdown.values.find(item => item.name === name);
      const index = ToolbarDropdown.values.indexOf(heading as any);

      const setHeading = jest
        .fn()
        .mockImplementation(({ level }: { level: number }) => level !== index + 1);
      fakeEditor.can = jest.fn().mockReturnValue({
        setHeading: setHeading,
      });

      const isDisabled = heading?.getIsDisabled({
        editor: fakeEditor as any,
        config: {},
      });

      expect(setHeading).toHaveBeenCalledWith({ level: index + 1 });

      expect(isDisabled).toBe(true);
    });

    it('should set Heading on click', () => {
      const fakeEditor = new FakeEditor();
      const setHeading = jest.fn().mockReturnThis();
      fakeEditor.chain = jest.fn().mockReturnValue({
        setHeading: setHeading,
        run: jest.fn().mockReturnThis(),
        focus: jest.fn().mockReturnThis(),
      });

      const heading = ToolbarDropdown.values.find(item => item.name === name);

      heading?.onClick({ editor: fakeEditor as any, config: {} });

      expect(fakeEditor.chain).toHaveBeenCalledTimes(1);
      expect(fakeEditor.chain().setHeading).toHaveBeenCalledWith({
        level: ToolbarDropdown.values.indexOf(heading as any) + 1,
      });
      expect(fakeEditor.chain().run).toHaveBeenCalledTimes(1);
      expect(fakeEditor.chain().focus).toHaveBeenCalledTimes(1);
    });
  });
});
