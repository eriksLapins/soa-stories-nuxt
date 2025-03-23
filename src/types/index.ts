export * from './storyConfig';
export interface ModuleOptions {
  title?: string,
  subtitle?: string,
  meta?: {
    title?: string,
    description?: string,
  },
  componentsDirs?: string | string[], // directory of setup components
  enabled: boolean,
  standalone?: boolean,
  debug?: boolean,
}
  
export interface ModulePublicRuntimeConfig {
  soa: {
    title: string,
    subtitle: string,
    meta: {
      title: string,
      description: string,
    },
    standalone: boolean,
  },
}

declare module 'nuxt/schema' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface PublicRuntimeConfig extends ModulePublicRuntimeConfig {
  }
}