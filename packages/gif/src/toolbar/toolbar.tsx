import type { ModalButtonConfig } from '@rrte/common';
import { GifConfig } from '../gif-config';
import { GifNode } from '../node';
import { GifSearch } from './gif-search.component';
import GifIcon from './gif.icon.svg';

export const ToolbarButton: ModalButtonConfig<GifConfig> = {
  name: GifNode.name,
  text: 'gif-button.text',
  type: 'modal' as const,
  priority: 1,
  Icon: ({ className }) => <GifIcon height={'15px'} width={'15px'} className={className} />,
  ModalContent: ({ editor, config, setFirstItemRef, setLastItemRef, closeModal }) => (
    <GifSearch
      sdk={config.sdkKey}
      setFirstItemRef={setFirstItemRef}
      setLastItemRef={setLastItemRef}
      onGifSelect={gifAttrs => {
        closeModal();
        editor.commands.setGif(gifAttrs);
      }}
    />
  ),
  getIsDisabled: ({ editor }) => !editor.can().setGif({ originalHeight: 0, originalWidth: 0 }),
  iconStyling: 'fill',
  group: {
    name: 'media',
    text: 'media-group.text',
    priority: 3,
    toolbar: 'footer',
  },
};
