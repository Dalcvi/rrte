/**
 * @jest-environment jsdom
 */

import { Editor } from '@rrte/editor';
import { Paragraph } from '@rrte/extension-paragraph';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

describe('Paragraph', () => {
  it('should render  paragraph', async () => {
    const content = {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
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
    render(<Editor editorRef={editorRef} content={content} extensions={[Paragraph()]} />);

    const paragraph = screen.getByTestId('paragraph');

    expect(paragraph).toBeInTheDocument();
    expect(editorRef.current.getJSON()).toEqual(content);
  });
});
