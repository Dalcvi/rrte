import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';
import classes from './placeholder.module.scss';
import { i18next } from '@rrte/i18n';

export type PlaceholderOptions = {
  initialChildName?: string;
  placeholderText?: string;
};

export const PlaceholderExtension = Extension.create<PlaceholderOptions>({
  name: 'placeholder',

  addOptions() {
    return {
      initialChildName: 'paragraph',
      placeholderText: 'placeholder.text',
    };
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey(this.name),
        props: {
          decorations: ({ doc }) => {
            const docChildrenCount = doc.childCount;
            const docFirstChild = doc.firstChild;
            if (docChildrenCount !== 1 || docFirstChild === null) {
              return undefined;
            }

            const firstChildType = docFirstChild.type.name;
            const firstChildChildrenCount = docFirstChild.childCount;

            if (firstChildType !== this.options.initialChildName || firstChildChildrenCount !== 0) {
              return undefined;
            }

            return DecorationSet.create(doc, [
              Decoration.node(0, docFirstChild.nodeSize, {
                class: classes.placeholder,
                'data-rrte-placeholder':
                  i18next.isInitialized &&
                  !!this.options.placeholderText &&
                  i18next.exists(this.options.placeholderText)
                    ? i18next.t(this.options.placeholderText)
                    : this.options.placeholderText,
              }),
            ]);
          },
        },
      }),
    ];
  },
});
