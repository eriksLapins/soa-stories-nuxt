import { generateComponentStory } from "soa-stories-nuxt/utils";

generateComponentStory({
    name: 'TestingComponent',
    component: import('~/components/Testing/TestingComponent.vue'),
    variants: [
        {
            props: [
                {
                    value: 'some',
                    type: 'string',
                    required: true,

                }
            ],
            vModel: []
        }
    ]
    
})