import { addComponentsDir, addImportsDir, addLayout, createResolver, defineNuxtModule } from '@nuxt/kit';
import findComponentStories from './runtime/utils/findComponentStories';
import { writeFileSync } from 'node:fs';
export * from './types/index';

export interface ModuleOptions {
  title?: string;
  subtitle?: string;
  meta?: {
    title?: string;
    subtitle?: string;
  },
  componentsDir?: string; // directory of setup components
  enabled: boolean;
}

const { resolve } = createResolver(import.meta.url);

function resolveFromBase(directory: string) {
  return resolve('./runtime') + directory;
}
export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@soa-stories-nuxt/module',
    configKey: 'stories',
  },
  hooks: {
    "prepare:types": (options) => {
      options.tsConfig.compilerOptions.paths['#soa'] = [
        './soa'
      ];
    },
    "nitro:build:public-assets": (nitro) => {
      nitro.options.publicAssets.push({
        dir: resolve('./runtime/public'),
        maxAge: 60 * 60 * 24 * 30,
      });
    },
  },
  async setup(resolvedOptions, nuxt) {
    if (!resolvedOptions.enabled) {
      return;
    }
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
    nuxt.options.css.push(resolve('./runtime/assets/css/soa-tw.css'));

    // adding pages
    nuxt.hook('pages:extend', async (pages) => {
      if (!nuxt.options._prepare) {
        await findComponentStories(nuxt, resolvedOptions.componentsDir ?? nuxt.options.srcDir + '/components');
        const componentsDir = resolve(nuxt.options.srcDir + '/.nuxt/soa/index.ts');
        nuxt.options.alias['#soa'] = componentsDir;
        nuxt.options.build.transpile.push(componentsDir);
                
        writeFileSync(
          nuxt.options.buildDir + '/soa/index.ts',
          `export * from './components';`
        );
      }
      pages.push({
        path: '/__stories',
        file: resolve('./runtime/pages/index.vue'),
        meta: {
          layout: 'soa',
        },
      });
      pages.push({
        path: '/__stories/:component',
        file: resolve('./runtime/pages/[component].vue'),
        meta: {
          layout: 'soa',
        },
      });
    });
  },
  defaults: {
    meta: {
      title: 'Soa Stories Nuxt',
      subtitle: 'A showcase of all components'
    },
    title: 'Soa Stories Nuxt',
    subtitle: 'Our components',
    componentsDir: undefined,
    enabled: false,
  }
});