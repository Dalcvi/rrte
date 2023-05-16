import { NodeViewWrapper } from '@tiptap/react';
import classes from './node-view.module.scss';
import classNames from 'classnames';
import { CSSProperties } from 'react';

export const NodeView = ({
  className,
  selected,
  draggable,
  children,
  isEditable,
  style,
}: {
  isEditable: boolean;
  className?: string;
  selected: boolean;
  children: React.ReactNode;
  draggable?: boolean;
  style?: CSSProperties;
}) => {
  return (
    <NodeViewWrapper>
      <div
        className={classNames(classes.container, className, {
          [classes.selected]: selected && isEditable,
          [classes.editable]: isEditable,
        })}
        style={style}
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
