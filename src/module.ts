import { addComponentsDir, addImportsDir, addLayout, createResolver, defineNuxtModule } from '@nuxt/kit';
import findComponentStories from './runtime/utils/findComponentStories';

const { resolve } = createResolver(import.meta.url);

function resolveFromBase(directory: string) {
    return resolve('./runtime') + directory;
}
export default defineNuxtModule({
    meta: {
        name: '@soa-stories-nuxt/module',
        configKey: 'stories',
    },
    hooks: {
      "prepare:types": (options) => {
        options.references.push({
            path: resolve('./types/index.ts')
        });
      },
      "nitro:build:public-assets": (nitro) => {
        nitro.options.publicAssets.push({
            dir: resolve('./runtime/public'),
            maxAge: 60 * 60 * 24 * 30,
        })
      },
    },
    async setup(resolvedOptions, nuxt) {
        // adding components
        addComponentsDir({
            path: resolve('./runtime/components'),
            global: true,
        });

        // adding layout
        addLayout({
            src: resolve('./runtime/layouts/soa.vue'),
            filename: 'soa.vue',
            write: true,
        });

        // adding other imports
        addImportsDir(resolve('./utils'));

        // adding css
        nuxt.options.css ||= [];
        nuxt.options.css.push(resolve('./runtime/assets/css/app.css'));
    
        // adding pages
        nuxt.hook('pages:extend', (pages) => {
            pages.push({
                path: '/__stories',
                file: resolve('./runtime/pages/index.vue'),
                meta: {
                    layout: 'soa',
                },
            });
        });
        nuxt.hook('tailwindcss:config', (config) => {
            // @ts-expect-error
            config.content ||= {};
            // @ts-ignore
            config.content?.files.push(...[
                resolveFromBase('/pages/**/*.vue'),
                resolveFromBase('/components/**/*.vue'),
                resolveFromBase('/layout/**/*.vue'),
                './.nuxt/soa.vue',
            ])
        });
        if (!nuxt.options._prepare) {
            await findComponentStories(nuxt, resolvedOptions.componentsDir ?? nuxt.options.srcDir + '/components');
        }
    },
    defaults: {
        meta: {
            title: 'Soa Stories Nuxt',
            subtitle: 'A showcase of all components'
        },
        title: 'Soa Stories Nuxt',
        subtitle: 'Our components',
        componentsDir: undefined,
    }
})

