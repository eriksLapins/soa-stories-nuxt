<template>
  <div>
    <h2>Recursive Sub Component {{ index }}</h2>
    <p>{{ title }}</p>
  </div>
</template>

<script setup lang="ts">

defineProps<{
  index: number;
  title: string,
}>();
</script>

