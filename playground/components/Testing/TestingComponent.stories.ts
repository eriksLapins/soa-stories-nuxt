import { generateComponentStory } from "soa-stories-nuxt";

generateComponentStory({
  name: 'TestingComponent',
  component: import('~/components/Testing/TestingComponent.vue'),
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