/**
 * @jest-environment jsdom
 */

import { Editor } from '@rrte/editor';
import { TextAlign } from '@rrte/extension-text-align';
import { Paragraph } from '@rrte/extension-paragraph';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

describe('Text align', () => {
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
    render(<Editor editorRef={editorRef} content={content} extensions={[Paragraph(), TextAlign()]} />);

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
    render(<Editor editorRef={editorRef} content={content} extensions={[Paragraph(), TextAlign()]} />);

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
    render(<Editor editorRef={editorRef} content={content} extensions={[Paragraph(), TextAlign()]} />);

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
    render(<Editor editorRef={editorRef} content={content} extensions={[Paragraph(), TextAlign()]} />);

    const paragraph = screen.getByTestId('paragraph');

    expect(paragraph.style.textAlign).toEqual('justify');

    expect(editorRef.current.getJSON()).toEqual(content);
  });
});
