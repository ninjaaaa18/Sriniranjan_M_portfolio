/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        // Technical / mono face. JetBrains Mono is already loaded by
        // src/index.css, so this pass introduces no new webfont dependency.
        mono: [
          'JetBrains Mono',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Consolas',
          'Liberation Mono',
          'monospace',
        ],
        // Editorial / UI body stack: system fonts only, no download.
        // Matches Tailwind's default sans stack exactly (emoji fallbacks
        // included) so no existing text rendering changes.
        sans: [
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji',
        ],
        // Large display / editorial headings reuse the same system stack.
        display: [
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      colors: {
        /* PASS 5H — monochrome + blue visual system.
         * `primary` / `dark` are neutral graphite ramps (off-white canvas,
         * near-black text, grey structure) — no navy cast.
         * `accent` / `darkAccent` are the restrained cool-blue family
         * (#5B8CFF core) used for rules, markers, tags and focus only. */
        // Light-mode structure: off-white canvas, graphite text, grey rules
        primary: {
          50: '#f7f7f5',
          100: '#f1f1ef',
          200: '#e2e2df',
          300: '#cececb',
          400: '#989895',
          500: '#6a6a67',
          600: '#4b4b49',
          700: '#353533',
          800: '#1d1d1c',
          900: '#0d0d0e',
        },
        accent: {
          50: '#eef2ff',
          100: '#dbe4ff',
          200: '#bccfff',
          300: '#9db8ff',
          400: '#7ba0ff',
          500: '#5b8cff',
          600: '#3a63e8',
          700: '#2c4cbc',
          800: '#223a96',
          900: '#1a2c74',
        },
        // Dark-mode structure: near-black canvas, off-white text, graphite rules
        dark: {
          50: '#f4f4f2',
          100: '#e6e6e3',
          200: '#c8c8c5',
          300: '#9e9e9b',
          400: '#7c7c79',
          500: '#555552',
          600: '#343740',
          700: '#24262b',
          800: '#15171a',
          900: '#0a0a0b',
        },
        darkAccent: {
          50: '#eef2ff',
          100: '#dbe4ff',
          200: '#bccfff',
          300: '#9db8ff',
          400: '#7ba0ff',
          500: '#5b8cff',
          600: '#3a63e8',
          700: '#2c4cbc',
          800: '#223a96',
          900: '#1a2c74',
        },

        /* ------------------------------------------------------------- *
         * Pass 5A premium foundation tokens (additive).                  *
         *                                                                *
         * `ink`    -> cinematic near-black neutral ramp (dark direction) *
         * `paper`  -> off-white text ramp                                *
         * `haze`   -> muted neutral / secondary gray ramp                *
         * `signal` -> the single restrained accent (cool blue, PASS 5H)  *
         *                                                                *
         * The existing primary / accent / dark / darkAccent scales above *
         * are intentionally untouched so current components keep their   *
         * exact appearance while the redesign is built on top.           *
         * ------------------------------------------------------------- */
        ink: {
          950: '#050506',
          900: '#0a0a0c',
          850: '#101014',
          800: '#16161a',
          750: '#1b1b20',
          700: '#222227',
          600: '#2e2e35',
          500: '#3d3d45',
          400: '#55555e',
          300: '#7c7c86',
          200: '#a8a8b0',
          100: '#d6d6da',
          50: '#f4f4f6',
        },
        paper: {
          DEFAULT: '#f5f5f3',
          muted: '#b2b2ad',
          subtle: '#7a7a80',
          faint: '#5c5c63',
        },
        haze: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
        },
        /* PASS 5H — the accent is a restrained cool blue. DEFAULT is
         * theme-aware (the --signal var in src/index.css: deeper blue on
         * the light canvas, #5B8CFF on near-black); the steps are fixed
         * blues for any non-themed usage. */
        signal: {
          DEFAULT: 'rgb(var(--signal) / <alpha-value>)',
          300: '#9db8ff',
          400: '#7ba0ff',
          500: '#5b8cff',
          600: '#3a63e8',
          700: '#2c4cbc',
        },

        /* Semantic, theme-aware aliases backed by the CSS variables in
         * src/index.css. They flip automatically between the light and the
         * cinematic dark palette, so future sections can use e.g.
         * `bg-canvas`, `text-fg-muted`, `border-hairline`, `bg-surface/40`. */
        canvas: 'rgb(var(--canvas) / <alpha-value>)',
        'canvas-2': 'rgb(var(--canvas-2) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        elevated: 'rgb(var(--elevated) / <alpha-value>)',
        fg: 'rgb(var(--fg) / <alpha-value>)',
        'fg-muted': 'rgb(var(--fg-muted) / <alpha-value>)',
        'fg-subtle': 'rgb(var(--fg-subtle) / <alpha-value>)',
        'fg-faint': 'rgb(var(--fg-faint) / <alpha-value>)',
        hairline: 'rgb(var(--hairline) / <alpha-value>)',
        'hairline-strong': 'rgb(var(--hairline-strong) / <alpha-value>)',
      },

      /* --------------------------------------------------------------- *
       * Editorial type scale. Sizes use clamp() so one class scales      *
       * smoothly from 320px phones to large desktop with no extra        *
       * breakpoints. Weights stay separate (font-bold / the `.display`   *
       * primitive), and tracking/leading are paired per step.            *
       * --------------------------------------------------------------- */
      fontSize: {
        'display-2xl': ['clamp(2.75rem, 11vw, 10rem)', { lineHeight: '0.92', letterSpacing: '-0.035em' }],
        'display-xl': ['clamp(2.25rem, 8vw, 7rem)', { lineHeight: '0.94', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2rem, 6vw, 5rem)', { lineHeight: '0.98', letterSpacing: '-0.025em' }],
        'display-md': ['clamp(1.75rem, 4.5vw, 3.5rem)', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
        'display-sm': ['clamp(1.5rem, 3.2vw, 2.25rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        lede: ['clamp(1rem, 1.6vw, 1.25rem)', { lineHeight: '1.7' }],
        eyebrow: ['0.75rem', { lineHeight: '1.2', letterSpacing: '0.22em' }],
        label: ['0.6875rem', { lineHeight: '1.1', letterSpacing: '0.28em' }],
        'label-sm': ['0.625rem', { lineHeight: '1.1', letterSpacing: '0.3em' }],
      },
      letterSpacing: {
        tightest: '-0.04em',
        label: '0.28em',
        'label-lg': '0.4em',
      },
      lineHeight: {
        display: '0.95',
        cine: '1.05',
        lede: '1.7',
      },
      /* Premium vertical rhythm: cinematic full sections and tight
       * metadata rows both live on one scale. */
      spacing: {
        gutter: 'clamp(1rem, 4vw, 2.5rem)',
        section: 'clamp(5rem, 12vw, 11rem)',
        'section-tight': 'clamp(3.5rem, 8vw, 7rem)',
        18: '4.5rem',
        22: '5.5rem',
        26: '6.5rem',
        30: '7.5rem',
        34: '8.5rem',
      },
      maxWidth: {
        editorial: '56rem',
        content: '72rem',
        wide: '90rem',
        measure: '68ch',
        '8xl': '96rem',
      },
      /* Motion: fast micro-interactions, medium UI transitions and slow
       * cinematic transitions — restrained, never bouncy. */
      transitionDuration: {
        micro: '150ms',
        ui: '300ms',
        cine: '700ms',
        'cine-slow': '1200ms',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
        cine: 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      borderRadius: {
        xs: '0.125rem',
        '4xl': '2rem',
      },
      /* Restrained depth: hairline-led, no glow. */
      boxShadow: {
        panel: '0 1px 0 0 rgb(255 255 255 / 0.03) inset, 0 24px 60px -32px rgb(0 0 0 / 0.60)',
        lift: '0 18px 48px -28px rgb(0 0 0 / 0.70)',
      },
    },
  },
  plugins: [],
};