import { Level, name as headingName } from '@rrte/heading';
import { Editor } from '@tiptap/core';
import type { Node } from '@tiptap/pm/model';
import type { Transaction } from '@tiptap/pm/state';
import { useCallback, useEffect, useState } from 'react';

import { NodeView } from '@rrte/common';
import classNames from 'classnames';
import classes from './table-of-contents.component.module.scss';
import { TableOfContentsNode } from './node';
import { useTranslations } from '@rrte/i18n';

type HeadingInformation = {
  level: Level;
  text: string;
  id: string;
};

const setId = ({
  transaction,
  id,
  pos,
  node,
}: {
  transaction: Transaction;
  id: string;
  pos: number;
  node: Node;
}) =>
  transaction.setNodeMarkup(pos, undefined, {
    ...node.attrs,
    id,
  });

export const TableOfContents = ({
  editor,
  selected,
  node,
}: {
  editor: Editor;
  selected: boolean;
  node: { attrs: { id: string } };
}) => {
  const [items, setItems] = useState<HeadingInformation[]>([]);
  const { t } = useTranslations();

  const [isSelected, setIsSelected] = useState(false);
  const showSelection = isSelected || selected;

  useEffect(() => {
    const func = ({ editor }: { editor: Editor }) => {
      const nodeId = node.attrs.id;

      editor.view.state.doc.descendants((node, pos) => {
        if (node.type.name === TableOfContentsNode.name && node.attrs.id === nodeId) {
          const { from, to } = editor.state.selection;
          if (from <= pos && to >= pos) {
            setIsSelected(true);
            return false;
          }
          setIsSelected(false);
          return false;
        }
      });
      return true;
    };

    editor.on('selectionUpdate', func);

    return () => {
      editor.off('selectionUpdate', func);
    };
  }, [node.attrs.id]);

  const handleUpdate = useCallback(() => {
    const headings = [] as HeadingInformation[];
    const transaction = editor.state.tr;

    editor.state.doc.descendants((node, pos) => {
      if (node.type.name === headingName) {
        const id = `heading-${headings.length + 1}`;

        if (node.attrs.headingId !== id) {
          setId({
            transaction,
            id,
            pos,
            node,
          });
        }

        headings.push({
          level: node.attrs.level,
          text: node.textContent,
          id,
        });
      }
    });

    transaction.setMeta('addToHistory', false);
    transaction.setMeta('preventUpdate', true);

    editor.view.dispatch(transaction);

    setItems(headings);
  }, [editor]);

  useEffect(() => {
    handleUpdate();
    editor.on('update', handleUpdate);

    return () => {
      editor.off('update', handleUpdate);
    };
  }, [editor]);

  return (
    <NodeView
      draggable={true}
      isEditable={editor.isEditable}
      selected={showSelection}
      className={classes.tableOfContentsWrapper}
    >
      <h2 className={classes.tableHeader}>{t('table-of-contents.title')}</h2>
      <ul className={classes.tableOfContents}>
        {items.map((item, index) => (
          <li
            key={index}
            className={classNames(
              classes.tableOfContentsItem,
              classes[`tableOfContentsItemLevel${item.level}`]
            )}
          >
            <a href={`#${item.id}`}>{item.text}</a>
          </li>
        ))}
      </ul>
    </NodeView>
  );
};
