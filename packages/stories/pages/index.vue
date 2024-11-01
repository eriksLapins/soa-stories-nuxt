<template>
    <div class="container mx-auto px-4">
        <h1 class="text-lg">SortofaShowcase</h1>
        <div class="w-full">
            <template v-for="(component, index) of soaComponentNames" :key="index">
                <div class="w-full py-20">
                    {{ component.name }}
                    <component :is="component.component" />
                </div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { componentNames } from '#components';
defineOptions({
    name: 'SoaIndex'
})

const soaComponentNames: ({name: string; component: string | Component})[] = componentNames.filter(
    (name) => name.includes('Soa')
    ).map((component) => {
        return {
            name: component.replace("Soa", ""),
            component: resolveComponent(component) 
        }
    });
</script>
