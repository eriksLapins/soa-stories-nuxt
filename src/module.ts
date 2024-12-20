import { addComponentsDir, addImportsDir, addLayout, createResolver, defineNuxtModule } from '@nuxt/kit';
import findComponentStories from './runtime/utils/findComponentStories';
import { writeFileSync } from 'node:fs';
import type { ResolvedStoryConfig } from './types/index';
export * from './types/index';

export interface ModuleOptions {
  title?: string;
  subtitle?: string;
  meta?: {
    title?: string;
    description?: string;
  },
  componentsDirs?: string | string[]; // directory of setup components
  enabled: boolean;
  standalone?: boolean;
}

export interface ModulePublicRuntimeConfig {
  title: string;
  subtitle: string;
  meta: {
    title: string;
    description: string;
  },
  standalone: boolean;
}

const { resolve } = createResolver(import.meta.url);

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
  defaults: {
    meta: {
      title: 'Soa Stories Nuxt',
      description: 'A showcase of all components'
    },
    title: 'Soa Stories Nuxt',
    subtitle: 'Our components',
    componentsDirs: undefined,
    enabled: false,
    standalone: false,
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

    nuxt.options.runtimeConfig.public ||= {};
    Object.assign(nuxt.options.runtimeConfig.public, {
      soa: {
        meta: resolvedOptions.meta,
        title: resolvedOptions.title,
        subtitle: resolvedOptions.subtitle,
        standalone: resolvedOptions.standalone
      }
    });

    // adding pages
    nuxt.hook('pages:extend', async (pages) => {
      if (!nuxt.options._prepare) {
        const components: ResolvedStoryConfig[] = [];
        if (resolvedOptions.componentsDirs) {
          if (Array.isArray(resolvedOptions.componentsDirs)) {
            for (const dir of resolvedOptions.componentsDirs) {
              const resolvedComponents = await findComponentStories(nuxt, dir);
              components.push(...resolvedComponents);
            }
          } else {
            const resolvedComponents = await findComponentStories(nuxt, resolvedOptions.componentsDirs);
            components.push(...resolvedComponents);
          }
        } else {
          const resolvedComponents = await findComponentStories(nuxt, nuxt.options.srcDir + '/components');
          components.push(...resolvedComponents);
        }
        writeFileSync(
          nuxt.options.buildDir + '/soa/components.ts',
          `export const components = ${JSON.stringify(components)}`
        );
        const componentsDir = resolve(nuxt.options.srcDir + '/.nuxt/soa/index.ts');
        nuxt.options.alias['#soa'] = componentsDir;
        nuxt.options.build.transpile.push(componentsDir);
                
        writeFileSync(
          nuxt.options.buildDir + '/soa/index.ts',
          `export * from './components';`
        );
      }
      const isStandalone = resolvedOptions.standalone;
      pages.push({
        path: isStandalone ? '/' : '/__stories',
        file: resolve('./runtime/pages/index.vue'),
        meta: {
          layout: 'soa',
        },
      });
      pages.push({
        path: isStandalone ? '/:component' : '/__stories/:component',
        file: resolve('./runtime/pages/[component].vue'),
        meta: {
          layout: 'soa',
        },
      });
    });
  },
});