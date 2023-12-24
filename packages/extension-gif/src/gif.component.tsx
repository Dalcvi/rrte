import { Editor } from '@tiptap/core';
import classes from './gif.component.module.scss';
import { GifAttributes } from './node';
import { useEffect, useRef, useState } from 'react';
import { NodeView } from '@rrte/common';
import classNames from 'classnames';

type GifNode = {
  attrs: GifAttributes & { id: string };
};

export const GifComponent = ({
  editor,
  node,
  selected,
}: {
  editor: Editor;
  node: GifNode;
  selected: boolean;
}) => {
  const [gifWidth, setWidth] = useState(
    node.attrs.customSize
      ? node.attrs.customWidth ?? undefined
      : node.attrs.originalWidth ?? undefined
  );
  const [gifHeight, setHeight] = useState(
    node.attrs.customSize
      ? node.attrs.customHeight ?? undefined
      : node.attrs.originalHeight ?? undefined
  );
  const gifRef = useRef<HTMLElement>(null);

  const [isSelected, setIsSelected] = useState(false);
  const showSelection = isSelected || selected;
  const alignment = node.attrs.alignment;

  useEffect(() => {
    if (
      gifRef.current &&
      (!node.attrs.customSize ||
        (!node.attrs.customSize &&
          (node.attrs.customWidth === null || node.attrs.customHeight === null)))
    ) {
      const gif = gifRef.current;
      const { width, height } = gif.getBoundingClientRect();
      if (width !== gifWidth || height !== gifHeight) {
        setWidth(width);
        setHeight(height);
      }
    }
    if (
      node.attrs.customSize &&
      (gifWidth !== node.attrs.customWidth || gifHeight !== node.attrs.customHeight)
    ) {
      setWidth(node.attrs.customWidth ?? undefined);
      setHeight(node.attrs.customHeight ?? undefined);
    }
  }, [gifRef.current, node.attrs.customSize, node.attrs.customWidth, node.attrs.customHeight]);

  useEffect(() => {
    const func = ({ editor }: { editor: Editor }) => {
      const nodeId = node.attrs.id;
      editor.view.state.doc.descendants((node, pos) => {
        if (node.type.name === 'gif' && node.attrs.id === nodeId) {
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

  return (
    <NodeView
      isEditable={editor.isEditable}
      selected={showSelection}
      draggable
      className={classNames({
        [classes.left]: alignment === 'left',
        [classes.center]: alignment === 'center',
        [classes.right]: alignment === 'right',
      })}
    >
      {node.attrs.webp ? (
        <div className={classes.imageWrapper} data-testid="gif-comp-img">
          <img
            ref={gifRef as React.RefObject<HTMLImageElement>}
            className={classes.gif}
            src={node.attrs.webp}
            alt={node.attrs.alt ?? undefined}
            width={gifWidth}
            height={gifHeight}
            // style={style}
          />
        </div>
      ) : (
        <video
          data-testid="gif-comp-vid"
          ref={gifRef as React.RefObject<HTMLVideoElement>}
          className={classes.gif}
          autoPlay
          loop
          src={node.attrs.mp4}
          width={gifWidth}
          height={gifHeight}
          // style={style}
        />
      )}
      <div className={classes.videoContainer}></div>
    </NodeView>
  );
};
