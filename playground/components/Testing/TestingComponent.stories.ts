import { generateComponentStory } from "soa-stories-nuxt/utils";
import type { StoryConfigProps } from "../../../dist/types";

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
          type: 'selection',
          subtype: 'object',
          name: 'singleSelectObject',
          value: {
            default: 'key',
          },
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
    },
    {
      props: [
        // simple props
        {
          name: 'name',
          value: 'new name',
          type: 'string',
          required: true,
        },
        {
          name: 'number',
          value: 123,
          type: 'number',
          required: true,
        },
        {
          name: 'boolean',
          value: true,
          type: 'boolean',
          required: true,
        },
        // simple array props
        // - selection
        {
          name: 'selectionString',
          type: 'selection',
          value: 'options',
          subtype: 'string',
          options: ['some', 'options'],
        },
        {
          name: 'selectionNumber',
          type: 'selection',
          subtype: 'number',
          value: 1,
          options: [1, 2],
        },
        {
          name: 'selectionBoolean',
          type: 'selection',
          subtype: 'boolean',
          value: false,
          options: [true, false],
        },
        // - multiselect
        {
          name: 'multiselectString',
          value: ['new', 'option'],
          type: 'multiselect',
          subtype: 'string',
          options: ['some', 'new', 'option'],
        },
        {
          name: 'multiselectNumber',
          type: 'multiselect',
          subtype: 'number',
          value: [1, 2],
          options: [1, 2, 3],
        },
        {
          name: 'multiselectBoolean',
          type: 'multiselect',
          subtype: 'boolean',
          value: [false],
          options: [true, false],
        },

        // - no selection
        {
          name: 'arrayString',
          type: 'array',
          subtype: 'string',
          value: ['string'],
        },
        {
          name: 'arrayNumber',
          type: 'array',
          subtype: 'number',
          value: [1, 2],
        },
        {
          name: 'arrayBoolean',
          type: 'array',
          subtype: 'boolean',
          value: [true, false],
        },
        // object array types
        // - selection without key
        {
          name: 'singleSelectObject',
          type: 'selection',
          subtype: 'object',
          value: {
            some: 'key',
          },
          options: [
            {
              some: 'key',
              another: 'key',
            },
            {
              some: 'another',
            }
          ],
        } satisfies StoryConfigProps<{
          some: string,
          another?: string,
        }>,
        // - selection with key
        {
          name: 'singleSelectObjectWithKey',
          type: 'selection',
          subtype: 'object',
          value: 'another',
          key: 'some',
          options: [
            {
              some: 'key',
            },
            {
              some: 'another'
            }
          ]
        } satisfies StoryConfigProps<{
          some: string,
          new?: string,
        }>,
        // Object props
        {
          name: 'anObject',
          value: {
            some: 'key',
            key: []
          },
          type: 'object'
        } satisfies StoryConfigProps<{
          some: string,
          key: string[],
        }>,
      ],
    }
  ]
    
});