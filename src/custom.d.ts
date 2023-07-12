declare module '*.ttf' {
  const content: number;
  export default content;
}

declare module '*.png' {
  const content: number;
  export default content;
}

declare module '*.webp' {
  const content: number;
  export default content;
}

declare namespace ReactNavigation {
  type RootParamList = import('~/core/types').RootParamList;
}
