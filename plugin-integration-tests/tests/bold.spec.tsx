/**
 * @jest-environment jsdom
 */

import { Editor } from '@rrte/editor';
import { Paragraph } from '@rrte/extension-paragraph';
import { Bold } from '@rrte/extension-bold';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

describe('Bold', () => {
  it('should render bold text', async () => {
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
                  type: 'bold',
                },
              ],
              text: 'Bold',
            },
          ],
        },
      ],
    };

    const editorRef = {} as any;
    render(<Editor editorRef={editorRef} content={content} extensions={[Paragraph(), Bold()]} />);

    const paragraph = screen.getByTestId('paragraph');
    const boldTag = paragraph.querySelector('strong');

    expect(boldTag).toBeInTheDocument();
    expect(editorRef.current.getJSON()).toEqual(content);
  });
});
