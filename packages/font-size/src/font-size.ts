import { createExtension } from '@rrte/common';
import { FontSizeExtension } from './extension';
import { ToolbarButton } from './toolbar';

export const FontSize = () =>
  createExtension(FontSizeExtension, {
    toolbar: ToolbarButton,
    translations: {
      en: {
        'font-size-selector.text': 'Font size',
        'font-size-selector.increase': 'Increase font size',
        'font-size-selector.decrease': 'Decrease font size',
        'typography.text': 'Typography',
      },
      lt: {
        'font-size-selector.text': 'Šrifto dydis',
        'font-size-selector.increase': 'Padidinti šrifto dydį',
        'font-size-selector.decrease': 'Sumažinti šrifto dydį',
        'typography.text': 'Tipografija',
      },
    },
  });
