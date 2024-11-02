import type {Config} from 'tailwindcss';
import { tailwindPlugin } from 'soa-stories-nuxt/utils'

export default {
    content: [
        './pages/**/*.vue'
    ],
    plugins: [
       tailwindPlugin,
    ]
} satisfies Config;