import { createSsrReactMicroApp } from "@tuvix.js/react"
import App from './App'

export default createSsrReactMicroApp({
  name: 'projects-app',
  App,
})
