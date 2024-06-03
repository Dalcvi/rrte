import { Editor } from '@rrte/editor';
import React, { useMemo, useRef, useState } from 'react';
import { getConfig } from './extensions-config';
import classes from './styles.module.css';
import './styles.css';

export default function Web() {
  const [content, setContent] = useState(undefined);
  const [comments, setComments] = useState([]);
  const editor = useRef(null);
  const extensions = useMemo(() => getConfig(), []);
  const [fakeUpdate, setFakeUpdate] = useState(false);
  const [language, setLanguage] = useState('EN');

  return (
    <div>
      <label>
        Language: <br />
        <select value={language} onChange={e => setLanguage(e.target.value)}>
          <option>EN</option>
          <option>LT</option>
        </select>
      </label>
      <div className={classes.commentsContainer}>
        <div className={classes.commentBoxContainer}>
          <div className={classes.commentBox} key={fakeUpdate.toString()}>
            <Editor
              key={language}
              content={content}
              onUpdateJson={content => {
                setContent(content);
              }}
              language={language.toLocaleLowerCase()}
              editorRef={editor}
              editorExtensions={extensions}
              editorWrapperClassName={classes.editor}
              contentClassName={classes.editorContent}
              contentWrapperClassName={classes.editorContentWrapper}
            />
          </div>
          <div className={classes.submitWrapper}>
            <button
              aria-label="submit"
              className={classes.submit}
              disabled={editor.current?.isEmpty}
              onClick={() => {
                if (editor.current && content) {
                  setComments(comments => [...comments, content]);
                  editor.current.commands.clearContent(true);
                  setFakeUpdate(prev => !prev);
                }
              }}
            >
              SUBMIT
            </button>
          </div>
        </div>
        <div className={classes.line} />
        <div className={classes.commentList}>
          {comments.map((comments, i) => {
            return (
              <div key={i} className={classes.comment}>
                <div>
                  <div className={classes.commentHeader}>
                    <div className={classes.commentAvatar} />
                    <div className={classes.commentAuthor}>Author</div>
                  </div>
                </div>
                <Editor
                  content={comments}
                  viewerMode={true}
                  editorExtensions={extensions}
                  editorWrapperClassName={classes.viewerWrapper}
                  contentClassName={classes.viewerContent}
                  contentWrapperClassName={classes.contentWrapper}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
