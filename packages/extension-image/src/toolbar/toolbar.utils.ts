import { Editor } from '@tiptap/core';
import { ImageReturn, ImageReturnValue } from '../upload-config';
import { NodeSelection } from '@tiptap/pm/state';

export const getImageValue = async (img: ImageReturn) => {
  if (typeof img === 'function') {
    return img();
  }

  return img;
};

export const handleFileImage = async (
  getImg: ImageReturn,
  editor: Editor,
  imgId: string | false | undefined,
  isLoading?: boolean,
) => {
  const img = await getImageValue(getImg);
  if (img === 'ERROR') {
    if (imgId) {
      editor.commands.removeImage(imgId);
    }
    return;
  }
  if (img && imgId === false) {
    return editor.chain().focus().setImage(img).run();
  }
  if (img && imgId) {
    editor.commands.updateImage({ ...img, isLoading: isLoading ?? false }, imgId);
  }
};

export const createTempImage = async (editor: Editor, tempImg: ImageReturnValue) => {
  if (tempImg) {
    editor
      .chain()
      .focus()
      .setImage({ ...tempImg, isLoading: true })
      .run();
    const imgId = (editor.state.selection as NodeSelection).node?.attrs.id as string | undefined;
    return imgId;
  }
  return false;
};
