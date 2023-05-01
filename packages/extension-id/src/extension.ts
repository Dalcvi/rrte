import { Extension, findChildren, findChildrenInRange, getChangedRanges, combineTransactionSteps } from '@tiptap/core';
import { Plugin, PluginKey, Transaction } from '@tiptap/pm/state';
import { v4 as uuidv4 } from 'uuid';

export function findDuplicates(items: any[]): any[] {
  const filtered = items.filter((el, index) => items.indexOf(el) !== index);
  return removeDuplicates(filtered);
}

export function removeDuplicates<T>(array: T[]): T[] {
  const seen: Record<any, any> = {};
  return array.filter((item) => {
    const key = JSON.stringify(item);
    const isNew = !seen[key];
    seen[key] = true;
    return isNew;
  });
}
export interface IdOptions {
  attributeName: string;
  generateID: () => any;
  types: string[];
  filterTransaction: ((transaction: Transaction) => boolean) | null;
}
export const idExtension = Extension.create<IdOptions>({
  name: 'Id',
  priority: 1000000,
  addOptions() {
    return {
      attributeName: 'id',
      types: ['paragraph', 'heading', 'blockquote'],
      generateID: () => uuidv4(),
      filterTransaction: null,
    };
  },
  addGlobalAttributes() {
    console.log();
    return [
      {
        types: this.options.types,
        attributes: {
          [this.options.attributeName]: {
            default: null,
            parseHTML: (element) => element.getAttribute(this.options.attributeName),
            renderHTML: (attributes) => {
              if (!attributes[this.options.attributeName]) {
                return {};
              }
              return {
                [`${this.options.attributeName}`]: attributes[this.options.attributeName],
              };
            },
          },
        },
      },
    ];
  },
  onCreate() {
    if (this.editor.extensionManager.extensions.find((extension) => extension.name === 'collaboration')) {
      return;
    }
    const { view, state } = this.editor;
    const { tr, doc } = state;
    const { attributeName, generateID } = this.options;
    const nodesWithoutId = findChildren(doc, (node) => {
      return node.attrs[attributeName] === null;
    });
    nodesWithoutId.forEach(({ node, pos }) => {
      tr.setNodeMarkup(pos, undefined, {
        ...node.attrs,
        [attributeName]: generateID(),
      });
    });
    tr.setMeta('addToHistory', false);
    view.dispatch(tr);
  },
  addProseMirrorPlugins() {
    let dragSourceElement: Element | null = null;
    return [
      new Plugin({
        key: new PluginKey('ID'),
        appendTransaction: (transactions, oldState, newState) => {
          const docChanges =
            transactions.some((transaction) => transaction.docChanged) && !oldState.doc.eq(newState.doc);
          const filterTransactions =
            this.options.filterTransaction && transactions.some((tr) => !this.options.filterTransaction?.(tr));
          if (!docChanges || filterTransactions) {
            return;
          }
          const { tr } = newState;
          const { attributeName, generateID } = this.options;
          const transform = combineTransactionSteps(oldState.doc, transactions as Transaction[]);
          const { mapping } = transform;
          // get changed ranges based on the old state
          const changes = getChangedRanges(transform);
          changes.forEach(({ newRange }) => {
            const newNodes = findChildrenInRange(newState.doc, newRange, (node) => {
              return true;
            });
            const newIds = newNodes.map(({ node }) => node.attrs[attributeName]).filter((id) => id === null);
            newNodes.forEach(({ node, pos }, i) => {
              // instead of checking `node.attrs[attributeName]` directly
              // we look at the current state of the node within `tr.doc`.
              // this helps to prevent adding new ids to the same node
              // if the node changed multiple times within one transaction
              const id = tr.doc.nodeAt(pos)?.attrs[attributeName];
              const what = tr.doc.nodeAt(pos);
              console.log(what);
              if (id === null) {
                tr.setNodeMarkup(pos, undefined, {
                  ...node.attrs,
                  [attributeName]: generateID(),
                });
                return;
              }
              const nextNode = newNodes[i + 1];
              if (
                nextNode &&
                node.content.size === 0 &&
                node.type.name !== 'text' &&
                nextNode.node.type.name !== 'text'
              ) {
                try {
                  tr.setNodeMarkup(nextNode.pos, undefined, {
                    ...nextNode.node.attrs,
                    [attributeName]: id,
                  });
                  newIds[i + 1] = id;
                  const generatedId = generateID();
                  try {
                    tr.setNodeMarkup(pos, undefined, {
                      ...node.attrs,
                      [attributeName]: generatedId,
                    });
                    newIds[i] = generatedId;
                  } catch (e) {
                    console.log(e);
                  }
                } catch (e) {
                  console.log(e);
                }
                return tr;
              }
              const duplicatedNewIds = findDuplicates(newIds);
              // check if the node doesn’t exist in the old state
              const { deleted } = mapping.invert().mapResult(pos);
              const newNode = deleted && duplicatedNewIds.includes(id);
              if (newNode) {
                tr.setNodeMarkup(pos, undefined, {
                  ...node.attrs,
                  [attributeName]: generateID(),
                });
              }
            });
          });
          if (!tr.steps.length) {
            return;
          }
          return tr;
        },
        // we register a global drag handler to track the current drag source element
        view(view) {
          const handleDragstart = (event: DragEvent) => {
            dragSourceElement = view.dom.parentElement?.contains(event.target as Element)
              ? view.dom.parentElement
              : null;
          };
          window.addEventListener('dragstart', handleDragstart);
          return {
            destroy() {
              window.removeEventListener('dragstart', handleDragstart);
            },
          };
        },
        props: {
          handleDOMEvents: {
            drop: (view, event) => {
              if (dragSourceElement !== view.dom.parentElement || event.dataTransfer?.effectAllowed === 'copy') {
                dragSourceElement = null;
              }
              return false;
            },
          },
        },
      }),
    ];
  },
});
