/**
 * @jest-environment jsdom
 */

import { Editor } from '@rrte/editor';
import { Heading } from '@rrte/extension-heading';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

describe('Heading', () => {
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
    render(<Editor editorRef={editorRef} content={content} extensions={[Heading()]} />);

    expect(editorRef.current.getJSON()).toEqual(content);
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
    render(<Editor editorRef={editorRef} content={content} extensions={[Heading()]} />);

    expect(editorRef.current.getJSON()).toEqual(content);
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
    render(<Editor editorRef={editorRef} content={content} extensions={[Heading()]} />);

    expect(editorRef.current.getJSON()).toEqual(content);
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
    render(<Editor editorRef={editorRef} content={content} extensions={[Heading()]} />);

    expect(editorRef.current.getJSON()).toEqual(content);
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
    render(<Editor editorRef={editorRef} content={content} extensions={[Heading()]} />);

    expect(editorRef.current.getJSON()).toEqual(content);
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
    render(<Editor editorRef={editorRef} content={content} extensions={[Heading()]} />);

    expect(editorRef.current.getJSON()).toEqual(content);
  });
});
