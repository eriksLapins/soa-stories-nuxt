<template>
  <div class="soa-container soa-mx-auto soa-px-4">
    <h1 class="soa-text-lg soa-mb-3 soa-text-black">
      {{ config.public.soa.title }}
    </h1>
    <p class="soa-text-base soa-text-gray-400 soa-mb-6">
      {{ config.public.soa.subtitle }}
    </p>
    <div class="soa-w-full soa-flex soa-flex-col soa-gap-2">
      <NuxtLink
        v-for="(component, index) of components"
        :key="index"
        :to="config.public.soa.standalone ? `/${component.name}` : `/__stories/${component.name}`"
        class="soa-w-full soa-text-black"
      >
        {{ component.name }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRuntimeConfig, useSeoMeta } from '#imports';
import { components } from '#build/soa-components';
defineOptions({
  name: 'SoaIndex'
});
const config = useRuntimeConfig();

useSeoMeta({
  title: config.public.soa.meta.title,
  description: config.public.soa.meta.description,
});
</script>
