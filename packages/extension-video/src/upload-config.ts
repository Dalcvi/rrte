import type { VideoAttributes } from './node';

export type UploadConfig = UserControlledUploadConfig | ExtensionControlledUploadConfig;

export type VideoReturn = VideoReturnFunction | VideoReturnValue | VideoReturnError;
export type VideoReturnFunction = () => Promise<VideoReturnValue | VideoReturnError>;
export type VideoReturnValue = NeededVideoAttributes | false;
export type NeededVideoAttributes = Omit<VideoAttributes, 'isLoading' | 'alignment' | 'customSize' | 'width' | 'height'> & Partial<VideoAttributes>;
export type VideoReturnError = 'ERROR';

export type UserControlledUploadConfig = {
  type: 'user-controlled';
  /**
   * Called when the user clicks the "Add Video" button in the toolbar.
   * This is useful if you want to show a custom file picker.
   * @returns tempFile: The temporary file that will be shown in the editor while the video is being uploaded.
   * @returns finalFile: The final file that will be shown in the editor after the video has been uploaded.
   */
  onVideoAddClick: () => Promise<{
    tempFile: VideoReturnValue;
    finalFile: Promise<VideoReturn>;
  }>;
  onPaste: (file: File, videoAttr: NeededVideoAttributes) => Promise<VideoReturn>;
  acceptedVideoFileTypes: string[];
  maxFileSize: number;
};

export type ExtensionControlledUploadConfig = {
  type: 'extension-controlled';
  /**
   * Called when the user selects a file in the file picker.
   * @param file The file that the user selected. Will be used as a temporary file while the video is being uploaded.
   * @returns The file that will be shown in the editor.
   */
  onVideoAdd: (file: File, videoAttr: NeededVideoAttributes) => Promise<VideoReturn>;
  acceptedVideoFileTypes: string[];
  maxFileSize: number;
};
