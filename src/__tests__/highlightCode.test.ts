import { describe, expect, it } from 'vitest'
import { detectLanguage, highlightCodeBlocks } from '~/utils/highlightCode'

describe('highlightCodeBlocks', () => {
  it('uses the Dev.to (Rouge) language from <pre class="highlight …"> and drops Rouge spans', () => {
    const html = '<pre class="highlight shell"><code><span class="nb">npm</span> create vite@latest <span class="nt">--template</span> react-ts</code></pre>'
    const out = highlightCodeBlocks(html)
    expect(out).toContain('class="language-bash code-block" data-lang="Bash"')
    expect(out).not.toContain('class="nt"')
    expect(out).toContain('token')
  })

  it('keeps Dev.to plaintext blocks unhighlighted', () => {
    const out = highlightCodeBlocks('<pre class="highlight plaintext"><code>src/\n  a &lt;b&gt;</code></pre>')
    expect(out).toContain('data-lang="Text"')
    expect(out).toContain('a &lt;b&gt;')
    expect(out).not.toContain('class="token')
  })

  it('detects the language of Medium <pre> blocks without <code>', () => {
    const out = highlightCodeBlocks('<pre>version: 2<br>updates:<br>  - package-ecosystem: "npm"</pre>')
    expect(out).toContain('data-lang="YAML"')
  })
})

describe('detectLanguage', () => {
  it.each([
    ['// vite.config.ts\nimport { defineConfig } from "vite"', 'typescript'],
    ['// Tabs.js\nfunction Tabs() {\n  return (<div className="x" />)\n}', 'jsx'],
    ['# .github/workflows/size.yml\nname: Size\non: [push]\njobs:\n  a:\n    runs-on: ubuntu-latest', 'yaml'],
    ['- uses: actions/x@v1\n  with:\n    token: ${{ secrets.TOKEN }}', 'yaml'],
    ['// embed\n//go:embed migrations/*.sql\nvar migrationsFS embed.FS', 'go'],
    ['git reset --soft HEAD~1', 'bash'],
    ['{\n  "semi": true\n}', 'json'],
    ['<Tabs>\n  <Tabs.Tab label="Profil" />\n</Tabs>', 'jsx'],
    ['type Props = { label: string }\nexport function Button({ label }: Props) {\n  return <button>{label}</button>\n}', 'tsx'],
    ['flowchart TD\n  A --> B', 'mermaid'],
    ['src/\n├── modules/\n└── shared/', 'text'],
    ['c3d4e5f HEAD@{0}: reset: moving to HEAD~2', 'text'],
  ])('%#: %s → %s', (code, lang) => {
    expect(detectLanguage(code)).toBe(lang)
  })
})
