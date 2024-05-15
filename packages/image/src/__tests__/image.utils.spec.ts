import { extractImageInfo } from '../image.utils';

describe('extractImageInfo', () => {
  const mockFile = new File(['test'], 'test.png', { type: 'image/png' });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should extract image info successfully', async () => {
    const mockReadAsDataURL = jest.fn();
    let imgUrl;

    const mockFileReader = {
      readAsDataURL: mockReadAsDataURL,
      set onload(callback) {
        callback({ target: { result: 'data:image/png;base64,test' } });
      },
      set onerror(callback) {},
    };

    global.FileReader = jest.fn(() => mockFileReader);

    const mockImage = {
      set src(url) {
        imgUrl = url;
      },
      get src() {
        return imgUrl;
      },
      onload: null,
      onerror: null,
      naturalWidth: 100,
      naturalHeight: 200,
    };

    global.Image = jest.fn(() => mockImage);

    Object.defineProperty(mockImage, 'onload', {
      get() {
        return null;
      },
      set(fn) {
        fn();
      },
    });

    const result = await extractImageInfo(mockFile);

    expect(result).toEqual({
      originalWidth: 100,
      originalHeight: 200,
      src: 'data:image/png;base64,test',
    });
  });

  it('should reject if FileReader fails to read the file', async () => {
    const mockReadAsDataURL = jest.fn();

    const mockFileReader = {
      readAsDataURL: mockReadAsDataURL,
      set onload(callback) {},
      set onerror(callback) {
        callback();
      },
    };

    global.FileReader = jest.fn(() => mockFileReader);

    await expect(extractImageInfo(mockFile)).rejects.toThrow('Failed to read the file.');
  });

  it('should reject if the image fails to load', async () => {
    const mockReadAsDataURL = jest.fn();

    const mockFileReader = {
      readAsDataURL: mockReadAsDataURL,
      set onload(callback) {
        callback({ target: { result: 'data:image/png;base64,test' } });
      },
      set onerror(callback) {},
    };

    global.FileReader = jest.fn(() => mockFileReader);

    const mockImage = {
      set src(url) {},
      onload: null,
      onerror: null,
      naturalWidth: 100,
      naturalHeight: 200,
    };

    global.Image = jest.fn(() => mockImage);

    Object.defineProperty(mockImage, 'onerror', {
      get() {
        return null;
      },
      set(fn) {
        fn();
      },
    });

    await expect(extractImageInfo(mockFile)).rejects.toThrow('Failed to load the image.');
  });
});
