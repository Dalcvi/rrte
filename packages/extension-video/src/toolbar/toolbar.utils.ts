import { Editor } from '@tiptap/core';
import { NodeSelection } from '@tiptap/pm/state';
import { VideoReturn, VideoReturnValue } from '../upload-config';

export const getVideoValue = async (video: VideoReturn) => {
  if (typeof video === 'function') {
    return video();
  }

  return video;
};

export const handleFileVideo = async (
  getVideo: VideoReturn,
  editor: Editor,
  videoId: string | false | undefined,
  isLoading?: boolean
) => {
  const video = await getVideoValue(getVideo);
  if (video === 'ERROR') {
    if (videoId) {
      editor.commands.removeVideo(videoId);
    }
    return;
  }
  if (video && videoId === false) {
    return editor.chain().focus().setVideo(video).run();
  }
  if (video && videoId) {
    editor.commands.updateVideo({ ...video, isLoading: isLoading ?? false }, videoId);
  }
};

export const createTempVideo = async (editor: Editor, tempVideo: VideoReturnValue) => {
  if (tempVideo) {
    editor
      .chain()
      .focus()
      .setVideo({ ...tempVideo, isLoading: true })
      .run();
    const videoId = (editor.state.selection as NodeSelection).node?.attrs.id as string | undefined;
    return videoId;
  }
  return false;
};
