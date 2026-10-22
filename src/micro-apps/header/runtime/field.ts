import { lerp, prefersReducedMotion } from './util'

const VERT = `#version 300 es
in vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }`

const FRAG = `#version 300 es
precision highp float;
out vec4 outColor;
uniform vec2 uRes;
uniform float uTime;
uniform float uScroll;
uniform vec2 uMouse;
uniform float uMouseAmt;
uniform float uLight;
uniform vec3 uBg;
uniform vec3 uC1;
uniform vec3 uC2;
uniform vec3 uC3;
uniform float uGain;

vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m; m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++) { v += a * snoise(p); p = p * 2.03 + vec2(1.7, 9.2); a *= 0.5; }
  return v;
}
float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
vec2 hash2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return fract(sin(p) * 43758.5453);
}

// One layer of drifting dust. depth 0..1: nearer layers drift and scroll faster and are pushed further by the cursor.
float dustLayer(vec2 p, vec2 m, float scale, float depth, float seed, out float glow) {
  vec2 dm = p - m;
  float md = length(dm);
  p += dm / max(md, 1e-3) * 0.035 * exp(-md * md * 7.0) * uMouseAmt * depth;
  vec2 g = p * scale + vec2(uTime * 0.02 * depth + seed, uScroll * scale * (0.15 + 0.45 * depth));
  vec2 id = floor(g);
  vec2 h = hash2(id + seed);
  float d = length(fract(g) - (0.15 + 0.7 * h));
  float on = step(0.55, hash(id * 1.31 + seed));
  float twinkle = 0.55 + 0.45 * sin(uTime * (0.6 + 2.0 * h.x) + h.y * 6.283);
  float aa = fwidth(g.x);
  float rad = (0.02 + 0.035 * h.y) * (0.6 + 0.6 * depth);
  float core = 1.0 - smoothstep(rad - aa, rad + aa * 1.5, d);
  glow = exp(-d * d * 90.0) * on * twinkle;
  return core * on * twinkle;
}

void main() {
  vec2 frag = gl_FragCoord.xy;
  vec2 p = (frag - 0.5 * uRes) / uRes.y;
  vec2 m = (uMouse - 0.5 * uRes) / uRes.y;
  float t = uTime * 0.035;

  vec2 dm = p - m;
  float md = length(dm);
  float lens = exp(-md * md * 9.0) * uMouseAmt;
  vec2 pw = p - dm * lens * 0.42;

  vec2 q = pw * 1.25 + vec2(0.0, uScroll * 0.32);
  vec2 w = vec2(fbm(q + t), fbm(q + vec2(5.2, 1.3) - t * 0.8));
  float f = fbm(q + 1.7 * w + vec2(t * 0.5, -uScroll * 0.12));

  float region = smoothstep(0.0, 0.75, w.x + 0.3 * sin(uScroll * 0.6 + w.y * 3.0));
  float vign = smoothstep(1.2, 0.2, length((p - vec2(0.35, 0.05)) * vec2(0.8, 1.0)));

  // Few, dim contour lines; part of the dust gathers along them, the rest drifts freely.
  float g = f * 1.6 + uScroll * 0.45 + t * 1.1;
  float d = abs(fract(g) - 0.5);
  float fw = max(fwidth(g), 1e-4);
  float line = 1.0 - smoothstep(0.0, fw * 1.1, d);
  float halo = exp(-d * d / (fw * fw * 10.0));
  float band = exp(-d * d / (fw * fw * 140.0));
  float energy = (0.05 + 0.95 * region) * vign * uGain + lens * 0.6;
  float lines = line * energy * 0.42 + halo * 0.04 * energy;

  float g1, g2, g3;
  float s1 = dustLayer(p, m, 34.0, 0.3, 3.1, g1);
  float s2 = dustLayer(p, m, 22.0, 0.6, 7.7, g2);
  float s3 = dustLayer(p, m, 12.0, 0.9, 12.9, g3);
  float onContour = (s1 * 0.9 + s2 + g2 * 0.25) * band * (0.1 + 0.9 * region) * vign;
  float loose = (s2 * 0.3 + s3 * 0.75 + g3 * 0.12) * (0.55 + 0.45 * vign);
  float dust = (onContour * 1.4 + loose) * (1.0 + lens * 1.2);

  vec3 tint = mix(uC1, uC2, smoothstep(-0.5, 0.6, f));
  tint = mix(tint, uC3, clamp(lens * 1.4, 0.0, 1.0));
  float strength = lines + dust * uGain;

  vec3 dark = uBg + tint * strength * 0.62;
  vec3 light = mix(uBg, tint, clamp(strength * 0.42, 0.0, 0.7));
  vec3 col = mix(dark, light, uLight);

  col += (hash(frag + uTime) - 0.5) / 255.0;
  outColor = vec4(col, 1.0);
}`

