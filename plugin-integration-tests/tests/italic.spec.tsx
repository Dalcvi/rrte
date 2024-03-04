/**
 * @jest-environment jsdom
 */

import { Editor } from '../../packages/editor/src';
import { Paragraph } from '../../packages/extension-paragraph/src';
import { Italic } from '../../packages/extension-italic/src';
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
    render(<Editor editorRef={editorRef} content={content} editorExtensions={[Paragraph(), Italic()]} />);

    const paragraph = screen.getByTestId('paragraph');
    const italicTag = paragraph.querySelector('em');

    expect(italicTag).toBeInTheDocument();
    expect(editorRef.current.getJSON()).toEqual(content);
  });
});
