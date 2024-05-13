import React from 'react';
import { toolbar } from '../../toolbar';
import FakeEditor from '../editor.mock';
import { render } from '@testing-library/react';

const toolbarValueNames = toolbar.values.map(value => ({ name: value.name }));

describe('text-align toolbar button', () => {
  describe.each(toolbarValueNames)('$name', ({ name }) => {
    it('should check if isActive', () => {
      const fakeEditor = new FakeEditor();
      fakeEditor.isActive = jest.fn().mockReturnValue(true);

      toolbar.values
        .find(item => item.name === name)
        ?.isActive({ editor: fakeEditor as any, config: { types: ['hello'] } });

      expect(fakeEditor.isActive).toHaveBeenCalledWith('hello', { textAlign: name });
    });

    it('should check if isDisabled', () => {
      const fakeEditor = new FakeEditor();
      const setTextAlign = jest
        .fn()
        .mockImplementation(({ textAlign }: { textAlign: string }) => textAlign !== name);
      fakeEditor.can = jest.fn().mockReturnValue({
        setTextAlign: setTextAlign,
      });

      const isDisabled = toolbar.values
        .find(item => item.name === name)
        ?.getIsDisabled({ editor: fakeEditor as any, config: { types: ['hello'] } });

      expect(setTextAlign).toHaveBeenCalledWith({ textAlign: name });

      expect(isDisabled).toBe(true);
    });

    it('should toggle textAlign on click', () => {
      const fakeEditor = new FakeEditor();
      const setTextAlign = jest.fn().mockReturnThis();
      fakeEditor.chain = jest.fn().mockReturnValue({
        setTextAlign: setTextAlign,
        run: jest.fn().mockReturnThis(),
        focus: jest.fn().mockReturnThis(),
      });

      toolbar.values
        .find(item => item.name === name)
        ?.onClick({ editor: fakeEditor as any, config: { types: ['hello'] } });

      expect(fakeEditor.chain).toHaveBeenCalledTimes(1);
      expect(fakeEditor.chain().setTextAlign).toHaveBeenCalledWith({ textAlign: name });
      expect(fakeEditor.chain().run).toHaveBeenCalledTimes(1);
      expect(fakeEditor.chain().focus).toHaveBeenCalledTimes(1);
    });

    it('should have an icon', () => {
      const Icon = toolbar.values.find(item => item.name === name)?.iconConfig?.Icon;

      render(<>{Icon ? <Icon className={name} /> : null}</>);

      const icon = document.querySelector(`.${name}`);

      expect(icon).not.toBeUndefined();
    });
  });
});
