import type { Config } from 'tailwindcss';

export default {
    content: [
        './pages/**/*.vue',
        './components/**/*.vue',
        './layouts/**/*.vue',
    ],
    theme: {
        extend: {
            colors: {
                'soa-primary': 'var(--primary)',
                'soa-secondary': 'var(--secondary)',
                'soa-accent': 'var(--accent)',
                'soa-background': 'var(--background)',
            },
        },
    },
} satisfies Config;