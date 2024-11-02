import plugin from "tailwindcss/plugin";

export const tailwindPlugin = plugin(
    () => {},
    {
        theme: {
            extend: {
                colors: {
                    'soa-primary': 'var(--primary)',
                    'soa-secondary': 'var(--secondary)',
                    'soa-accent': 'var(--accent)',
                    'soa-background': 'var(--background)',
                },
            }
        },
    },
)