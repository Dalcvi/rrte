/**
 * @jest-environment jsdom
 */

import { Editor } from '../../packages/editor/src';
import { Paragraph } from '../../packages/paragraph/src';
import { Code } from '../../packages/code/src';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import userEvent from '@testing-library/user-event';

describe('Code', () => {
  it('button should start storedmark', async () => {
    const editorRef = {} as any;
    render(
      <Editor editorRef={editorRef} content={undefined} editorExtensions={[Paragraph(), Code()]} />
    );

    const button = screen.getByTestId('code-button.text-regular-button');
    await userEvent.click(button);

    expect(editorRef.current.view.state.storedMarks[0].type.name).toEqual('code');
  });
  it('should render code text', async () => {
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
                  type: 'code',
                },
              ],
              text: 'Code today',
            },
            {
              type: 'text',
              text: ' ',
            },
          ],
        },
      ],
    };

    const editorRef = {} as any;
    render(
      <Editor editorRef={editorRef} content={content} editorExtensions={[Paragraph(), Code()]} />
    );

    const paragraph = screen.getByTestId('paragraph');
    const codeTag = paragraph.querySelector('code');

    expect(codeTag).toBeInTheDocument();
    expect(editorRef.current.getJSON()).toEqual(content);
  });
});
