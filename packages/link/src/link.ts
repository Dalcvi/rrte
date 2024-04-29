import { createMark } from '@rrte/common';
import { LinkMark } from './mark';
import { LinkBubbleMenu, ToolbarButton } from './toolbar';

export const Link = () =>
  createMark(LinkMark, {
    toolbar: ToolbarButton,
    bubbleMenu: LinkBubbleMenu,
    translations: {
      en: {
        'link-button.text': 'Toggle link',
        'link-address.label': 'URL',
        'voice-command.toggle-link': 'toggle link',
      },
      lt: {
        'link-button.text': 'Perjungti nuorodą',
        'link-address.label': 'URL',
        'voice-command.toggle-link': 'pakeisti nuorodą',
      },
    },
  });
