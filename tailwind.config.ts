import type { Config } from "tailwindcss";

export default {
  content: [
    './src/runtime/pages/**/*.vue',
    './src/runtime/layouts/**/*.vue',
    './src/runtime/components/**/*.vue',
  ],
  prefix: 'soa-',
  theme: {
    extend: {
      colors: {
        'primary': 'var(--soa-primary)',
        'secondary': 'var(--soa-secondary)',
        'accent': 'var(--soa-accent)',
        'background': 'var(--soa-background)',
      },
    }
  },
} satisfies Config;