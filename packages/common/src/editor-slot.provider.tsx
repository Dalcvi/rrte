import React from 'react';
import { createContext, useState } from 'react';

type EditorSlotContextValue = {
  setIsUsingSlot: (isUsingSlot: boolean) => void;
  isUsingSlot: boolean;
};

export const EditorSlotContext = createContext<EditorSlotContextValue | null>(null);

export const EditorSlotProvider = ({ children }: { children: React.ReactNode }) => {
  const [isUsingSlot, setIsUsingSlot] = useState(false);

  return (
    <EditorSlotContext.Provider value={{ setIsUsingSlot, isUsingSlot }}>
      {children}
    </EditorSlotContext.Provider>
  );
};

export const useEditorSlot = () => {
  const context = React.useContext(EditorSlotContext);
  if (!context) {
    throw new Error('useEditorSlot must be used within a EditorSlotProvider');
  }
  return context;
};
