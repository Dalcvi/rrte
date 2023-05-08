import { RegularButtonConfig } from './';
import type { Editor } from '@tiptap/react';
import classNames from 'classnames';
import classes from './regular-button.module.scss';

export const RegularButton = (props: RegularButtonConfig & { editor: Editor; config: Record<string, any> }) => {
  const { editor, config, Button, name } = props;
  return <Button key={name} editor={editor} config={config} />;
};
