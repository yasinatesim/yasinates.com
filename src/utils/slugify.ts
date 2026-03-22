/**
 * Turkish-aware slugify.
 * Maps Turkish characters to ASCII equivalents before lowercasing,
 * so "Sıfırdan İleri" → "sifirdan-ileri", not "sfrdan-leri".
 */
const TURKISH_MAP: Record<string, string> = {
  ı: 'i', İ: 'i',
  ğ: 'g', Ğ: 'g',
  ş: 's', Ş: 's',
  ç: 'c', Ç: 'c',
  ö: 'o', Ö: 'o',
  ü: 'u', Ü: 'u',
}

export function slugify(text: string): string {
  return text
    .split('').map(c => TURKISH_MAP[c] ?? c).join('')
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')   // drop non-word chars (keeps letters, digits, _, -, spaces)
    .replace(/[\s_]+/g, '-')    // spaces and underscores → dash
    .replace(/-+/g, '-')        // collapse multiple dashes
    .replace(/^-+|-+$/g, '')    // trim leading/trailing dashes
}

export function pascalCase(str: string): string {
  if (str === 'typescript') return 'TypeScript'
  if (str === 'javascript') return 'JavaScript'
  return str.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')
}
