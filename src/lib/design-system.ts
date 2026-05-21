/**
 * DRP Design System — Unified tokens, animations, and primitives
 * "A futuristic humanitarian operating system for civilization"
 *
 * Flag of Earth: © Oskar Pernefeldt, 2015. CC BY 4.0
 * https://www.flagofearth.com
 */

export const DRP_TOKENS = {
  colors: {
    cyan: '#00e5cc',
    cyanAlt: '#00bfff',
    cyanDim: '#00c4af',
    purple: '#a855f7',
    gold: '#ffd700',
    amber: '#f59e0b',
    green: '#00ff88',
    red: '#ff4444',
    dark: {
      base: '#030308',
      surface: '#0a0a14',
      elevated: '#111118',
      overlay: '#1a1a24',
    },
    light: {
      base: '#ffffff',
      surface: '#f8f9fa',
      elevated: '#f0f1f3',
      overlay: '#e8e9ec',
    },
  },
  animation: {
    fast: '150ms',
    normal: '250ms',
    slow: '400ms',
    verySlow: '700ms',
    easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
  gradients: {
    cyanBlue: 'linear-gradient(135deg, #00e5cc, #00bfff)',
    cyanPurple: 'linear-gradient(135deg, #00e5cc, #a855f7)',
    goldCyan: 'linear-gradient(135deg, #ffd700, #00e5cc)',
    darkAtmosphere: 'radial-gradient(ellipse at top, #0a0a1a 0%, #030308 60%)',
    lightAtmosphere: 'radial-gradient(ellipse at top, #f0f8ff 0%, #ffffff 60%)',
  },
  levelColors: ['#00e5cc', '#00bfff', '#a855f7', '#f59e0b', '#ffd700'],
}

export const cn = (...classes: (string | undefined | null | false)[]) =>
  classes.filter(Boolean).join(' ')
