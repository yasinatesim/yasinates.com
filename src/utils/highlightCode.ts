/**
 * Server-side code block highlighter using Prism.js.
 * Processes <pre><code class="language-xxx"> blocks in HTML strings.
 * Used in route loaders so Vue components can render pre-highlighted HTML via v-html.
 */
import Prism from 'prismjs'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-scss'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-go'
import 'prismjs/components/prism-rust'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-markup'

// Short aliases used in fenced code blocks (e.g. ```py, ```js, ```ts)
const LANG_ALIASES: Record<string, string> = {
  py: 'python',
  js: 'javascript',
  ts: 'typescript',
  sh: 'bash',
  shell: 'bash',
  zsh: 'bash',
  yml: 'yaml',
  html: 'markup',
  xml: 'markup',
  svg: 'markup',
}

// Matches <pre><code class="language-xxx"> or <pre><code> (with or without language)
const CODE_BLOCK_RE = /<pre[^>]*><code(?:\s+class="language-([a-zA-Z0-9]+)")?>([\s\S]*?)<\/code><\/pre>/g
// Matches <pre> WITHOUT a <code> child (Medium plain blocks)
const PLAIN_PRE_RE = /<pre(?:\s[^>]*)?>(?!<code)([\s\S]*?)<\/pre>/gi

function decode(html: string): string {
  return html
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/<br\s*\/?>\r?\n?/gi, '\n')
}

function escape(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export function highlightCodeBlocks(html: string): string {
  // Pass 1: <pre><code class="language-xxx"> — syntax highlight
  let result = html.replace(CODE_BLOCK_RE, (_, lang: string | undefined, rawCode: string) => {
    const code = decode(rawCode)
    const resolvedLang = lang ? (LANG_ALIASES[lang] ?? lang) : undefined
    if (resolvedLang && Prism.languages[resolvedLang]) {
      const highlighted = Prism.highlight(code, Prism.languages[resolvedLang], resolvedLang)
      return `<pre class="language-${resolvedLang} code-block"><code class="language-${resolvedLang}">${highlighted}</code></pre>`
    }
    // No language or unsupported — fall back to bash for consistent Prism styling
    return `<pre class="language-bash code-block"><code class="language-bash">${escape(code)}</code></pre>`
  })
  // Pass 2: <pre>text</pre> without <code> (Medium plain blocks)
  result = result.replace(PLAIN_PRE_RE, (_, rawCode: string) => {
    const code = decode(rawCode)
    return `<pre class="language-bash code-block"><code class="language-bash">${escape(code)}</code></pre>`
  })
  return result
}
