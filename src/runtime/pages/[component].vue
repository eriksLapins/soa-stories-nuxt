<template>
  <div class="soa-flex soa-flex-col soa-gap-4">
    <NuxtLink to="/__stories">
      Back
    </NuxtLink>
    <h1 class="soa-text-lg soa-font-semibold">
      {{ foundComponent?.name ?? componentInstance?.name }}
    </h1>
    <div
      v-for="variant in variants"
      :key="`${route.params.component}-${variant.key}`"
    >
      <component
        :is="componentInstance"
        v-bind="variant.props"
      />
      {{ variant.props }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { components as componentNames } from '#soa';
import { computed, onMounted, shallowRef, type Component } from 'vue';
import type { ResolvedStoryConfig } from '../../types';
import { useRoute } from '#app';

defineOptions({
  name: 'SoaComponent'
});
const route = useRoute();
const componentInstance = shallowRef<Component>();
const foundComponent = (componentNames as ResolvedStoryConfig[]).find(comp => comp.name === route.params.component);

const variants = computed(() => {
  return foundComponent?.variants.map(
    (comp, index) => ({
      key: index,
      props: Object.fromEntries(comp.props.map((item) => [item.name, item.value]))
    })
  );
});

onMounted(async () => {
  if (foundComponent) {
    componentInstance.value = (await import(/* @vite-ignore */ foundComponent.component))['default'];
    console.log(componentInstance.value);
  }
});
</script>