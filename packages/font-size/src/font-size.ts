import { createExtension } from '@rrte/common';
import { FontSizeExtension } from './extension';
import { ToolbarButton } from './toolbar';

export const FontSize = () =>
  createExtension(FontSizeExtension, {
    toolbar: ToolbarButton,
    translations: {
      en: {
        'font-size-selector.text': 'Font size',
      },
      lt: {
        'font-size-selector.text': 'Šrifto dydis',
      },
    },
  });
