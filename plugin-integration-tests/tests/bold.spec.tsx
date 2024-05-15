/**
 * @jest-environment jsdom
 */

import { Editor } from '../../packages/editor/src';
import { Paragraph } from '../../packages/paragraph/src';
import { Bold } from '../../packages/bold/src';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import userEvent from '@testing-library/user-event';

describe('Bold', () => {
  it('button should start storedmark', async () => {
    const editorRef = {} as any;
    render(
      <Editor editorRef={editorRef} content={undefined} editorExtensions={[Paragraph(), Bold()]} />
    );

    const button = screen.getByTestId('bold-button.text-regular-button');
    await userEvent.click(button);

    expect(editorRef.current.view.state.storedMarks[0].type.name).toEqual('bold');
  });
  it('should render bold text', async () => {
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
                  type: 'bold',
                },
              ],
              text: 'Bold',
            },
          ],
        },
      ],
    };

    const editorRef = {} as any;
    render(
      <Editor editorRef={editorRef} content={content} editorExtensions={[Paragraph(), Bold()]} />
    );

    const paragraph = screen.getByTestId('paragraph');
    const boldTag = paragraph.querySelector('strong');

    expect(boldTag).toBeInTheDocument();
    expect(editorRef.current.getJSON()).toEqual(content);
  });
});
