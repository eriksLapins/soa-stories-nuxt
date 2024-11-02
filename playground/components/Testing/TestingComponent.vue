<template>
    <div>
        Hello: {{ name }}
    </div>
</template>

<script setup lang="ts">
defineOptions({
    name: 'TestingComponent'
})

defineProps<{
    name: string
}>();
</script>