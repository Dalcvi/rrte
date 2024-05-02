import { useTranslations } from '@rrte/i18n';
import type { Editor } from '@tiptap/react';
import classNames from 'classnames';
import { ModalButtonConfig } from '.';
import { ToolbarModal, ToolbarModalContainer } from '../toolbar-modal';
import classes from './modal-button.module.scss';
import { useModal } from './use-modal.hook';

export const ModalButton = (props: {
  editor: Editor;
  config: Record<string, any>;
  Icon: ModalButtonConfig['Icon'];
  text: ModalButtonConfig['text'];
  name: ModalButtonConfig['name'];
  iconStyling: ModalButtonConfig['iconStyling'];
  ModalContent: ModalButtonConfig['ModalContent'];
  getIsDisabled: ModalButtonConfig['getIsDisabled'];
}) => {
  const {
    isOpen,
    openDropdown,
    setDropdownList,
    setFirstItem,
    setLastItem,
    setDropdownButton,
    closeModal,
  } = useModal(false);
  const { editor, config, Icon, text, name, iconStyling, ModalContent, getIsDisabled } = props;
  const { t } = useTranslations();

  return (
    <ToolbarModalContainer>
      <button
        role="combobox"
        aria-label={t(text)}
        aria-controls={name}
        aria-expanded={isOpen}
        ref={setDropdownButton}
        disabled={getIsDisabled({
          ...props,
        })}
        onClick={openDropdown}
        className={classes.modalButton}
      >
        <Icon
          className={classNames(classes.icon, {
            [classes.fill]: iconStyling === 'fill',
            [classes.stroke]: iconStyling === 'stroke',
          })}
        />
      </button>
      {isOpen && (
        <ToolbarModal ref={setDropdownList} center>
          <ModalContent
            closeModal={closeModal}
            editor={editor}
            config={config}
            setFirstItemRef={setFirstItem}
            setLastItemRef={setLastItem}
          />
        </ToolbarModal>
      )}
    </ToolbarModalContainer>
  );
};
