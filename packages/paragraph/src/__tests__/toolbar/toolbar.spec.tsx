import { toolbarDropdown } from '../../paragraph';
import FakeEditor from '../editor.mock';

const toolbarValueNames = toolbarDropdown.values.map(value => ({ name: value.name }));

describe('paragraph toolbar button', () => {
  describe.each(toolbarValueNames)('$name', ({ name }) => {
    it('should check if isActive', () => {
      const fakeEditor = new FakeEditor();
      fakeEditor.isActive = jest.fn().mockReturnValue(true);

      const paragraph = toolbarDropdown.values.find(item => item.name === name);
      paragraph?.isActive({ editor: fakeEditor as any, config: {} });

      expect(fakeEditor.isActive).toHaveBeenCalledTimes(1);
    });

    it('should check if isDisabled', () => {
      const fakeEditor = new FakeEditor();
      const paragraph = toolbarDropdown.values.find(item => item.name === name);
      toolbarDropdown.values.indexOf(paragraph as any);

      const setParagraph = jest.fn().mockReturnValue(false);
      fakeEditor.can = jest.fn().mockReturnValue({
        setParagraph: setParagraph,
      });

      const isDisabled = paragraph?.getIsDisabled({
        editor: fakeEditor as any,
        config: {},
      });

      expect(setParagraph).toHaveBeenCalledTimes(1);

      expect(isDisabled).toBe(true);
    });

    it('should set paragraph on click', () => {
      const fakeEditor = new FakeEditor();
      const setParagraph = jest.fn().mockReturnThis();
      fakeEditor.chain = jest.fn().mockReturnValue({
        setParagraph: setParagraph,
        run: jest.fn().mockReturnThis(),
        focus: jest.fn().mockReturnThis(),
      });

      const paragraph = toolbarDropdown.values.find(item => item.name === name);

      paragraph?.onClick({ editor: fakeEditor as any, config: {} });

      expect(fakeEditor.chain).toHaveBeenCalledTimes(1);
      expect(fakeEditor.chain().setParagraph).toHaveBeenCalledTimes(1);
      expect(fakeEditor.chain().run).toHaveBeenCalledTimes(1);
      expect(fakeEditor.chain().focus).toHaveBeenCalledTimes(1);
    });
  });
});
