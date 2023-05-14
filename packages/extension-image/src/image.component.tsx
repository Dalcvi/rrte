import { Editor, EditorEvents } from '@tiptap/core';
import classes from './image.component.module.scss';
import { ImageAttributes } from './node';
import { useEffect, useRef, useState } from 'react';
import { NodeView } from '@rrte/common';
import classNames from 'classnames';

type ImageNode = {
  attrs: ImageAttributes & { id: string };
};

export const ImageComponent = ({ editor, node, selected }: { editor: Editor; node: ImageNode; selected: boolean }) => {
  const [imageWidth, setWidth] = useState((node.attrs.customSize ? node.attrs.customWidth : undefined) ?? undefined);
  const [imageHeight, setHeight] = useState((node.attrs.customSize ? node.attrs.customHeight : undefined) ?? undefined);
  const imageRef = useRef<HTMLImageElement>(null);
  const [canShowLoader, setCanShowLoader] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const showLoader = !!node.attrs.isLoading && canShowLoader;
  const showSelection = isSelected || selected;
  const alignment = node.attrs.alignment;
  const isCustomSizeEnabled = !!node.attrs.customSize;

  useEffect(() => {
    if (node.attrs.customSize && (imageWidth !== node.attrs.customWidth || imageHeight !== node.attrs.customHeight)) {
      setWidth(node.attrs.customWidth ?? undefined);
      setHeight(node.attrs.customHeight ?? undefined);
    }
  }, [imageRef.current, node.attrs.customSize, node.attrs.customWidth, node.attrs.customHeight]);

  useEffect(() => {
    const func = ({ editor }: { editor: Editor }) => {
      const nodeId = node.attrs.id;
      editor.view.state.doc.descendants((node, pos) => {
        if (node.type.name === 'image' && node.attrs.id === nodeId) {
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
      <div className={classes.imageContainer} data-testid="image-comp">
        <img
          ref={imageRef}
          className={classNames(classes.image, {
            [classes.customSize]: isCustomSizeEnabled,
          })}
          src={node.attrs.src}
          alt={node.attrs.alt ?? undefined}
          width={isCustomSizeEnabled ? imageWidth : node.attrs.originalWidth}
          height={isCustomSizeEnabled ? imageHeight : node.attrs.originalHeight}
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
