import { Editor } from '@tiptap/core';
import classes from './video.component.module.scss';
import { VideoAttributes } from './node';
import { useEffect, useRef, useState } from 'react';
import { NodeView } from '@rrte/common';
import classNames from 'classnames';

type VideoNode = {
  attrs: VideoAttributes & { id: string };
};

export const VideoComponent = ({
  editor,
  node,
  selected,
}: {
  editor: Editor;
  node: VideoNode;
  selected: boolean;
}) => {
  const [videoWidth, setWidth] = useState(
    node.attrs.customSize ? node.attrs.customWidth : undefined
  );
  const [videoHeight, setHeight] = useState(
    node.attrs.customSize ? node.attrs.customHeight : undefined
  );
  const videoRef = useRef<HTMLVideoElement>(null);
  const [canShowLoader, setCanShowLoader] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const showSelection = isSelected || selected;
  const showLoader = !!node.attrs.isLoading && canShowLoader;
  const alignment = node.attrs.alignment;
  const isCustomSizeEnabled = !!node.attrs.customSize;
  const isEditable = editor.isEditable;

  useEffect(() => {
    if (videoRef.current && !node.attrs.customSize) {
      const video = videoRef.current;
      const { width, height } = video.getBoundingClientRect();
      if (width !== videoWidth || height !== videoHeight) {
        setWidth(width);
        setHeight(height);
      }
    }
    if (
      node.attrs.customSize &&
      (videoWidth !== node.attrs.customWidth || videoHeight !== node.attrs.customHeight)
    ) {
      setWidth(node.attrs.customWidth);
      setHeight(node.attrs.customHeight);
    }
  }, [videoRef.current, node.attrs.customSize, node.attrs.customWidth, node.attrs.customHeight]);

  useEffect(() => {
    const func = ({ editor }: { editor: Editor }) => {
      const nodeId = node.attrs.id;
      editor.view.state.doc.descendants((node, pos) => {
        if (node.type.name === 'video' && node.attrs.id === nodeId) {
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
      <div data-testid="video-comp" className={classes.videoContainer}>
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          ref={videoRef}
          controls={!isEditable}
          src={node.attrs.src}
          width={videoWidth}
          height={videoHeight}
          className={classNames(classes.video, {
            [classes.customSize]: isCustomSizeEnabled,
          })}
          onLoadedData={() => {
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
