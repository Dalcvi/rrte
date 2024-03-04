import { DropdownConfig, DropdownValue, ToolbarItemType } from '@rrte/common';
import classes from './toolbar.module.scss';
import classNames from 'classnames';
import { HeadingNode, Level } from '../node';

const createValue = (level: Level): DropdownValue => ({
  name: `heading ${level}`,
  priority: 7 - level,
  onClick: ({ editor }) => {
    editor.chain().focus().setHeading({ level }).run();
  },
  isActive: ({ editor }) => {
    return editor.isActive(HeadingNode.name, { level });
  },
  className: classNames(classes.toolbarItem, classes[`h${level}`]),
  text: `Heading ${level}`,
});

export const ToolbarDropdown: DropdownConfig = {
  name: 'text type',
  type: ToolbarItemType.DROPDOWN,
  text: 'Text type',
  priority: 105,
  DropdownPriority: 1000,
  values: [
    createValue(1),
    createValue(2),
    createValue(3),
    createValue(4),
    createValue(5),
    createValue(6),
  ],
};
