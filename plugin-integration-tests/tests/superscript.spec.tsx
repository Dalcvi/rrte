/**
 * @jest-environment jsdom
 */

import { Editor } from '../../packages/editor/src';
import { Paragraph } from '../../packages/extension-paragraph/src';
import { Superscript } from '../../packages/extension-superscript/src';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import userEvent from '@testing-library/user-event';

describe('Superscript', () => {
  it('button should start storedmark', async () => {
    const editorRef = {} as any;
    render(<Editor editorRef={editorRef} content={undefined} extensions={[Paragraph(), Superscript()]} />);

    const button = screen.getByTestId('superscript-button');
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
    render(<Editor editorRef={editorRef} content={content} extensions={[Paragraph(), Superscript()]} />);

    const paragraph = screen.getByTestId('paragraph');
    const superscriptTag = paragraph.querySelector('sup');

    expect(superscriptTag).toBeInTheDocument();
    expect(editorRef.current.getJSON()).toEqual(content);
  });
});
