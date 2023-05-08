import { Editor, findParentNodeClosestToPos } from '@tiptap/core';
import { CSSProperties } from 'react';

export const getParentAttribute = (attribute: string, editor: Editor): AttributeValue | undefined => {
  const parent = findParentNodeClosestToPos(
    editor.state.selection.$from,
    (node) => node.type.name !== 'textStyle',
  )?.node;
  if (parent && parent.attrs?.id) {
    const parentElement = document.getElementById(parent.attrs.id);
    if (parentElement) {
      const computedStyle = window.getComputedStyle(parentElement);
      return { value: computedStyle.getPropertyValue(attribute), id: parent.attrs.id };
    }
  }
};

export type AttributeValue = { value: string; id: string };

export const currentSelectionAttributeValue = (
  attribute: keyof CSSProperties,
  editor: Editor,
): AttributeValue | undefined => {
  if (typeof attribute === 'symbol') {
    throw new Error('attribute must not be a symbol');
  }
  if (editor.state.selection.$from.pos !== editor.state.selection.$to.pos) {
    const node = editor.state.doc.nodeAt(editor.state.selection.$from.pos);
    if (node === null) {
      return undefined;
    }

    const marksAttr = node.marks.find((mark) => mark?.attrs?.[attribute]);
    if (marksAttr) {
      return marksAttr.attrs[attribute];
    }

    if (node.attrs?.[attribute]) {
      return node.attrs[attribute];
    }

    return getParentAttribute(attribute, editor);
  }

  const textStyleAttribute = editor.getAttributes('textStyle')[attribute];
  return textStyleAttribute ?? getParentAttribute(attribute, editor);
};
