/**
 * @jest-environment jsdom
 */

import { Editor } from '../../packages/editor/src';
import { Paragraph } from '../../packages/paragraph/src';
import { Superscript } from '../../packages/superscript/src';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import userEvent from '@testing-library/user-event';

describe('Superscript', () => {
  it('button should start storedmark', async () => {
    const editorRef = {} as any;
    render(
      <Editor
        editorRef={editorRef}
        content={undefined}
        editorExtensions={[Paragraph(), Superscript()]}
      />
    );

    const button = screen.getByTestId('superscript-button.text-regular-button');
    await userEvent.click(button);

    expect(editorRef.current.view.state.storedMarks[0].type.name).toEqual('superscript');
  });

  it('should render superscript text', async () => {
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
                  type: 'superscript',
                },
              ],
              text: 'Superscript',
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
        editorExtensions={[Paragraph(), Superscript()]}
      />
    );

    const paragraph = screen.getByTestId('paragraph');
    const superscriptTag = paragraph.querySelector('sup');

    expect(superscriptTag).toBeInTheDocument();
    expect(editorRef.current.getJSON()).toEqual(content);
  });
});
