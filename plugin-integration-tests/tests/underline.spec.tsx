/**
 * @jest-environment jsdom
 */

import { Editor } from '../../packages/editor/src';
import { Paragraph } from '../../packages/paragraph/src';
import { Underline } from '../../packages/underline/src';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import userEvent from '@testing-library/user-event';

describe('Underline', () => {
  it('button should start storedmark', async () => {
    const editorRef = {} as any;
    render(
      <Editor
        editorRef={editorRef}
        content={undefined}
        editorExtensions={[Paragraph(), Underline()]}
      />
    );

    const underlineButton = screen.getByTestId('underline-button.text-regular-button');
    await userEvent.click(underlineButton);

    expect(editorRef.current.view.state.storedMarks[0].type.name).toEqual('underline');
  });
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
    render(
      <Editor
        editorRef={editorRef}
        content={content}
        editorExtensions={[Paragraph(), Underline()]}
      />
    );

    const paragraph = screen.getByTestId('paragraph');
    const underlineTag = paragraph.querySelector('u');

    expect(underlineTag).toBeInTheDocument();
    expect(editorRef.current.getJSON()).toEqual(content);
  });
});
