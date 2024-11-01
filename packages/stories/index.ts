import { addComponentsDir, addLayout, createResolver, defineNuxtModule } from '@nuxt/kit';
import type {
    StoryModuleOptions,
} from './types'

const { resolve } = createResolver(import.meta.url);
export default defineNuxtModule({
    meta: {
        name: '@soa-stories-nuxt/stories',
        configKey: 'stories',
    },
    hooks: {
      "prepare:types": (options) => {
        options.references.push({
            path: resolve('./types/index.ts')
        })
      },
      "nitro:build:public-assets": (nitro) => {
        nitro.options.publicAssets.push({
            dir: resolve('./public'),
            maxAge: 60 * 60 * 24 * 30,
        })
      }
    },
    setup(resolvedOptions: StoryModuleOptions, nuxt) {
        // adding components
        addComponentsDir({
            path: resolve('./components'),
        });

        // adding layout
        addLayout({
            src: resolve('./layouts/soa.vue'),
        });

        // adding css
        nuxt.options.css ||= [];
        nuxt.options.css.push(resolve('./assets/css'));
    
        // adding pages
        nuxt.hook('pages:extend', (pages) => {
            pages.push({
                path: '/__stories',
                file: resolve('./pages/index.vue'),
                meta: {
                    layout: 'soa',
                },
            });
            const foundBase = pages.find(page => page.path === '/');
            if (foundBase) {
                pages.push({
                    path: '/',
                    redirect: '/__stories'
                })
            }
        });
    },
    defaults: {
        meta: {
            title: 'Soa Stories Nuxt',
            subtitle: 'A showcase of all components'
        },
        title: 'Soa Stories Nuxt',
        subtitle: 'Our components',
        componentsDir: '~/components',
    }
})

