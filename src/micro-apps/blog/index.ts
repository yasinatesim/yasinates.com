import { createSsrReactMicroApp } from "@tuvix.js/react"
import App from './BlogApp'

export default createSsrReactMicroApp({
  name: 'blog-app',
  App,
})
