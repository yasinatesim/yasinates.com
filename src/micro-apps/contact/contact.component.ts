import '@angular/compiler'
import 'reflect-metadata'
import { Component, ViewEncapsulation } from '@angular/core'
import { CONTACT_MARKUP } from './markup'

@Component({
  selector: 'app-iletisim',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  template: CONTACT_MARKUP,
})
export class ContactComponent {}
