<template>
  <div class="bg-red-400">
    Hello: {{ name }}
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'TestingComponent'
});

defineProps<{
  name: string
}>();
</script>