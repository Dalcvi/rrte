import { createTempImage, getImageValue } from '../../toolbar/toolbar.utils';

describe('Toolbar utils', () => {
  describe('getImageValue', () => {
    it('function', async () => {
      expect(await getImageValue(() => 'test' as any)).toBe('test');
    });

    it('value', async () => {
      expect(await getImageValue('test' as any)).toBe('test');
    });
  });

  describe('createTempImage', () => {
    const mockEditor = {
      chain: jest.fn().mockReturnThis(),
      focus: jest.fn().mockReturnThis(),
      setImage: jest.fn().mockReturnThis(),
      run: jest.fn(),
      state: {
        selection: {
          node: {
            attrs: {
              id: 'hello',
            },
          },
        },
      },
    } as any;

    const mockTempImg = {} as any;

    beforeEach(() => {
      // Clear mock function calls and reset any necessary mock values
      jest.clearAllMocks();
    });

    it('should set image and return imgId if tempImg is provided', async () => {
      const result = await createTempImage(mockEditor, mockTempImg);

      expect(mockEditor.chain).toHaveBeenCalledTimes(1);
      expect(mockEditor.focus).toHaveBeenCalledTimes(1);
      expect(mockEditor.setImage).toHaveBeenCalledWith({ ...mockTempImg, isLoading: true });
      expect(mockEditor.run).toHaveBeenCalledTimes(1);
      expect(result).toBe('hello');
    });

    it('should return false if tempImg is not provided', async () => {
      const result = await createTempImage(mockEditor, null as any);

      expect(mockEditor.chain).not.toHaveBeenCalled();
      expect(mockEditor.focus).not.toHaveBeenCalled();
      expect(mockEditor.setImage).not.toHaveBeenCalled();
      expect(mockEditor.run).not.toHaveBeenCalled();
      expect(result).toBe(false);
    });
  });
});
