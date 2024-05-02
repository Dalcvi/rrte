import { TextAlignExtension } from '../extension';
import AlignJustifyIcon from './align-justify.icon.svg';
import AlignLeftIcon from './align-left.icon.svg';
import AlignRightIcon from './align-right.icon.svg';
import AlignCenterIcon from './align-center.icon.svg';
import { DropdownConfig } from '@rrte/common';
import { TextAlignConfig } from '../text-align-config';

export const toolbar: DropdownConfig<TextAlignConfig> = {
  name: TextAlignExtension.name,
  dropdownName: TextAlignExtension.name,
  text: 'text-alignment.text',
  type: 'dropdown',
  priority: 89,
  DropdownPriority: 1000,
  values: [
    {
      name: 'justify',
      belongsTo: TextAlignExtension.name,
      priority: 1,
      iconConfig: {
        type: 'stroke',
        Icon: ({ className }) => (
          <AlignJustifyIcon height={'17px'} width={'17px'} className={className} />
        ),
      },
      text: 'justify-align-button.text',
      isActive: ({ editor, config }) =>
        config.types.some(type => editor.isActive(type, { textAlign: 'justify' })),
      onClick: ({ editor }) => editor.chain().focus().setTextAlign({ textAlign: 'justify' }).run(),
      getIsDisabled: ({ editor }) => !editor.can().setTextAlign({ textAlign: 'justify' }),
    },
    {
      name: 'left',
      belongsTo: TextAlignExtension.name,
      priority: 4,
      iconConfig: {
        type: 'stroke',
        Icon: ({ className }) => (
          <AlignLeftIcon height={'17px'} width={'17px'} className={className} />
        ),
      },
      text: 'left-align-button.text',
      isActive: ({ editor, config }) =>
        config.types.some(type => editor.isActive(type, { textAlign: 'left' })),
      onClick: ({ editor }) => editor.chain().focus().setTextAlign({ textAlign: 'left' }).run(),
      getIsDisabled: ({ editor }) => !editor.can().setTextAlign({ textAlign: 'left' }),
    },
    {
      name: 'center',
      belongsTo: TextAlignExtension.name,
      priority: 3,
      iconConfig: {
        type: 'stroke',
        Icon: ({ className }) => (
          <AlignCenterIcon height={'17px'} width={'17px'} className={className} />
        ),
      },
      text: 'center-align-button.text',
      isActive: ({ editor, config }) =>
        config.types.some(type => editor.isActive(type, { textAlign: 'center' })),
      onClick: ({ editor }) => editor.chain().focus().setTextAlign({ textAlign: 'center' }).run(),
      getIsDisabled: ({ editor }) => !editor.can().setTextAlign({ textAlign: 'center' }),
    },
    {
      name: 'right',
      belongsTo: TextAlignExtension.name,
      priority: 2,
      iconConfig: {
        type: 'stroke',
        Icon: ({ className }) => (
          <AlignRightIcon height={'17px'} width={'17px'} className={className} />
        ),
      },
      text: 'right-align-button.text',
      isActive: ({ editor, config }) =>
        config.types.some(type => editor.isActive(type, { textAlign: 'right' })),
      onClick: ({ editor }) => editor.chain().focus().setTextAlign({ textAlign: 'right' }).run(),
      getIsDisabled: ({ editor }) => !editor.can().setTextAlign({ textAlign: 'right' }),
    },
  ],
  group: {
    name: 'alignment',
    text: 'alignment-group.text',
    priority: 3,
    toolbar: 'main',
  },
};
