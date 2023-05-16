import { getYouTubeID } from '../toolbar/toolbar.utils';

describe('getYouTubeID', () => {
  it('should return the correct YouTube ID for valid URLs', () => {
    expect(getYouTubeID('https://www.youtube.com/watch?v=dQw4w9WgXcQ')).toEqual('dQw4w9WgXcQ');
    expect(getYouTubeID('https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1')).toEqual(
      'dQw4w9WgXcQ',
    );
    expect(getYouTubeID('https://youtu.be/dQw4w9WgXcQ')).toEqual('dQw4w9WgXcQ');
  });

  it('should return null for invalid URLs', () => {
    expect(getYouTubeID('https://www.google.com')).toBeNull();
    expect(getYouTubeID('https://www.youtube.com/watch?list=RDdQw4w9WgXcQ&start_radio=1')).toBeNull();
    expect(getYouTubeID('')).toBeNull();
  });
});
