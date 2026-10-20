import Prism from 'prismjs'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-scss'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-markdown'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-go'
import 'prismjs/components/prism-rust'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-diff'
import 'prismjs/components/prism-docker'
import 'prismjs/components/prism-mermaid'

const LANG_LABELS: Record<string, string> = {
  javascript: 'JavaScript',
  jsx: 'JSX',
  typescript: 'TypeScript',
  tsx: 'TSX',
  bash: 'Bash',
  json: 'JSON',
  yaml: 'YAML',
  markdown: 'Markdown',
  python: 'Python',
  go: 'Go',
  rust: 'Rust',
  java: 'Java',
  markup: 'HTML',
  css: 'CSS',
  scss: 'SCSS',
  diff: 'Diff',
  docker: 'Dockerfile',
  mermaid: 'Mermaid',
  text: 'Text',
}

const LANG_ALIASES: Record<string, string> = {
  js: 'javascript',
  ts: 'typescript',
  py: 'python',
  golang: 'go',
  sh: 'bash',
  shell: 'bash',
  zsh: 'bash',
  console: 'bash',
  shellsession: 'bash',
  yml: 'yaml',
  md: 'markdown',
  html: 'markup',
  xml: 'markup',
  svg: 'markup',
  vue: 'markup',
  dockerfile: 'docker',
  plaintext: 'text',
  plain: 'text',
  txt: 'text',
}

const CODE_BLOCK_RE = /<pre([^>]*)>\s*<code([^>]*)>([\s\S]*?)<\/code>\s*<\/pre>/gi
const PLAIN_PRE_RE = /<pre(?:\s[^>]*)?>(?!\s*<code)([\s\S]*?)<\/pre>/gi

function decode(html: string): string {
  return html
    .replace(/<br\s*\/?>\r?\n?/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
}

function declaredLanguage(attrs: string): string | undefined {
  const cls = attrs.match(/class="([^"]*)"/i)?.[1]
  if (!cls) return undefined
  const name = cls.match(/(?:^|\s)language-([\w+-]+)/)?.[1] ?? cls.match(/(?:^|\s)highlight\s+([\w+-]+)/)?.[1]
  if (!name) return undefined
  const key = name.toLowerCase()
  return LANG_ALIASES[key] ?? key
}

const EXT_LANGS: Record<string, string> = {
  js: 'javascript', mjs: 'javascript', cjs: 'javascript', jsx: 'jsx', ts: 'typescript', mts: 'typescript', tsx: 'tsx',
  json: 'json', prettierrc: 'json', babelrc: 'json', yml: 'yaml', yaml: 'yaml', md: 'markdown', py: 'python', go: 'go',
  sh: 'bash', bash: 'bash', zsh: 'bash', css: 'css', scss: 'scss', html: 'markup', vue: 'markup',
}

