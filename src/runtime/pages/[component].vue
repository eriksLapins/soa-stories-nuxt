<template>
    <div class="soa-flex soa-flex-col soa-gap-4">
        <NuxtLink to="/__stories">< Back</NuxtLink>
        <h1 class="soa-text-lg soa-font-semibold">{{ foundComponent?.name ?? component?.name }}</h1>
        <component :is="component" v-for="variant in variants" v-bind="variant.props" :key="`${route.params.component}-${variant.key}`"/>
    </div>
</template>

<script setup lang="ts">
import {components as componentNames} from '#soa';
import { computed, onMounted, shallowRef, type Component } from 'vue';
import type { ResolvedStoryConfig } from '../../types';
import { useRoute } from '#app';

defineOptions({
    name: 'SoaComponent'
})
const route = useRoute();
const component = shallowRef<Component>();
const foundComponent = (componentNames as ResolvedStoryConfig[]).find(comp => comp.name === route.params.component);

const variants = computed(() => {
    return foundComponent?.variants.map(
        (comp, index) => ({
            key: index,
            props: Object.fromEntries(comp.props.map((item) => [item.name, item.value]))
        })
    )
})

onMounted(async () => {
    if (foundComponent) {
        component.value = (await import(/* @vite-ignore */ foundComponent.component))['default']
    }
})
</script>