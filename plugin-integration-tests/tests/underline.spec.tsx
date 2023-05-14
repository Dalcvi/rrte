/**
 * @jest-environment jsdom
 */

import { Editor } from '@rrte/editor';
import { Paragraph } from '@rrte/extension-paragraph';
import { Underline } from '@rrte/extension-underline';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

describe('Underline', () => {
  it('should render underline text', async () => {
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
                  type: 'underline',
                },
              ],
              text: 'Underline',
            },
          ],
        },
      ],
    };

    const editorRef = {} as any;
    render(<Editor editorRef={editorRef} content={content} extensions={[Paragraph(), Underline()]} />);

    const paragraph = screen.getByTestId('paragraph');
    const underlineTag = paragraph.querySelector('u');

    expect(underlineTag).toBeInTheDocument();
    expect(editorRef.current.getJSON()).toEqual(content);
  });
});
