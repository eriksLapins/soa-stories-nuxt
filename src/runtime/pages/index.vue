<template>
  <div class="soa-container soa-mx-auto soa-px-4">
    <h1 class="soa-text-lg">
      SortofaShowcase
    </h1>
    <div class="soa-w-full soa-flex soa-flex-col soa-gap-2">
      <NuxtLink
        v-for="(component, index) of components"
        :key="index"
        :to="`/__stories/${component.name}`"
        class="soa-w-full"
      >
        {{ component.name }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import {components} from '#soa';
defineOptions({
  name: 'SoaIndex'
});
</script>
