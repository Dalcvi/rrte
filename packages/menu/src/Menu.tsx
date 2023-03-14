import * as React from "react";
import { Editor } from '@tiptap/react';

export const Menu = ({
    editor
}: {editor: Editor}) => {
    return <div>
        <button onClick={() => {
            editor.chain().focus().toggleBold();
        }}>bold</button>
    </div>;
}