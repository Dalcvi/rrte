/**
 * @jest-environment jsdom
 */

import { Editor } from '../../packages/editor/src';
import { Heading } from '../../packages/heading/src';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import userEvent from '@testing-library/user-event';

describe('Heading', () => {
  it('button press should add heading', async () => {
    const editorRef = {} as any;
    render(<Editor editorRef={editorRef} content={undefined} editorExtensions={[Heading()]} />);

    const button = screen.getByTestId('text-styles-dropdown.text-dropdown-button');
    await userEvent.click(button);

    const heading2 = screen.getByTestId('heading-2-option-dropdown-item-1');
    await userEvent.click(heading2);

    const content = JSON.stringify(editorRef.current.getJSON());

    expect(content.includes('level":2')).toBeTruthy();
  });

  it('should render h1', async () => {
    const content = {
      type: 'doc',
      content: [
        {
          type: 'heading',
          attrs: {
            level: 1,
          },
        },
      ],
    };

    const editorRef = {} as any;
    render(<Editor editorRef={editorRef} content={content} editorExtensions={[Heading()]} />);

    expect(editorRef.current.getJSON()).toEqual(content);
    expect(document.querySelector('h1')).toBeInTheDocument();
  });

  it('should render h2', async () => {
    const content = {
      type: 'doc',
      content: [
        {
          type: 'heading',
          attrs: {
            level: 2,
          },
        },
      ],
    };

    const editorRef = {} as any;
    render(<Editor editorRef={editorRef} content={content} editorExtensions={[Heading()]} />);

    expect(editorRef.current.getJSON()).toEqual(content);
    expect(document.querySelector('h2')).toBeInTheDocument();
  });

  it('should render h3', async () => {
    const content = {
      type: 'doc',
      content: [
        {
          type: 'heading',
          attrs: {
            level: 3,
          },
        },
      ],
    };

    const editorRef = {} as any;
    render(<Editor editorRef={editorRef} content={content} editorExtensions={[Heading()]} />);

    expect(editorRef.current.getJSON()).toEqual(content);
    expect(document.querySelector('h3')).toBeInTheDocument();
  });

  it('should render h4', async () => {
    const content = {
      type: 'doc',
      content: [
        {
          type: 'heading',
          attrs: {
            level: 4,
          },
        },
      ],
    };

    const editorRef = {} as any;
    render(<Editor editorRef={editorRef} content={content} editorExtensions={[Heading()]} />);

    expect(editorRef.current.getJSON()).toEqual(content);
    expect(document.querySelector('h4')).toBeInTheDocument();
  });

  it('should render h5', async () => {
    const content = {
      type: 'doc',
      content: [
        {
          type: 'heading',
          attrs: {
            level: 5,
          },
        },
      ],
    };

    const editorRef = {} as any;
    render(<Editor editorRef={editorRef} content={content} editorExtensions={[Heading()]} />);

    expect(editorRef.current.getJSON()).toEqual(content);
    expect(document.querySelector('h5')).toBeInTheDocument();
  });

  it('should render h6', async () => {
    const content = {
      type: 'doc',
      content: [
        {
          type: 'heading',
          attrs: {
            level: 6,
          },
        },
      ],
    };

    const editorRef = {} as any;
    render(<Editor editorRef={editorRef} content={content} editorExtensions={[Heading()]} />);

    expect(editorRef.current.getJSON()).toEqual(content);
    expect(document.querySelector('h6')).toBeInTheDocument();
  });
});
