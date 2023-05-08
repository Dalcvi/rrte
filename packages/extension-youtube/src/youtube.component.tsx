import { Editor } from '@tiptap/core';
import classes from './youtube.component.module.scss';
import { YoutubeAttributes } from './node';
import { useEffect, useState } from 'react';
import { NodeView } from '@rrte/common';
import classNames from 'classnames';
import YouTube from 'react-youtube';

type YoutubeNode = {
  attrs: YoutubeAttributes & { id: string };
};

export const YoutubeComponent = ({
  editor,
  node,
  selected,
}: {
  editor: Editor;
  node: YoutubeNode;
  selected: boolean;
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const showSelection = isSelected || selected;
  const alignment = node.attrs.alignment;
  const isCustomSizeEnabled = !!node.attrs.customSize;
  const customWidth = node.attrs.width;
  const customHeight = (9 * customWidth) / 16;
  const isEditMode = editor.isEditable;

  useEffect(() => {
    const func = ({ editor }: { editor: Editor }) => {
      const nodeId = node.attrs.id;
      editor.view.state.doc.descendants((node, pos) => {
        if (node.type.name === 'youtube' && node.attrs.id === nodeId) {
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
        <YouTube
          videoId={node.attrs.videoId}
          iframeClassName={classes.youtubeVideo}
          opts={
            isCustomSizeEnabled
              ? {
                  width: customWidth,
                  height: customHeight,
                }
              : undefined
          }
        />
        {isEditMode && <div className={classes.blocker} />}
      </div>
    </NodeView>
  );
};
