import { Editor } from '@tiptap/core';
import classes from './gif.component.module.scss';
import { GifAttributes } from './node';
import { useEffect, useState } from 'react';
import { NodeView } from '@rrte/common';
import classNames from 'classnames';

type GifNode = {
  attrs: GifAttributes & { id: string };
};

export const GifComponent = ({ editor, node, selected }: { editor: Editor; node: GifNode; selected: boolean }) => {
  const [isSelected, setIsSelected] = useState(false);
  const showSelection = isSelected || selected;
  const alignment = node.attrs.alignment;
  const isCustomSizeEnabled = !!node.attrs.customSize;
  const customWidth = node.attrs.customWidth === null ? node.attrs.originalWidth : node.attrs.customWidth;
  const customHeight = node.attrs.customHeight === null ? node.attrs.originalHeight : node.attrs.customHeight;
  const style = isCustomSizeEnabled ? { width: `${customWidth}px`, height: `${customHeight}px` } : {};

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
        <div className={classes.imageWrapper}>
          <img className={classes.gif} src={node.attrs.webp} alt={node.attrs.alt ?? undefined} style={style} />
        </div>
      ) : (
        <video className={classes.gif} autoPlay loop src={node.attrs.mp4} style={style} />
      )}
      <div className={classes.videoContainer}></div>
    </NodeView>
  );
};
