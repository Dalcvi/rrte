import type { ImageAttributes } from './node';

export type UploadConfig = UserControlledUploadConfig | ExtensionControlledUploadConfig;

export type ImageReturn = ImageReturnFunction | ImageReturnValue | ImageReturnError;
export type ImageReturnFunction = () => Promise<ImageReturnValue | ImageReturnError>;
export type ImageReturnValue = NeededImageAttributes | false;
export type NeededImageAttributes = Omit<
  ImageAttributes,
  'isLoading' | 'alignment' | 'customSize' | 'customWidth' | 'customHeight' | 'alt' | 'caption'
> &
  Partial<ImageAttributes>;
export type ImageReturnError = 'ERROR';

export type UserControlledUploadConfig = {
  type: 'user-controlled';
  /**
   * Called when the user clicks the "Add Image" button in the toolbar.
   * This is useful if you want to show a custom file picker.
   * @returns tempFile: The temporary file that will be shown in the editor while the image is being uploaded.
   * @returns finalFile: The final file that will be shown in the editor after the image has been uploaded.
   */
  onImageAddClick: () => Promise<{
    tempFile: ImageReturnValue;
    finalFile: Promise<ImageReturn>;
  }>;
  onPaste: (file: File, imgAttr: NeededImageAttributes) => Promise<ImageReturn>;
  acceptedImageFileTypes: string[];
  maxFileSize: number;
};

export type ExtensionControlledUploadConfig = {
  type: 'extension-controlled';
  /**
   * Called when the user selects a file in the file picker.
   * @param file The file that the user selected. Will be used as a temporary file while the image is being uploaded.
   * @returns The file that will be shown in the editor.
   */
  onImageAdd: (file: File, imgAttr: NeededImageAttributes) => Promise<ImageReturn>;
  acceptedImageFileTypes: string[];
  maxFileSize: number;
};
