import { Editor, EditorEvents } from '@tiptap/core';
import classes from './image.component.module.scss';
import { ImageAttributes } from './node';
import { useEffect, useState } from 'react';
import { NodeView } from '@rrte/common';
import classNames from 'classnames';

type ImageNode = {
  attrs: ImageAttributes & { id: string };
};

export const ImageComponent = ({ editor, node, selected }: { editor: Editor; node: ImageNode; selected: boolean }) => {
  const [canShowLoader, setCanShowLoader] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const showLoader = !!node.attrs.isLoading && canShowLoader;
  const showSelection = isSelected || selected;
  const alignment = node.attrs.alignment;
  const isCustomSizeEnabled = !!node.attrs.customSize;
  const customWidth = node.attrs.width === null ? node.attrs.originalWidth : node.attrs.width;
  const customHeight = node.attrs.height === null ? node.attrs.originalHeight : node.attrs.height;

  useEffect(() => {
    const func = ({ editor }: { editor: Editor }) => {
      const nodeId = node.attrs.id;
      editor.view.state.doc.descendants((node, pos) => {
        if (node.type.name === 'image' && node.attrs.id === nodeId) {
          const { from, to } = editor.state.selection;
          if (from <= pos && to >= pos) {
            console.log('selected', node.attrs.id, editor, node, pos);
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
      selected={showSelection}
      draggable
      className={classNames({
        [classes.left]: alignment === 'left',
        [classes.center]: alignment === 'center',
        [classes.right]: alignment === 'right',
      })}
    >
      <div className={classes.imageContainer}>
        <img
          className={classNames(classes.image, {
            [classes.customSize]: isCustomSizeEnabled,
          })}
          src={node.attrs.src}
          alt={node.attrs.alt ?? undefined}
          style={
            isCustomSizeEnabled
              ? {
                  width: `${customWidth}px`,
                  height: `${customHeight}px`,
                }
              : undefined
          }
          onLoad={() => {
            setCanShowLoader(true);
          }}
        />
        {showLoader && (
          <div className={classes.loading}>
            <div className={classes.loadingCircle} />
          </div>
        )}
      </div>
    </NodeView>
  );
};
