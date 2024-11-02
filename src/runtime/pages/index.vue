<template>
    <div class="container mx-auto px-4">
        <h1 class="text-lg">SortofaShowcase</h1>
        <div class="w-full">
            <template v-for="(component, index) of soaComponents" :key="index">
                <div class="w-full py-20">
                    {{ component.name }}
                    <component :is="component.component" />
                </div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import componentNames from '#build/soa-components/components';
import type { ResolvedStoryConfig, StoryConfig } from '../types';
defineOptions({
    name: 'SoaIndex'
})
const soaComponents: StoryConfig[] = [];
for (const component of componentNames as ResolvedStoryConfig[]) {
    const componentFile = await import(component.component);
    soaComponents.push({
        ...component,
        component: componentFile
    })
}
</script>
