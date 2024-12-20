<template>
  <div class="flex flex-col gap-4 w-full">
    <div>
      String: {{ name }}
    </div>
    <div>
      Array: {{ anArray }}
    </div>
    <div>
      Object: {{ anObject }}
    </div>
    <div>
      Object Array: {{ anObjectArray }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'TestingComponent'
});

defineProps<{
  name: string,
  anArray: string[],
  anObject: {
    some: string,
    key: string[],
  },
  anObjectArray: Record<string, unknown>[]
}>();
</script>