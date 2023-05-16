import { EditorView } from "@tiptap/pm/view";
import { ImageOptions } from "./node";
import { ImageReturnValue } from "./upload-config";
import { extractImageInfo } from "./image.utils";

export const changeWithRealImage = (imgProps: ImageReturnValue | 'ERROR', id: string, view: EditorView) => {
  if (!imgProps || imgProps === 'ERROR') {
    return;
  }
  view.state.doc.descendants((node, pos) => {
    if (node.type.name === 'image' && node.attrs.id === id) {
      // update the temp node with the correct attributes
      const transaction = view.state.tr.setNodeMarkup(pos, undefined, {
        ...node.attrs,
        ...imgProps,
        isLoading: false,
      });
      view.dispatch(transaction);
      return false;
    }
    return true;
  });
};

export const fileUpload = (file: File, options: ImageOptions, view: EditorView) => {
  const upload = options.upload;
  if (!upload) {
    return;
  }
  if (file.size > options.maxFileSize || !options.acceptedImageFileTypes.includes(file.type)) {
    return false;
  }

  extractImageInfo(file).then((imageInfo) => {
    const node = view.state.schema.nodes.image.create({
      ...imageInfo,
      isLoading: true,
    });

    const transaction = view.state.tr.replaceSelectionWith(node);
    view.dispatch(transaction);
    const pos = view.state.selection.from;
    // get the temp node
    const nodeAtPos = view.state.doc.nodeAt(pos);
    if (!nodeAtPos) {
      return;
    }
    const nodeId = nodeAtPos.attrs.id;

    if (!upload) {
      return;
    }
    upload(file, imageInfo).then((uploadInfo) => {
      if (typeof uploadInfo === 'function') {
        uploadInfo().then((uploadedAttributes) => {
          changeWithRealImage(uploadedAttributes, nodeId, view);
        });
        return;
      }
      changeWithRealImage(uploadInfo, nodeId, view);
    });
  });
};
