/**
 * @jest-environment jsdom
 */

import { Editor } from '../../packages/editor/src';
import { Paragraph } from '../../packages/extension-paragraph/src';
import { Id } from '../../packages/extension-id/src';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

describe('Id', () => {
  it('should attach id to paragraph', async () => {
    const content = {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          attrs: {
            id: '386c0234-8b3e-4b5c-993f-abd5a70d35a8',
          },
          content: [
            {
              type: 'text',
              text: 'Test',
            },
          ],
        },
      ],
    };

    const editorRef = {} as any;
    render(<Editor editorRef={editorRef} content={content} extensions={[Paragraph(), Id()]} />);

    const paragraph = screen.getByTestId('paragraph');

    expect(paragraph).toBeInTheDocument();
    expect(paragraph.id).toEqual('386c0234-8b3e-4b5c-993f-abd5a70d35a8');
    expect(editorRef.current.getJSON()).toEqual(content);
  });
});
