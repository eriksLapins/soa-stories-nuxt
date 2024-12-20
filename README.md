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

### Configuration for project
Config keys and their values/defaults:
- **enabled:** if the module is enabled - defaults to false 
- **componentsDirs:** directory path or an array of directory paths for components - defaults to <srcDir>/components 
- **meta:** page meta title and description - defaults to 'Soa Stories Nuxt' and 'A showcase of all components' respectively
- **title:** page title - defaults to 'Soa Stories Nuxt'
- **subtitle:** page subtitle - defaults to 'Our components'
- **standalone:** the path for stories - defaults to false; if true, the path for stories will be on '/', if false, the stories will be available under '/__stories'

## Per-story configuration file
The stories are configured by using *.stories.ts files
An example file can be found under [playground](https://github.com/eriksLapins/soa-stories-nuxt/blob/main/playground/components/Testing/TestingComponent.stories.ts)
```typescript
import { generateComponentStory } from "soa-stories-nuxt/utils";

generateComponentStory({
  name: 'TestingComponent',
  component: import('~/components/Testing/TestingComponent.vue'),
  settings: {
    defaultWidth: 500,
  },
  variants: [
    {
      props: [
        {
          name: 'name',
          value: 'some',
          type: 'string',
          required: true,

        }
      ],
      vModel: []
    }
  ]
});
```

### Configuration for the file
- **name:** The name to display for the component 
- **component:** import of the componet from the path 
- **settings:** set the default width for the component display - defaults to 300 (with min width set to 300px)
- **variants:** an array of variants for the component to display (so you can display multiple presets)
  - **props:** an array of objects in the form defined by the [StoryConfigProps](src/types/storyConfig.ts) type
    - only string, number, and boolean types are actually implemented at the moment
    - subtype, required, nullable, and options are not yet implemented
  - **vModel:** not yet implemented
