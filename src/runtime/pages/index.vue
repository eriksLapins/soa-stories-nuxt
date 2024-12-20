<template>
  <div class="soa-container soa-mx-auto soa-px-4">
    <h1 class="soa-text-lg soa-mb-3">
      {{ config.public.soa.title }}
    </h1>
    <P class="soa-text-base soa-text-gray-400 soa-mb-6">
      {{ config.public.soa.subtitle }}
    </P>
    <div class="soa-w-full soa-flex soa-flex-col soa-gap-2">
      <NuxtLink
        v-for="(component, index) of components"
        :key="index"
        :to="config.public.soa.standalone ? `/${component.name}` : `/__stories/${component.name}`"
        class="soa-w-full"
      >
        {{ component.name }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRuntimeConfig, useSeoMeta } from '#imports';
import { components } from '#soa';
defineOptions({
  name: 'SoaIndex'
});
const config = useRuntimeConfig();

useSeoMeta({
  title: config.public.soa.meta.title,
  description: config.public.soa.meta.description,
});
</script>
