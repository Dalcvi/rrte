import { Editor, findParentNodeClosestToPos } from '@tiptap/core';

const getParentAttribute = (attribute: string, editor: Editor): AttributeValue | undefined => {
  const parent = findParentNodeClosestToPos(
    editor.state.selection.$from,
    (node) => node.type.name !== 'textStyle',
  )?.node;
  if (parent && parent.attrs?.[attribute]) {
    return { value: parent.attrs[attribute], id: parent.attrs.id };
  }
};

export type AttributeValue = { value: string; id: string };
export const currentSelectionAttributeValue =
  (attribute: string) =>
  (editor: Editor): AttributeValue | undefined => {
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
