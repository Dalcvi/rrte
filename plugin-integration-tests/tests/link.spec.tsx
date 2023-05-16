/**
 * @jest-environment jsdom
 */

import { Editor } from '../../packages/editor/src';
import { Paragraph } from '../../packages/extension-paragraph/src';
import { Link } from '../../packages/extension-link/src';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

describe('Link', () => {
  it('should render link', async () => {
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
                  type: 'link',
                  attrs: {
                    href: 'https://www.google.com',
                    target: '_blank',
                  },
                },
              ],
              text: 'Link',
            },
          ],
        },
      ],
    };

    const editorRef = {} as any;
    render(<Editor editorRef={editorRef} content={content} extensions={[Paragraph(), Link()]} />);

    const paragraph = screen.getByTestId('paragraph');
    const linkTag = paragraph.querySelector('a');

    expect(linkTag).toBeInTheDocument();
    expect(editorRef.current.getJSON()).toEqual(content);
  });
});
