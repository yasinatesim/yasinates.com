// This plugin runs before any route handler is loaded.
// @angular/common has a static initialiser that calls getCompilerFacade(),
// which requires @angular/compiler to be available. Importing it here
// guarantees it is the first Angular-related module in the bundle.
import '@angular/compiler'
import 'reflect-metadata'

export default defineNitroPlugin(() => {
  // side-effect imports above are all that's needed
})
