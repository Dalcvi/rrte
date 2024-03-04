/**
 * @jest-environment jsdom
 */

import { Editor } from '../../packages/editor/src';
import { Paragraph } from '../../packages/paragraph/src';
import { Id } from '../../packages/id/src';
import { FontSize } from '../../packages/font-size/src';
import { TextStyle } from '../../packages/text-style/src';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

describe('Font size', () => {
  it('should attach font size to text', async () => {
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
                    fontSize: '12px',
                  },
                },
              ],
              text: 'FontSize',
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
        editorExtensions={[Paragraph(), Id(), FontSize(), TextStyle()]}
      />
    );

    const paragraph = screen.getByTestId('paragraph');
    const textSpan = paragraph.querySelector('span');

    expect(textSpan).toBeInTheDocument();
    expect(textSpan?.style.fontSize).toEqual('12px');
    expect(editorRef.current.getJSON()).toEqual(content);
  });
});
