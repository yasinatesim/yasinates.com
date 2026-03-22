// Must load before any route handler — ensures @angular/compiler is available before @angular/common's static initialiser runs.
import '@angular/compiler'
import 'reflect-metadata'

export default defineNitroPlugin(() => {})
