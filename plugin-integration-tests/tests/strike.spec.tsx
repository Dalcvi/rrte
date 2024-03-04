/**
 * @jest-environment jsdom
 */

import { Editor } from '../../packages/editor/src';
import { Paragraph } from '../../packages/extension-paragraph/src';
import { Strike } from '../../packages/extension-strike/src';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import React from 'react';

describe('Strike', () => {
  it('button should start storedmark', async () => {
    const editorRef = {} as any;
    render(
      <Editor
        editorRef={editorRef}
        content={undefined}
        editorExtensions={[Paragraph(), Strike()]}
      />
    );

    const strikeButton = screen.getByTestId('strike-button');
    await userEvent.click(strikeButton);

    expect(editorRef.current.view.state.storedMarks[0].type.name).toEqual('strike');
  });
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
    render(
      <Editor editorRef={editorRef} content={content} editorExtensions={[Paragraph(), Strike()]} />
    );

    const paragraph = screen.getByTestId('paragraph');
    const strikeTag = paragraph.querySelector('del');

    expect(strikeTag).toBeInTheDocument();
    expect(editorRef.current.getJSON()).toEqual(content);
  });
});