const JSX_RE = /<([A-Z][\w.]*|[a-z]+)(\s[^<>]*)?\/?>[\s\S]*?(<\/|\/>)|return\s*\(\s*<|\bclassName=|=\{|\{[^}]*&&\s*</
const TYPES_RE = /\binterface\s+\w+|\btype\s+\w+\s*=|:\s*(string|number|boolean|void|unknown|React\.\w+)\b|\bas\s+const\b|<\w+(\[\])?>\(|\bimport\s+type\s/

export function detectLanguage(code: string): string {
  const src = code.trim()
  if (!src) return 'text'

  const firstLine = src.split('\n', 1)[0]
  const ext = firstLine.match(/^(?:\/\/|#)\s*[\w./-]*\.(\w+)\b/)?.[1]?.toLowerCase()
  const hinted = ext ? EXT_LANGS[ext] : undefined
  if (hinted === 'javascript') return JSX_RE.test(src) ? 'jsx' : 'javascript'
  if (hinted === 'typescript') return JSX_RE.test(src) ? 'tsx' : 'typescript'
  if (hinted) return hinted

  const body = src.replace(/^(\s*\/\/[^\n]*\n)+/, '').trim()
  if (/^(flowchart|graph)\s+(TD|TB|BT|LR|RL)\b|^(sequenceDiagram|classDiagram|stateDiagram|erDiagram|gantt)\b/.test(body)) return 'mermaid'
  if (/[├└│]──/.test(body)) return 'text'
  if (/^---\r?\n[\s\S]*?\r?\n---/.test(body) || /^#{2,6}\s/.test(body)) return 'markdown'
  if (/^diff --git |^@@ .+ @@/m.test(body)) return 'diff'
  if (/^\s*[[{]\s*("[^"]+"\s*:|\[|\{|"|\d|true|false|null)/.test(body) && !/=>|\bfunction\b/.test(body)) return 'json'
  if (/^package\s+\w+|^\s*func\s+(\([^)]*\)\s*)?\w+\s*\(|\/\/go:embed|^\s*import\s+\(|\w+\s*:=\s*/m.test(src)) return 'go'
  if (/^\s*(def\s+\w+\s*\(|class\s+\w+(\(.*\))?:\s*$|from\s+[\w.]+\s+import\s|import\s+\w+\s*$)|print\(/m.test(body)) return 'python'
  if (/^\s*<(!DOCTYPE|html|head|body)\b/i.test(body)) return 'markup'
  const looksJs = /^\s*(import\s.+\sfrom\s|import\s+['"]|import\(|export\s|const\s|let\s|var\s|function\s|async\s|class\s+\w+|return\s|module\.exports)|=>|console\.\w+\(|\bawait\s|\buse[A-Z]\w*\(|\brequire\(/m.test(body)
  const jsxFragment = /^\s*(<[A-Z]|\{[^}]*&&\s*<|<[a-z]+\s[^>]*\bclassName=)/.test(body)
  if (looksJs || jsxFragment || /^[\w$]+\s*:\s*[{[]/.test(body)) {
    const hasTypes = TYPES_RE.test(body)
    if (jsxFragment || JSX_RE.test(body)) return hasTypes ? 'tsx' : 'jsx'
    return hasTypes ? 'typescript' : 'javascript'
  }
  if (/^\s*(\$\s+)?(npm|npx|yarn|pnpm|bun|git|cd|mkdir|touch|curl|wget|brew|docker|echo|export|sudo|ls|rm|cp|mv|node|go|pip|python3?|chmod|cat)\b/m.test(body)) return 'bash'
  if (/^\s*(FROM|RUN|COPY|WORKDIR|CMD|ENTRYPOINT)\s/m.test(body)) return 'docker'
  if (/^\s*<[a-z][\w-]*(\s[^>]*)?>/i.test(body)) return 'markup'
  if (/^\s*[@.#:]?[\w-][\w\s.#:>,-]*\{[\s\S]*?[\w-]+\s*:\s*[^;{}]+;/m.test(body)) return /\$[\w-]+\s*:|&[:.\w-]|@mixin|@include|@use\s/.test(body) ? 'scss' : 'css'
  const lines = body.split(/\r?\n/).filter((l) => l.trim() && !l.trim().startsWith('#'))
  const yamlish = lines.filter((l) => /^\s*(- )?[\w"'.-]+\s*:(\s|$)|^\s*- \S/.test(l)).length
  if (lines.length >= 2 && yamlish / lines.length >= 0.6 && !/[;{}]/.test(body.replace(/\$\{\{[^}]*\}\}/g, ''))) return 'yaml'
  return 'text'
}

function renderBlock(code: string, declared: string | undefined): string {
  const lang = declared && declared !== 'text' && Prism.languages[declared]
    ? declared
    : declared === 'text' ? 'text' : detectLanguage(code)
  const label = LANG_LABELS[lang] ?? lang
  const body = lang !== 'text' && Prism.languages[lang]
    ? Prism.highlight(code, Prism.languages[lang], lang)
    : code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  return `<pre class="language-${lang} code-block" data-lang="${label}"><code class="language-${lang}">${body}</code></pre>`
}

export function highlightCodeBlocks(html: string): string {
  let result = html.replace(CODE_BLOCK_RE, (_, preAttrs: string, codeAttrs: string, rawCode: string) =>
    renderBlock(decode(rawCode), declaredLanguage(codeAttrs) ?? declaredLanguage(preAttrs)),
  )
  result = result.replace(PLAIN_PRE_RE, (_, rawCode: string) => renderBlock(decode(rawCode), undefined))
  return result
}
