<template>
    <div class="container mx-auto px-4">
        <h1 class="text-lg">SortofaShowcase</h1>
        <div class="w-full flex flex-col gap-2">
            <NuxtLink :to="`/__stories/${component.name}`" class="w-full"  v-for="(component, index) of components" :key="index">
                {{ component.name }}
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import { components } from '#soa';
defineOptions({
    name: 'SoaIndex'
})
</script>
