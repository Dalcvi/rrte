/**
 * @jest-environment jsdom
 */

import { Editor } from '../../packages/editor/src';
import { Paragraph } from '../../packages/extension-paragraph/src';
import { CodeBlock } from '../../packages/extension-code-block/src';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import userEvent from '@testing-library/user-event';

describe('Code block', () => {
  it('button press should add code block', async () => {
    const editorRef = {} as any;
    render(<Editor editorRef={editorRef} content={undefined} extensions={[Paragraph(), CodeBlock()]} />);

    const button = screen.getByTestId('codeblock-button');
    await userEvent.click(button);

    const preTag = screen.getByTestId('codeBlock');
    const codeTag = preTag?.querySelector('code');

    expect(preTag).toBeInTheDocument();
    expect(codeTag).toBeInTheDocument();
  });
  it('should render code block', async () => {
    const content = {
      type: 'doc',
      content: [
        {
          type: 'codeBlock',
          content: [
            {
              type: 'text',
              text: 'Codeblock',
            },
          ],
        },
      ],
    };

    const editorRef = {} as any;
    render(<Editor editorRef={editorRef} content={content} extensions={[Paragraph(), CodeBlock()]} />);

    const preTag = screen.getByTestId('codeBlock');
    const codeTag = preTag?.querySelector('code');

    expect(preTag).toBeInTheDocument();
    expect(codeTag).toBeInTheDocument();
    expect(editorRef.current.getJSON()).toEqual(content);
  });
});
