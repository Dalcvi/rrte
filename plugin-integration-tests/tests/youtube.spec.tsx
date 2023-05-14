/**
 * @jest-environment jsdom
 */

import { Editor } from '../../packages/editor/src';
import { Youtube } from '../../packages/extension-youtube/src';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe('Youtube', () => {
  it('should render youtube', async () => {
    const content = {
      type: 'doc',
      content: [
        {
          type: 'youtube',
          attrs: {
            url: 'https://www.youtube.com/watch?v=PE8HfRsEZUc',
            videoId: 'PE8HfRsEZUc',
            defaultWidth: 640,
            alignment: 'center',
            customSize: null,
            customWidth: 320,
          },
        },
      ],
    };

    const editorRef = {} as any;
    render(<Editor editorRef={editorRef} content={content} extensions={[Youtube()]} />);

    const youtubeEl = screen.getByTestId('youtube-comp');

    expect(youtubeEl).toBeInTheDocument();
    expect(editorRef.current.getJSON()).toEqual(content);
  });
});
