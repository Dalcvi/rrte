/**
 * @jest-environment jsdom
 */

import { Editor } from '../../packages/editor/src';
import { Paragraph } from '../../packages/extension-paragraph/src';
import { BulletList } from '../../packages/extension-bullet-list/src';
import { ListItem } from '../../packages/extension-list-item/src';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import userEvent from '@testing-library/user-event';

describe('Bullet list', () => {
  it('button press should add bullet list', async () => {
    const editorRef = {} as any;
    render(
      <Editor
        editorRef={editorRef}
        content={undefined}
        editorExtensions={[Paragraph(), BulletList(), ListItem()]}
      />
    );

    const button = screen.getByTestId('bullet-list-button');
    await userEvent.click(button);

    const bulletListTag = screen.getByTestId('bulletList');

    expect(bulletListTag).toBeInTheDocument();
  });
  it('should render bullet list', async () => {
    const content = {
      type: 'doc',
      content: [
        {
          type: 'bulletList',
          content: [
            {
              type: 'listItem',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'Bull',
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
                      text: 'let',
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
                      text: 'list',
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
    render(
      <Editor
        editorRef={editorRef}
        content={content}
        editorExtensions={[Paragraph(), BulletList(), ListItem()]}
      />
    );

    const bulletList = screen.getByTestId('bulletList');

    expect(bulletList).toBeInTheDocument();
    expect(editorRef.current.getJSON()).toEqual(content);
  });
});
