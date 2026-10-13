declare module 'virtual:route-css' {
  /** routeId → stylesheet hrefs; populated only in the production server build (see vite-plugins/routeCss.ts) */
  const routeCss: Record<string, string[]>
  export default routeCss
}
