/**
 * @jest-environment jsdom
 */

import { Editor } from '@rrte/editor';
import { Paragraph } from '@rrte/extension-paragraph';
import { Italic } from '@rrte/extension-italic';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

describe('Italic', () => {
  it('should render italic text', async () => {
    const content = {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              marks: [
                {
                  type: 'italic',
                },
              ],
              text: 'Italic',
            },
          ],
        },
      ],
    };

    const editorRef = {} as any;
    render(<Editor editorRef={editorRef} content={content} extensions={[Paragraph(), Italic()]} />);

    const paragraph = screen.getByTestId('paragraph');
    const italicTag = paragraph.querySelector('em');

    expect(italicTag).toBeInTheDocument();
    expect(editorRef.current.getJSON()).toEqual(content);
  });
});
