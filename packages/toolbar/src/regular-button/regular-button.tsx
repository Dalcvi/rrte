import type { Editor } from '@tiptap/react';
import { RegularButtonConfig } from './';
import { useTranslations } from '@rrte/i18n';

export const RegularButton = (
  props: RegularButtonConfig & {
    editor: Editor;
    config: Record<string, any>;
    editorContainerRef: HTMLElement | null;
  }
) => {
  const { editor, config, Button, name, editorContainerRef, text } = props;
  const { t } = useTranslations();

  return (
    <div data-tooltip-id="toolbar-buttons-tooltip" data-tooltip-content={t(text)}>
      <Button
        t={t}
        key={name}
        editor={editor}
        config={config}
        editorContainerRef={editorContainerRef}
      />
    </div>
  );
};
