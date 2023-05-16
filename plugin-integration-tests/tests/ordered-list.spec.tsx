/**
 * @jest-environment jsdom
 */

import { Editor } from '../../packages/editor/src';
import { Paragraph } from '../../packages/extension-paragraph/src';
import { OrderedList } from '../../packages/extension-ordered-list/src';
import { ListItem } from '../../packages/extension-list-item/src';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

describe('Ordered list', () => {
  it('should render ordered list', async () => {
    const content = {
      type: 'doc',
      content: [
        {
          type: 'orderedList',
          attrs: {
            start: 1,
          },
          content: [
            {
              type: 'listItem',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: ' or',
                    },
                  ],
                },
              ],
            },
            {
              type: 'listItem',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'dered',
                    },
                  ],
                },
              ],
            },
            {
              type: 'listItem',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'lsist',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };

    const editorRef = {} as any;
    render(<Editor editorRef={editorRef} content={content} extensions={[Paragraph(), OrderedList(), ListItem()]} />);

    const orderedList = screen.getByTestId('orderedList');

    expect(orderedList).toBeInTheDocument();
    expect(editorRef.current.getJSON()).toEqual(content);
  });
});
