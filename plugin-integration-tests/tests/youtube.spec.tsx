/**
 * @jest-environment jsdom
 */

import { Editor } from '../../packages/editor/src';
import { Youtube } from '../../packages/youtube/src';
import { Paragraph } from '../../packages/paragraph/src';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import userEvent from '@testing-library/user-event';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe('Youtube', () => {
  it('button press should add youtube', async () => {
    const editorRef = {} as any;
    render(
      <Editor
        editorRef={editorRef}
        content={undefined}
        editorExtensions={[Paragraph(), Youtube()]}
      />
    );
    const button = screen.getByTestId('youtube-button.text-modal-button');
    await userEvent.click(button);
    const ytInput = screen.getByTestId('Youtube URL-input');
    await userEvent.type(ytInput, 'https://www.youtube.com/watch?v=PE8HfRsEZUc');
    const addButton = screen.getByTestId('youtube-add-button');
    await userEvent.click(addButton);
    const ytElement = await screen.findByTestId(
      'youtube-comp',
      {},
      {
        timeout: 1000,
      }
    );

    expect(ytElement).toBeInTheDocument();
  });
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
    render(<Editor editorRef={editorRef} content={content} editorExtensions={[Youtube()]} />);

    const youtubeEl = screen.getByTestId('youtube-comp');

    expect(youtubeEl).toBeInTheDocument();
    expect(editorRef.current.getJSON()).toEqual(content);
  });
});
