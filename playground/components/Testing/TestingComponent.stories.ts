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
        },
        {
          name: 'anArray',
          value: [],
          type: 'array',
          subtype: 'string',
          options: ['some', 'new', 'option'],
        },
        {
          name: 'anObject',
          value: {
            some: 'key',
            key: []
          },
          type: 'object'
        },
        {
          name: 'anObjectArray',
          value: [{
            default: 'key',
          }],
          type: 'array',
          subtype: 'object',
          options: [
            {
              some: 'key',
            },
            {
              another: 'key'
            }
          ]
        }
      ],
      vModel: []
    }
  ]
    
});