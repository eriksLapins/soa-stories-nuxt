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
          name: 'multiselect',
          value: [],
          type: 'multiselect',
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
          name: 'singleSelectObject',
          value: {
            default: 'key',
          },
          type: 'selection',
          subtype: 'object',
          options: [
            {
              some: 'key',
            },
            {
              some: 'another'
            }
          ]
        },
        {
          name: 'singleSelectObjectWithKey',
          value: 'key',
          type: 'selection',
          subtype: 'object',
          key: 'some',
          options: [
            {
              some: 'key',
            },
            {
              some: 'another'
            }
          ]
        }
      ],
      vModel: [

        
      ]
    },
    {
      props: [
        {
          name: 'name',
          value: 'new name',
          type: 'string',
          required: true,
        },
        {
          name: 'multiselect',
          value: ['new', 'option'],
          type: 'multiselect',
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
          name: 'singleSelectObject',
          value: {
            some: 'key',
          },
          type: 'selection',
          subtype: 'object',
          options: [
            {
              some: 'key',
            },
            {
              some: 'another'
            }
          ]
        },
        {
          name: 'singleSelectObjectWithKey',
          value: 'another',
          type: 'selection',
          subtype: 'object',
          key: 'some',
          options: [
            {
              some: 'key',
            },
            {
              some: 'another'
            }
          ]
        }
      ],
      vModel: [

        
      ]
    }
  ]
    
});