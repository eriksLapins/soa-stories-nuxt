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