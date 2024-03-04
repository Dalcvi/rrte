/**
 * @jest-environment jsdom
 */

import { Editor } from '../../packages/editor/src';
import { Paragraph } from '../../packages/extension-paragraph/src';
import { Heading } from '../../packages/extension-heading/src';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import userEvent from '@testing-library/user-event';

describe('Paragraph', () => {
  it('button press should change back to paragraph', async () => {
    const editorRef = {} as any;
    render(
      <Editor editorRef={editorRef} content={undefined} editorExtensions={[Paragraph(), Heading()]} />
    );

    const button = screen.getByTestId('text type');
    await userEvent.click(button);

    const heading2 = screen.getByTestId('heading 2');
    await userEvent.click(heading2);

    await userEvent.click(button);
    const paragraph = screen.getByTestId('Paragraph');
    await userEvent.click(paragraph);

    const content = JSON.stringify(editorRef.current.getJSON());

    expect(content.includes('paragraph')).toBeTruthy();
  });
  it('should render  paragraph', async () => {
    const content = {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Sveiki',
            },
          ],
        },
      ],
    };

    const editorRef = {} as any;
    render(<Editor editorRef={editorRef} content={content} editorExtensions={[Paragraph()]} />);

    const paragraph = screen.getByTestId('paragraph');

    expect(paragraph).toBeInTheDocument();
    expect(editorRef.current.getJSON()).toEqual(content);
  });
});
