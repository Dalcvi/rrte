import { NodeView } from '@rrte/common';
import { Editor } from '@tiptap/core';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import classes from './image.component.module.scss';
import { ImageAttributes } from './node';

type ImageNode = {
  attrs: ImageAttributes & { id: string };
};

export const ImageComponent = ({
  editor,
  node,
  selected,
}: {
  editor: Editor;
  node: ImageNode;
  selected: boolean;
}) => {
  const [imageWidth, setWidth] = useState(
    (node.attrs.customSize ? node.attrs.customWidth : undefined) ?? undefined
  );
  const [imageHeight, setHeight] = useState(
    (node.attrs.customSize ? node.attrs.customHeight : undefined) ?? undefined
  );
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);
  const [canShowLoader, setCanShowLoader] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const showLoader = !!node.attrs.isLoading && canShowLoader;
  const showSelection = isSelected || selected;
  const alignment = node.attrs.alignment;
  const isCustomSizeEnabled = !!node.attrs.customSize;

  useEffect(() => {
    if (
      node.attrs.customSize &&
      (imageWidth !== node.attrs.customWidth || imageHeight !== node.attrs.customHeight)
    ) {
      setWidth(node.attrs.customWidth ?? undefined);
      setHeight(node.attrs.customHeight ?? undefined);
    }
  }, [imageRef, node.attrs.customSize, node.attrs.customWidth, node.attrs.customHeight]);

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
      <figure className={classes.imageContainer} data-testid="image-comp">
        <img
          ref={setImageRef}
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
        {!!node.attrs.caption && !!imageRef && (
          <figcaption
            className={classes.caption}
            // @ts-expect-error
            styles={{
              maxWidth: `${!!imageWidth ? imageWidth : imageRef?.width}px`,
              maxHeight: `${!!imageHeight ? imageHeight : imageRef?.height}px`,
            }}
          >
            {node.attrs.caption}
          </figcaption>
        )}
      </figure>
    </NodeView>
  );
};
