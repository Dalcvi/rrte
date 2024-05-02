import {
  EditorSlotProvider,
  type BubbleMenuToolbar,
  type Config,
  type UnknownExtension,
} from '@rrte/common';
import { Document } from '@rrte/document';
import { I18nProvider, Resources, supportedLanguages } from '@rrte/i18n';
import { Text } from '@rrte/text';
import type { SingleToolbarItem } from '@rrte/toolbar';
import { Toolbar } from '@rrte/toolbar';
import { HTMLContent, JSONContent, useEditor } from '@tiptap/react';
import { useEffect, useMemo, useState } from 'react';
import classes from './Editor.module.scss';
import { BubbleMenuList } from './bubble-menus';
import { RrteEditorContent } from './rrte-editor-content';

export type EditorRef = ReturnType<typeof useEditor>;

const getEditorExtensionType = (extension: UnknownExtension) => {
  if ('node' in extension) {
    return extension.node;
  }
  if ('mark' in extension) {
    return extension.mark;
  }

  return extension.extension;
};

export const Editor = ({
  editorExtensions = [],
  language = 'en',
  editorWrapperClassName,
  toolbarClassName,
  editorRef,
  contentClassName,
  contentWrapperClassName,
  content,
  viewerMode,
  onUpdateJson,
  onUpdateHtml,
}: {
  toolbarClassName?: string;
  language?: 'lt' | 'en';
  editorWrapperClassName?: string;
  editorRef?: React.MutableRefObject<EditorRef>;
  contentClassName?: string;
  contentWrapperClassName?: string;
  viewerMode?: boolean;
  editorExtensions?: UnknownExtension[];
  content: JSONContent | HTMLContent | undefined;
  onUpdateJson?: (content: JSONContent | undefined) => void;
  onUpdateHtml?: (content: HTMLContent | undefined) => void;
}) => {
  const [contentHasBeenSet, setContentHasBeenSet] = useState(false);
  const [editorContainerRef, setEditorContainerRef] = useState<HTMLDivElement | null>(null);
  const allExtensions = useMemo(
    () => [Text() as UnknownExtension, ...editorExtensions],
    [editorExtensions, language]
  );
  const allBubbleMenus = useMemo(
    () =>
      allExtensions.reduce(
        (acc, editorExtension) => {
          const extensionType = getEditorExtensionType(editorExtension);
          const { config } = editorExtension;
          if (config.bubbleMenu) {
            return [...acc, { name: extensionType.name, menu: config.bubbleMenu, config }];
          }
          return acc;
        },
        [] as { name: string; menu: BubbleMenuToolbar; config: Config<any> }[]
      ),
    [allExtensions]
  );
  const editor = useEditor({
    extensions: [
      Document,
      ...allExtensions.map(editorExtension => getEditorExtensionType(editorExtension)),
    ],
    content,
    editable: !viewerMode,
    editorProps: contentClassName
      ? {
          attributes: {
            class: contentClassName,
          },
        }
      : undefined,
  });

  useEffect(() => {
    if (editorRef && editorRef.current !== editor) {
      editorRef.current = editor;
    }
  }, [editorRef, editor]);

  useEffect(() => {
    if (editor !== null && content === undefined) {
      if (onUpdateJson) {
        onUpdateJson(editor.getJSON());
      }

      if (onUpdateHtml) {
        onUpdateHtml(editor.getHTML());
      }
    }
  }, [content, editor, onUpdateHtml, onUpdateJson]);

  useEffect(() => {
    if (editor === null) {
      return;
    }
    const updateFunc = () => {
      if (onUpdateJson) {
        onUpdateJson(editor.getJSON());
      }

      if (onUpdateHtml) {
        onUpdateHtml(editor.getHTML());
      }
    };

    if (window) {
      // @ts-expect-error
      window.editor = editor;
    }

    editor.on('update', updateFunc);

    return () => {
      editor.off('update', updateFunc);
      // @ts-expect-error
      window.editor = undefined;
    };
  }, [editor, onUpdateHtml, onUpdateJson]);

  useEffect(() => {
    if (contentHasBeenSet || editor === null || content === undefined) {
      return;
    }
    setContentHasBeenSet(true && !viewerMode);
    editor.commands.setContent(content);
  }, [content]);

  const allToolbarItems = useMemo(() => {
    return (
      allExtensions.filter((editorExtension: any) => !!editorExtension.config) as {
        config: Config<object>;
      }[]
    )
      .map(editorExtension => {
        if (Array.isArray(editorExtension.config.toolbar)) {
          return editorExtension.config.toolbar.map(toolbar => ({
            toolbar,
            config: editorExtension.config,
          }));
        }
        return [{ toolbar: editorExtension.config.toolbar, config: editorExtension.config }];
      })
      .flat()
      .filter(toolbar => !!toolbar.toolbar) as { toolbar: SingleToolbarItem<any>; config: any }[];
  }, [allExtensions]);

  const mainToolbarItems = useMemo(() => {
    return allToolbarItems.filter(toolbar => !!toolbar.toolbar.group.toolbar);
  }, [allToolbarItems]);

  // const footerToolbarItems = useMemo(() => {
  //   return allToolbarItems.filter(toolbar => toolbar.toolbar.group.toolbar === 'footer');
  // }, [allToolbarItems]);

  const translationResources = useMemo(() => {
    const translations = allExtensions
      .map(editorExtension => editorExtension.config.translations)
      .filter(languageResource => !!languageResource) as Resources[];
    if (!translations) {
      return {};
    }

    return translations.reduce((acc, translation) => {
      supportedLanguages.forEach(language => {
        if (!acc[language]) {
          acc[language] = {};
        }
        acc[language] = { ...acc[language], ...translation[language] };
      });

      return acc;
    }, {} as Resources);
  }, [allExtensions]) as Resources;

  return (
    <div
      className={`${classes.editorWrapper} ${
        !viewerMode ? classes.editorWrapperEditMode : ''
      } ${editorWrapperClassName}`}
      data-hook="rrte-editor"
    >
      <I18nProvider language={language} resources={translationResources}>
        <EditorSlotProvider>
          {editor && !viewerMode && mainToolbarItems.length > 0 && (
            <Toolbar
              editor={editor}
              wrapperClassName={toolbarClassName}
              items={mainToolbarItems}
              editorContainerRef={editorContainerRef}
            />
          )}
          <RrteEditorContent
            editor={editor}
            ref={setEditorContainerRef}
            contentWrapperClassName={contentWrapperClassName}
          />
          {editor && !viewerMode && allBubbleMenus.length > 0 && (
            <BubbleMenuList editor={editor} list={allBubbleMenus} />
          )}
        </EditorSlotProvider>
      </I18nProvider>
    </div>
  );
};
