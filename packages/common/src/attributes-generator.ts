export const generateStringAttribute = (
  attribute: keyof CSSStyleDeclaration,
  cssVarName: string,
  style: string,
  applyStyle?: (value: string) => string,
) => {
  //throw the error if its development mode
  if (typeof attribute === 'symbol') {
    throw new Error('attribute cannot be a symbol');
  }

  return {
    default: `--rrce-${cssVarName}-${style}`,
    parseHTML: (element: HTMLElement) => {
      return element.style[attribute];
    },
    renderHTML: (attributes: Record<string, string>) => {
      if (!attributes[attribute]) {
        return {};
      }
      const isAlreadyAVar = attributes[attribute].startsWith('var(') || attributes[attribute].startsWith('rgb');
      const cssVar = isAlreadyAVar ? attributes[attribute] : `var(${attributes[attribute]})`;

      const value = applyStyle && !isAlreadyAVar ? applyStyle(cssVar) : cssVar;
      return {
        style: `${style}: ${value}`,
      };
    },
  };
};
