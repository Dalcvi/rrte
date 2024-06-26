/**
 * @jest-environment jsdom
 */

import { Editor } from '../../packages/editor/src';
import { Video, VideoAttributes } from '../../packages/video/src';
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

describe('Video', () => {
  it('button press should add video', async () => {
    const editorRef = {} as any;
    render(
      <Editor
        editorRef={editorRef}
        content={undefined}
        editorExtensions={[
          Paragraph(),
          Video({
            type: 'user-controlled',
            onVideoAddClick: async () => {
              const tempFile = {
                src: 'https://www.w3schools.com/html/mov_bbb.mp4',
              };
              const finalFile = new Promise<VideoAttributes>(resolve =>
                setTimeout(resolve, 1000, {
                  src: 'https://www.w3schools.com/html/mov_bbb.mp4',
                })
              );

              return { tempFile, finalFile };
            },
            onPaste: async (file, videoAttr) =>
              new Promise(resolve => setTimeout(resolve, 1000, videoAttr)),
            maxFileSize: 100000000,
            acceptedVideoFileTypes: ['video/mp4', 'video/quicktime'],
          }),
        ]}
      />
    );

    const button = screen.getByTestId('video-button.text-regular-button');
    await userEvent.click(button);

    const vidElement = screen.getByTestId('video-comp');

    expect(vidElement).toBeInTheDocument();
  });
  it('should render video', async () => {
    const content = {
      type: 'doc',
      content: [
        {
          type: 'video',
          attrs: {
            src: 'https://www.w3schools.com/html/mov_bbb.mp4',
            isLoading: false,
            alignment: 'center',
            customSize: null,
            customWidth: 320,
            customHeight: 180,
            title: null,
          },
        },
      ],
    };

    const editorRef = {} as any;
    render(
      <Editor
        editorRef={editorRef}
        content={content}
        editorExtensions={[
          Video({
            type: 'user-controlled',
            onVideoAddClick: async () => {
              const tempFile = {
                src: 'https://www.w3schools.com/html/mov_bbb.mp4',
              };
              const finalFile = new Promise<VideoAttributes>(resolve =>
                setTimeout(resolve, 1000, {
                  src: 'https://www.w3schools.com/html/mov_bbb.mp4',
                })
              );

              return { tempFile, finalFile };
            },
            onPaste: async (file, videoAttr) =>
              new Promise(resolve => setTimeout(resolve, 1000, videoAttr)),
            maxFileSize: 100000000,
            acceptedVideoFileTypes: ['video/mp4', 'video/quicktime'],
          }),
        ]}
      />
    );

    const vidElement = screen.getByTestId('video-comp');

    expect(vidElement).toBeInTheDocument();
    expect(editorRef.current.getJSON()).toEqual(content);
  });
});
