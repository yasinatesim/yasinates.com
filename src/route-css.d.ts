declare module 'virtual:route-css' {
  export function getRouteCss(): Promise<Record<string, string[]>>
}
