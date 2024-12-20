<template>
  <div class="flex flex-col gap-4 w-full">
    <div>
      String: {{ name }}
    </div>
    <div>
      Array: {{ multiselect }}
    </div>
    <div>
      Object: {{ anObject }}
    </div>
    <div>
      Single select object: {{ singleSelectObject }}
    </div>
    <div>
      Single select object with key: {{ singleSelectObjectWithKey }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'TestingComponent'
});

defineProps<{
  name: string,
  multiselect: string[],
  anObject: {
    some: string,
    key: string[],
  },
  singleSelectObject: Record<string, unknown>,
  singleSelectObjectWithKey: string,
}>();
</script>