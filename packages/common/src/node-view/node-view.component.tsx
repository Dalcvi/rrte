import { NodeViewWrapper } from '@tiptap/react';
import classes from './node-view.module.scss';
import classNames from 'classnames';

export const NodeView = ({
  className,
  selected,
  draggable,
  children,
}: {
  className?: string;
  selected: boolean;
  children: React.ReactNode;
  draggable?: boolean;
}) => {
  return (
    <NodeViewWrapper>
      <div
        className={classNames(classes.container, className, {
          [classes.selected]: selected,
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
