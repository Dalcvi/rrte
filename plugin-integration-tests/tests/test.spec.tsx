/**
 * @jest-environment jsdom
 */

import { Editor, EditorRef } from '@rrte/editor';
import { TextAlign } from '@rrte/extension-text-align';
import { render, screen, fireEvent, prettyDOM } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import React from 'react';

describe('Editor', () => {
  it('should be able to type', async () => {
    const test = {} as any;
    const renderResult = render(<Editor editorRef={test} content={undefined} extensions={[TextAlign()]} />);

    const textAlignButton = screen.getByTestId('text-align-right-button');
    userEvent.click(textAlignButton);

    (test.current as EditorRef)!.view.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
    (test.current as EditorRef)!.view.dispatchEvent(new KeyboardEvent('keyup', { key: 'a' }));

    console.log(prettyDOM(screen.getByTestId('rrte-editor')));
  });
});
