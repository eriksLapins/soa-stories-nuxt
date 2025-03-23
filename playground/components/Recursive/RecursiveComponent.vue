<template>
  <div>
    <h1>Recursive Component {{ title }}</h1>
    <RecursiveSubComponent
      v-for="(child, i) in children"
      :key="i"
      :title="`Subcomponent ${child} ${i}`"
      :index="i"
    />
  </div>
</template>

<script setup lang="ts">

defineProps<{
  title: string,
  children: string[],
}>();
</script>

