import { NodeViewWrapper } from '@tiptap/react';
import classes from './node-view.module.scss';
import classNames from 'classnames';

export const NodeView = ({
  className,
  selected,
  draggable,
  children,
  isEditable,
}: {
  isEditable: boolean;
  className?: string;
  selected: boolean;
  children: React.ReactNode;
  draggable?: boolean;
}) => {
  return (
    <NodeViewWrapper>
      <div
        className={classNames(classes.container, className, {
          [classes.selected]: selected && isEditable,
          [classes.editable]: isEditable,
        })}
      >
        {draggable ? (
          <div data-drag-handle className={classes.drag}>
            {children}
          </div>
        ) : (
          children
        )}
      </div>
    </NodeViewWrapper>
  );
};
