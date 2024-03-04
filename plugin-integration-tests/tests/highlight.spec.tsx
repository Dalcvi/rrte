/**
 * @jest-environment jsdom
 */

import { Editor } from '../../packages/editor/src';
import { Paragraph } from '../../packages/paragraph/src';
import { Id } from '../../packages/id/src';
import { Highlight } from '../../packages/highlight/src';
import { TextStyle } from '../../packages/text-style/src';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

describe('Highlight', () => {
  it('should attach color to text', async () => {
    const content = {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          attrs: {
            id: '3ca7ad73-3485-4147-a3c3-dc7efecd9f05',
          },
          content: [
            {
              type: 'text',
              marks: [
                {
                  type: 'textStyle',
                  attrs: {
                    backgroundColor: '#ff0000',
                  },
                },
              ],
              text: 'Highlight',
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
        editorExtensions={[Paragraph(), Id(), Highlight(), TextStyle()]}
      />
    );

    const paragraph = screen.getByTestId('paragraph');
    const textSpan = paragraph.querySelector('span');

    expect(textSpan).toBeInTheDocument();
    expect(textSpan?.style.backgroundColor).toEqual('rgb(255, 0, 0)');
    expect(editorRef.current.getJSON()).toEqual(content);
  });
});
