/**
 * @jest-environment jsdom
 */

import { Editor } from '../../packages/editor/src';
import { Paragraph } from '../../packages/extension-paragraph/src';
import { Id } from '../../packages/extension-id/src';
import { Color } from '../../packages/extension-color/src';
import { TextStyle } from '../../packages/extension-text-style/src';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

describe('Color', () => {
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
                    color: '#ff0000',
                  },
                },
              ],
              text: 'Color',
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
        extensions={[Paragraph(), Id(), Color(), TextStyle()]}
      />
    );

    const paragraph = screen.getByTestId('paragraph');
    const textSpan = paragraph.querySelector('span');

    expect(textSpan).toBeInTheDocument();
    expect(textSpan?.style.color).toEqual('rgb(255, 0, 0)');
    expect(editorRef.current.getJSON()).toEqual(content);
  });
});
