/**
 * @jest-environment jsdom
 */

import { Editor } from '../../packages/editor/src';
import { TextAlign } from '../../packages/extension-text-align/src';
import { Paragraph } from '../../packages/extension-paragraph/src';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import userEvent from '@testing-library/user-event';

describe('Text align', () => {
  it('button should change paragraph text alignment to left', async () => {
    const editorRef = {} as any;
    render(
      <Editor editorRef={editorRef} content={undefined} extensions={[Paragraph(), TextAlign()]} />
    );
    const rightButton = screen.getByTestId('text-align-right-button');
    await userEvent.click(rightButton);
    const button = screen.getByTestId('text-align-left-button');
    await userEvent.click(button);

    const contentString = JSON.stringify(editorRef.current.getJSON());

    expect(contentString.includes('textAlign":"left"')).toBeTruthy();
  });

  it('button should change paragraph text alignment to center', async () => {
    const editorRef = {} as any;
    render(
      <Editor editorRef={editorRef} content={undefined} extensions={[Paragraph(), TextAlign()]} />
    );

    const button = screen.getByTestId('text-align-center-button');
    await userEvent.click(button);

    const contentString = JSON.stringify(editorRef.current.getJSON());

    expect(contentString.includes('textAlign":"center"')).toBeTruthy();
  });

  it('button should change paragraph text alignment to right', async () => {
    const editorRef = {} as any;
    render(
      <Editor editorRef={editorRef} content={undefined} extensions={[Paragraph(), TextAlign()]} />
    );

    const button = screen.getByTestId('text-align-right-button');
    await userEvent.click(button);

    const contentString = JSON.stringify(editorRef.current.getJSON());

    expect(contentString.includes('textAlign":"right"')).toBeTruthy();
  });

  it('button should change paragraph text alignment to justify', async () => {
    const editorRef = {} as any;
    render(
      <Editor editorRef={editorRef} content={undefined} extensions={[Paragraph(), TextAlign()]} />
    );

    const button = screen.getByTestId('text-align-justify-button');
    await userEvent.click(button);

    const contentString = JSON.stringify(editorRef.current.getJSON());

    expect(contentString.includes('textAlign":"justify"')).toBeTruthy();
  });
  it('should attach text align left to paragraph', async () => {
    const content = {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          attrs: {
            textAlign: 'left',
          },
          content: [
            {
              type: 'text',
              text: 'Sveiki',
            },
          ],
        },
      ],
    };

    const editorRef = {} as any;
    render(
      <Editor editorRef={editorRef} content={content} extensions={[Paragraph(), TextAlign()]} />
    );

    const paragraph = screen.getByTestId('paragraph');

    expect(paragraph.style.textAlign).toEqual('left');
    expect(editorRef.current.getJSON()).toEqual(content);
  });

  it('should attach text align center to paragraph', async () => {
    const content = {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          attrs: {
            textAlign: 'center',
          },
          content: [
            {
              type: 'text',
              text: 'Sveiki',
            },
          ],
        },
      ],
    };

    const editorRef = {} as any;
    render(
      <Editor editorRef={editorRef} content={content} extensions={[Paragraph(), TextAlign()]} />
    );

    const paragraph = screen.getByTestId('paragraph');

    expect(paragraph.style.textAlign).toEqual('center');

    expect(editorRef.current.getJSON()).toEqual(content);
  });

  it('should attach text align right to paragraph', async () => {
    const content = {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          attrs: {
            textAlign: 'right',
          },
          content: [
            {
              type: 'text',
              text: 'Sveiki',
            },
          ],
        },
      ],
    };

    const editorRef = {} as any;
    render(
      <Editor editorRef={editorRef} content={content} extensions={[Paragraph(), TextAlign()]} />
    );

    const paragraph = screen.getByTestId('paragraph');

    expect(paragraph.style.textAlign).toEqual('right');

    expect(editorRef.current.getJSON()).toEqual(content);
  });

  it('should attach text align justify to paragraph', async () => {
    const content = {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          attrs: {
            textAlign: 'justify',
          },
          content: [
            {
              type: 'text',
              text: 'Sveiki',
            },
          ],
        },
      ],
    };

    const editorRef = {} as any;
    render(
      <Editor editorRef={editorRef} content={content} extensions={[Paragraph(), TextAlign()]} />
    );

    const paragraph = screen.getByTestId('paragraph');

    expect(paragraph.style.textAlign).toEqual('justify');

    expect(editorRef.current.getJSON()).toEqual(content);
  });
});
