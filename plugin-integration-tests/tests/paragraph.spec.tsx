/**
 * @jest-environment jsdom
 */

import { Editor } from '../../packages/editor/src';
import { Paragraph } from '../../packages/paragraph/src';
import { Heading } from '../../packages/heading/src';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import userEvent from '@testing-library/user-event';

describe('Paragraph', () => {
  it('button press should change back to paragraph', async () => {
    const editorRef = {} as any;
    render(
      <Editor
        editorRef={editorRef}
        content={undefined}
        editorExtensions={[Paragraph(), Heading()]}
      />
    );

    const paragraphBefore = document.querySelector('p');
    expect(paragraphBefore).toBeInTheDocument();

    const button = screen.getByTestId('text-styles-dropdown.text-dropdown-button');
    await userEvent.click(button);

    const heading2 = screen.getByTestId('heading-2-option-dropdown-item-1');
    await userEvent.click(heading2);

    expect(paragraphBefore).not.toBeInTheDocument();
    const headingAfter = document.querySelector('h2');
    expect(headingAfter).toBeInTheDocument();

    await userEvent.click(button);
    const paragraph = screen.getByTestId('paragraph-option-dropdown-item-6');
    await userEvent.click(paragraph);

    const paragraphAfter = document.querySelector('p');
    expect(paragraphAfter).toBeInTheDocument();
    expect(headingAfter).not.toBeInTheDocument();

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
