/// <reference types="vinxi/types/client" />

import '@angular/compiler'
import 'reflect-metadata'
import { hydrateRoot } from 'react-dom/client'
import { StartClient } from '@tanstack/react-start'
import { createRouter } from './router'
import { initOrchestrator, orchestrator } from './orchestrator'

const router = createRouter()

hydrateRoot(document, <StartClient router={router} />)

// Defer until after React hydration; onLoad doesn't fire on initial SSR load.
setTimeout(() => {
  initOrchestrator()

  router.subscribe('onLoad', () => {
    orchestrator.reconcile(window.location.pathname)
    window.dispatchEvent(new CustomEvent('tuvix:pathchange'))
  })
}, 0)
