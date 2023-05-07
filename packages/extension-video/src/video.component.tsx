import { Editor } from '@tiptap/core';
import classes from './video.component.module.scss';
import { VideoAttributes, VideoNode } from './node';
import { useEffect, useState } from 'react';
import { NodeView } from '@rrte/common';
import classNames from 'classnames';

type VideoNode = {
  attrs: VideoAttributes & { id: string };
};

export const VideoComponent = ({ editor, node, selected }: { editor: Editor; node: VideoNode; selected: boolean }) => {
  const [canShowLoader, setCanShowLoader] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const showSelection = isSelected || selected;
  const showLoader = !!node.attrs.isLoading && canShowLoader;
  const alignment = node.attrs.alignment;
  const isCustomSizeEnabled = !!node.attrs.customSize;
  const customWidth = node.attrs.width;
  const customHeight = node.attrs.height;

  useEffect(() => {
    const func = ({ editor }: { editor: Editor }) => {
      const nodeId = node.attrs.id;
      editor.view.state.doc.descendants((node, pos) => {
        if (node.type.name === VideoNode.name && node.attrs.id === nodeId) {
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
      selected={showSelection}
      draggable
      className={classNames({
        [classes.left]: alignment === 'left',
        [classes.center]: alignment === 'center',
        [classes.right]: alignment === 'right',
      })}
    >
      <div className={classes.videoContainer}>
        <video
          src={node.attrs.src}
          style={
            isCustomSizeEnabled
              ? {
                  width: `${customWidth}px`,
                  height: `${customHeight}px`,
                }
              : undefined
          }
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
