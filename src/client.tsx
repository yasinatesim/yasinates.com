/// <reference types="vinxi/types/client" />
import { hydrateRoot } from 'react-dom/client'
import { StartClient } from '@tanstack/react-start'
import { createRouter } from './router'
import { initOrchestrator } from './orchestrator'

const router = createRouter()

hydrateRoot(document, <StartClient router={router} />)

// Initialize the tuvix.js shell orchestrator after React hydration.
// Micro app registrations are added to initOrchestrator() as apps are deployed.
initOrchestrator()
