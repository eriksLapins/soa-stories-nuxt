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
                'primary': 'var(--primary)',
                'secondary': 'var(--secondary)',
                'accent': 'var(--accent)',
                'background': 'var(--background)',
            },
        }
    }
} satisfies Config