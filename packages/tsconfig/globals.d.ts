declare module '*.scss' {
  const classes: { [key: string]: string };
  export default classes;
}
declare module '.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}
