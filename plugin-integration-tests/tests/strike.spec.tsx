/**
 * @jest-environment jsdom
 */

import { Editor } from '@rrte/editor';
import { Paragraph } from '@rrte/extension-paragraph';
import { Strike } from '@rrte/extension-strike';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

describe('Strike', () => {
  it('should render strike text', async () => {
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
                  type: 'strike',
                },
              ],
              text: 'Strike',
            },
          ],
        },
      ],
    };

    const editorRef = {} as any;
    render(<Editor editorRef={editorRef} content={content} extensions={[Paragraph(), Strike()]} />);

    const paragraph = screen.getByTestId('paragraph');
    const strikeTag = paragraph.querySelector('del');

    expect(strikeTag).toBeInTheDocument();
    expect(editorRef.current.getJSON()).toEqual(content);
  });
});
