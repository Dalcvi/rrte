import { RegularButtonConfig } from './';
import type { Editor } from '@tiptap/react';
import classNames from 'classnames';
import classes from './regular-button.module.scss';

export const RegularButton = (props: RegularButtonConfig & { editor: Editor }) => {
  const { editor, ...item} = props;
  const { Button } = item;
  return (
    <Button
      key={item.name}
      editor={editor}
    />
  );
};
