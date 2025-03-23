import { generateComponentStory } from "soa-stories-nuxt/utils";
import type { StoryConfigProps } from "../../../dist/types";

generateComponentStory({
  name: 'RecursiveComponent',
  component: import('~/components/Recursive/RecursiveComponent.vue'),
  settings: {
    defaultWidth: 500,
  },
  variants: [
    {
      props: [
        {
          name: 'title',
          value: 'Some title',
          type: 'string',
          required: true,
        },
        {
          name: 'children',
          type: 'array',
          value: ['child1', 'child2'],
          subtype: 'string',
        } satisfies StoryConfigProps<string>,
      ],
      vModel: [

      ]
    },
  ]
    
});