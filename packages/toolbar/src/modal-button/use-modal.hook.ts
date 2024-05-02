import { useCallback, useEffect, useRef, useState } from 'react';

export const useModal = (closeOnAnyClick = true) => {
  const [isOpen, setIsOpen] = useState(false);
  const focusAfterOpen = useRef(false);
  const [dropdownButton, setDropdownButton] = useState<HTMLButtonElement | null>(null);
  const [dropdownList, setDropdownList] = useState<HTMLElement | null>(null);
  const [firstItem, setFirstItem] = useState<HTMLElement | null>(null);
  const [lastItem, setLastItem] = useState<HTMLElement | null>(null);

  const closeModal = useCallback(
    (e?: { target: Event['target'] }) => {
      if (e && dropdownButton && dropdownButton.contains(e.target as Node)) {
        return;
      }
      if (!closeOnAnyClick && e && dropdownList && dropdownList.contains(e.target as Node)) {
        return;
      }
      document.removeEventListener('click', closeModal);
      document.removeEventListener('keydown', escapeClose);
      document.removeEventListener('keydown', dropdownNavigation);
      setIsOpen(false);
    },
    [dropdownButton, dropdownList]
  );

  const closeModalWithFocus = useCallback(() => {
    if (dropdownButton) {
      dropdownButton.focus();
    }
    closeModal();
  }, [closeModal]);

  const escapeClose = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModalWithFocus();
      }
    },
    [closeModalWithFocus]
  );

  const dropdownNavigation = useCallback(
    (e: KeyboardEvent) => {
      if (dropdownButton) {
        const isActiveElementInOpeningButton = dropdownButton.contains(
          document.activeElement as HTMLElement
        );

        if (e.key === 'ArrowDown' && isActiveElementInOpeningButton) {
          if (!isOpen) {
            openDropdown();
            focusAfterOpen.current = true;
            return;
          }
        }
        if (e.key === 'ArrowDown' && isActiveElementInOpeningButton && firstItem) {
          e.preventDefault();
          firstItem.focus();
          return;
        }
      }
      if (!dropdownList || !firstItem || !lastItem) {
        return;
      }

      const isActiveElementInDropdown = dropdownList.contains(
        document.activeElement as HTMLElement
      );

      if (!isActiveElementInDropdown) {
        return;
      }

      const parentListItem = document.activeElement?.parentElement;
      if (!parentListItem || parentListItem.tagName !== 'LI') {
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (document.activeElement === lastItem) {
          firstItem.focus();
          return;
        }
        const nextSibling = parentListItem.nextElementSibling;
        const nextButton = nextSibling?.querySelector('button');

        if (nextButton) {
          nextButton.focus();
        }
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (document.activeElement === firstItem) {
          lastItem.focus();
          return;
        }
        const previousSibling = parentListItem.previousElementSibling;
        const previousButton = previousSibling?.querySelector('button');

        if (previousButton) {
          previousButton.focus();
        }
      }
    },
    [dropdownList, dropdownButton, firstItem, lastItem]
  );

  useEffect(() => {
    if (focusAfterOpen.current && firstItem) {
      focusAfterOpen.current = false;
      firstItem.focus();
    }

    document.addEventListener('keydown', dropdownNavigation);

    if (isOpen) {
      document.addEventListener('click', closeModal);
      document.addEventListener('keydown', escapeClose);
    }

    return () => {
      document.removeEventListener('click', closeModal);
      document.removeEventListener('keydown', escapeClose);
      document.removeEventListener('keydown', dropdownNavigation);
    };
  }, [
    dropdownButton,
    closeModal,
    escapeClose,
    dropdownNavigation,
    isOpen,
    dropdownList,
    firstItem,
    focusAfterOpen.current,
  ]);

  const openDropdown = useCallback(() => {
    setIsOpen(true);
  }, []);

  return {
    setDropdownButton,
    setDropdownList,
    closeModalWithFocus,
    dropdownList,
    setFirstItem,
    setLastItem,
    openDropdown,
    isOpen,
    closeModal,
  };
};
