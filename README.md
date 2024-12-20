# A Nuxt component showcase module built with Nuxt

A simple plug and use module for nuxt

## To add
```bash
pnpm nuxi module add soa-stories-nuxt
```
## Nuxt config
```typescript
export default defineNuxtConfig({
  modules: [
   'soa-stories-nuxt',
  ],
  stories: {
    enabled: true,
    componentsDirs: undefined,
    meta: {
      title: 'My meta title',
      description: 'My meta subtitle'
    },
    title: 'My stories title'
    subtitle: 'My Stories subtitle',
    standalone: false,
  },
});
```

## Configuration
Config keys and their values/defaults:
- **enabled:** if the module is enabled - defaults to false 
- **componentsDirs:** directory path or an array of directory paths for components - defaults to <srcDir>/components 
- **meta:** page meta title and description - defaults to 'Soa Stories Nuxt' and 'A showcase of all components' respectively
- **title:** page title - defaults to 'Soa Stories Nuxt'
- **subtitle:** page subtitle - defaults to 'Our components'
- **standalone:** the path for stories - defaults to false; if true, the path for stories will be on '/', if false, the stories will be available under '/__stories'
