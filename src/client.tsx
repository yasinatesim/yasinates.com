/// <reference types="vinxi/types/client" />

import { hydrateRoot } from 'react-dom/client'
import { StartClient } from '@tanstack/react-start'
import { createRouter } from './router'
import { initOrchestrator, orchestrator } from './orchestrator'

const router = createRouter()

hydrateRoot(document, <StartClient router={router} />)

setTimeout(() => {
  initOrchestrator()

  router.subscribe('onLoad', () => {
    orchestrator.reconcile(window.location.pathname)
    window.dispatchEvent(new CustomEvent('tuvix:pathchange'))
  })
}, 0)