const UNIFORMS = ['uRes', 'uTime', 'uScroll', 'uMouse', 'uMouseAmt', 'uLight', 'uBg', 'uC1', 'uC2', 'uC3', 'uGain'] as const
type UniformName = (typeof UNIFORMS)[number]
type Rgb = [number, number, number]

export type FieldController = {
  setScroll: (v: number) => void
  themeChanged: () => void
  destroy: () => void
}

const hexToRgb = (hex: string): Rgb => {
  const h = hex.trim().replace('#', '')
  const n = parseInt(h.length === 3 ? h.replace(/./g, (c) => c + c) : h, 16)
  if (Number.isNaN(n)) return [0, 0, 0]
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
}

function compile(gl: WebGL2RenderingContext, type: number, src: string): WebGLShader | null {
  const s = gl.createShader(type)
  if (!s) return null
  gl.shaderSource(s, src)
  gl.compileShader(s)
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    gl.deleteShader(s)
    return null
  }
  return s
}

export function initField(canvas: HTMLCanvasElement, onLive: () => void): FieldController | null {
  const root = document.documentElement
  const fail = (): null => {
    root.classList.add('no-webgl')
    return null
  }

  let gl: WebGL2RenderingContext | null = null
  try {
    gl = canvas.getContext('webgl2', { antialias: false, alpha: false, depth: false, powerPreference: 'low-power' })
  } catch (e: unknown) {
    gl = null
  }
  if (!gl) return fail()
  const ctx = gl

  const vs = compile(ctx, ctx.VERTEX_SHADER, VERT)
  const fs = compile(ctx, ctx.FRAGMENT_SHADER, FRAG)
  const prog = ctx.createProgram()
  if (!vs || !fs || !prog) return fail()
  ctx.attachShader(prog, vs)
  ctx.attachShader(prog, fs)
  ctx.linkProgram(prog)
  if (!ctx.getProgramParameter(prog, ctx.LINK_STATUS)) return fail()
  ctx.useProgram(prog)

  const buf = ctx.createBuffer()
  ctx.bindBuffer(ctx.ARRAY_BUFFER, buf)
  ctx.bufferData(ctx.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), ctx.STATIC_DRAW)
  const loc = ctx.getAttribLocation(prog, 'aPos')
  ctx.enableVertexAttribArray(loc)
  ctx.vertexAttribPointer(loc, 2, ctx.FLOAT, false, 0, 0)

  const u = {} as Record<UniformName, WebGLUniformLocation | null>
  for (const n of UNIFORMS) u[n] = ctx.getUniformLocation(prog, n)

  // A software rasterizer (no GPU: SwiftShader, llvmpipe) renders this full-screen noise shader on the CPU every
  // frame, which blocks the page. Draw one still frame there, the same as for reduced motion. Chrome and Safari
  // mask RENDERER as "WebKit WebGL" (the real name needs the debug extension); Firefox reports it directly and
  // warns when the extension is requested.
  let renderer = String(ctx.getParameter(ctx.RENDERER))
  if (/^webkit webgl$/i.test(renderer)) {
    const info = ctx.getExtension('WEBGL_debug_renderer_info')
    if (info) renderer = String(ctx.getParameter(info.UNMASKED_RENDERER_WEBGL))
  }
  const still = prefersReducedMotion() || /swiftshader|llvmpipe|softpipe|software/i.test(renderer)
  const mobile = window.matchMedia('(max-width: 760px)').matches
  let scale = Math.min(window.devicePixelRatio || 1, 1.5) * (mobile ? 0.55 : 0.75)
  const isLight = (): number => (root.dataset.theme === 'light' ? 1 : 0)

  let time = Math.random() * 100
  let scroll = 0
  let scrollTarget = 0
  let mouse: [number, number] = [window.innerWidth * 0.68, window.innerHeight * 0.4]
  let mouseTarget: [number, number] = [mouse[0], mouse[1]]
  let mouseAmt = 0
  let mouseAmtTarget = 0
  let light = isLight()
  let lightTarget = light
  let gain = 1
  let colors: [Rgb, Rgb, Rgb, Rgb] = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]

  const readColors = (): void => {
    const cs = getComputedStyle(root)
    const read = (v: string): Rgb => hexToRgb(cs.getPropertyValue(v) || '#000')
    colors = [read('--field-bg'), read('--field-c1'), read('--field-c2'), read('--field-c3')]
    gain = parseFloat(cs.getPropertyValue('--field-gain')) || 1
  }
  readColors()

  const resize = (): void => {
    const w = Math.max(1, Math.round(window.innerWidth * scale))
    const h = Math.max(1, Math.round(window.innerHeight * scale))
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w
      canvas.height = h
      ctx.viewport(0, 0, w, h)
    }
  }
  resize()

  const draw = (): void => {
    const [bg, c1, c2, c3] = colors
    ctx.uniform2f(u.uRes, canvas.width, canvas.height)
    ctx.uniform1f(u.uTime, time)
    ctx.uniform1f(u.uScroll, scroll)
    ctx.uniform2f(u.uMouse, mouse[0] * scale, (window.innerHeight - mouse[1]) * scale)
    ctx.uniform1f(u.uMouseAmt, mouseAmt)
    ctx.uniform1f(u.uLight, light)
    ctx.uniform3fv(u.uBg, bg)
    ctx.uniform3fv(u.uC1, c1)
    ctx.uniform3fv(u.uC2, c2)
    ctx.uniform3fv(u.uC3, c3)
    ctx.uniform1f(u.uGain, gain)
    ctx.drawArrays(ctx.TRIANGLES, 0, 3)
  }

  let raf = 0
  let last = performance.now()
  let slowFrames = 0
  let lastMove = -1e9

  const frame = (now: number): void => {
    raf = 0
    const dt = Math.min(64, now - last)
    last = now
    if (dt > 26) slowFrames++
    else slowFrames = Math.max(0, slowFrames - 1)
    if (slowFrames > 40 && scale > 0.4) {
      scale *= 0.8
      slowFrames = 0
      resize()
    }
    time += dt / 1000
    if (now - lastMove > 2600) {
      const a = time * 0.22
      mouseTarget = [
        window.innerWidth * (0.62 + Math.cos(a) * 0.2),
        window.innerHeight * (0.45 + Math.sin(a * 1.3) * 0.22),
      ]
      mouseAmtTarget = 0.7
    }
    scroll = lerp(scroll, scrollTarget, 0.08)
    mouse = [lerp(mouse[0], mouseTarget[0], 0.09), lerp(mouse[1], mouseTarget[1], 0.09)]
    mouseAmt = lerp(mouseAmt, mouseAmtTarget, 0.05)
    light = lerp(light, lightTarget, 0.08)
    draw()
    if (!document.hidden) raf = requestAnimationFrame(frame)
  }

  const start = (): void => {
    if (still) {
      draw()
      return
    }
    if (!raf && !document.hidden) {
      last = performance.now()
      raf = requestAnimationFrame(frame)
    }
  }
  const stop = (): void => {
    if (raf) cancelAnimationFrame(raf)
    raf = 0
  }

  const onResize = (): void => {
    resize()
    if (still) draw()
  }
  const onVisibility = (): void => (document.hidden ? stop() : start())
  const onPointerMove = (e: PointerEvent): void => {
    if (e.pointerType !== 'mouse') return
    mouseTarget = [e.clientX, e.clientY]
    mouseAmtTarget = 1
    lastMove = performance.now()
  }
  const onPointerLeave = (): void => {
    mouseAmtTarget = 0
  }

  window.addEventListener('resize', onResize)
  document.addEventListener('visibilitychange', onVisibility)
  if (!still) {
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.addEventListener('pointerleave', onPointerLeave)
  }

  onLive()
  start()

  return {
    setScroll(v) {
      scrollTarget = still ? 0 : v
    },
    themeChanged() {
      readColors()
      lightTarget = isLight()
      if (still) {
        light = lightTarget
        draw()
      }
    },
    destroy() {
      stop()
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('pointerleave', onPointerLeave)
      ctx.deleteBuffer(buf)
      ctx.deleteProgram(prog)
      ctx.deleteShader(vs)
      ctx.deleteShader(fs)
    },
  }
}
