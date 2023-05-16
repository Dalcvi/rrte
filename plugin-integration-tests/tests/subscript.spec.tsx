/**
 * @jest-environment jsdom
 */

import { Editor } from '../../packages/editor/src';
import { Paragraph } from '../../packages/extension-paragraph/src';
import { Subscript } from '../../packages/extension-subscript/src';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import userEvent from '@testing-library/user-event';

describe('Subscript', () => {
  it('button should start storedmark', async () => {
    const editorRef = {} as any;
    render(<Editor editorRef={editorRef} content={undefined} extensions={[Paragraph(), Subscript()]} />);

    const button = screen.getByTestId('subscript-button');
    await userEvent.click(button);

    expect(editorRef.current.view.state.storedMarks[0].type.name).toEqual('subscript');
  });

  it('should render subscript text', async () => {
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
                  type: 'subscript',
                },
              ],
              text: 'Subscript',
            },
          ],
        },
      ],
    };

    const editorRef = {} as any;
    render(<Editor editorRef={editorRef} content={content} extensions={[Paragraph(), Subscript()]} />);

    const paragraph = screen.getByTestId('paragraph');
    const subscriptTag = paragraph.querySelector('sub');

    expect(subscriptTag).toBeInTheDocument();
    expect(editorRef.current.getJSON()).toEqual(content);
  });
});
