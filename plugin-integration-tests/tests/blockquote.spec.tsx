/**
 * @jest-environment jsdom
 */

import { Editor } from '../../packages/editor/src';
import { Paragraph } from '../../packages/paragraph/src';
import { Blockquote } from '../../packages/blockquote/src';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import userEvent from '@testing-library/user-event';

describe('Blockquote', () => {
  it('button press should add blockquote', async () => {
    render(<Editor content={undefined} editorExtensions={[Paragraph(), Blockquote()]} />);

    const button = screen.getByTestId('blockquote-button.text-regular-button');
    await userEvent.click(button);

    const blockquoteTag = screen.getByTestId('blockquote');

    expect(blockquoteTag).toBeInTheDocument();
  });

  it('should render blockquote', async () => {
    const content = {
      type: 'doc',
      content: [
        {
          type: 'blockquote',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Blockquote',
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
        editorExtensions={[Paragraph(), Blockquote()]}
      />
    );

    const blockquoteTag = screen.getByTestId('blockquote');

    expect(blockquoteTag).toBeInTheDocument();
    expect(editorRef.current.getJSON()).toEqual(content);
  });
});
