/**
 * @jest-environment jsdom
 */

import { Editor } from '../../packages/editor/src';
import { Image, ImageAttributes } from '../../packages/extension-image/src';
import { Paragraph } from '../../packages/extension-paragraph/src';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import userEvent from '@testing-library/user-event';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe('Image', () => {
  it('button press should add image', async () => {
    const editorRef = {} as any;
    render(
      <Editor
        editorRef={editorRef}
        content={undefined}
        extensions={[
          Paragraph(),
          Image({
            type: 'user-controlled',
            maxFileSize: 100000000,
            acceptedImageFileTypes: ['image/jpeg', 'image/png'],
            onImageAddClick: async () => {
              const tempFile = {
                src: 'https://picsum.photos/300/200',
                originalHeight: 200,
                originalWidth: 300,
              };
              const finalFile = new Promise<ImageAttributes>((resolve) =>
                setTimeout(resolve, 1000, {
                  src: 'https://picsum.photos/200/300',
                  originalHeight: 300,
                  originalWidth: 200,
                }),
              );

              return { tempFile, finalFile };
            },
            onPaste: async (file, imgAttr) => new Promise((resolve) => setTimeout(resolve, 1000, imgAttr)),
          }),
        ]}
      />,
    );

    const button = screen.getByTestId('user-controlled-image-button');
    await userEvent.click(button);

    const imgElement = screen.getByTestId('image-comp');

    expect(imgElement).toBeInTheDocument();
  });
  it('should render image', async () => {
    const content = {
      type: 'doc',
      content: [
        {
          type: 'image',
          attrs: {
            src: 'https://picsum.photos/200/300',
            originalWidth: 200,
            originalHeight: 300,
            alt: null,
            customSize: null,
            customWidth: null,
            customHeight: null,
            isLoading: false,
            alignment: 'center',
          },
        },
      ],
    };

    const editorRef = {} as any;
    render(
      <Editor
        editorRef={editorRef}
        content={content}
        extensions={[
          Image({
            type: 'user-controlled',
            maxFileSize: 100000000,
            acceptedImageFileTypes: ['image/jpeg', 'image/png'],
            onImageAddClick: async () => {
              const tempFile = {
                src: 'https://picsum.photos/300/200',
                originalHeight: 200,
                originalWidth: 300,
              };
              const finalFile = new Promise<ImageAttributes>((resolve) =>
                setTimeout(resolve, 1000, {
                  src: 'https://picsum.photos/200/300',
                  originalHeight: 300,
                  originalWidth: 200,
                }),
              );

              return { tempFile, finalFile };
            },
            onPaste: async (file, imgAttr) => new Promise((resolve) => setTimeout(resolve, 1000, imgAttr)),
          }),
        ]}
      />,
    );

    const imgElement = screen.getByTestId('image-comp');

    expect(imgElement).toBeInTheDocument();
    expect(editorRef.current.getJSON()).toEqual(content);
  });
});
