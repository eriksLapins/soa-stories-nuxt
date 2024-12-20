<template>
  <div
    v-if="foundComponent"
    class="soa-flex soa-flex-col soa-gap-4 xl:soa-container xl:soa-mx-auto soa-px-4"
  >
    <NuxtLink
      :to="config.public.soa.standalone ? `/` : '/__stories'"
      class="soa-text-base soa-text-black"
    >
      Back
    </NuxtLink>
    <h1 class="soa-text-lg soa-font-semibold soa-text-black">
      {{ foundComponent?.name ?? componentInstance?.name }}
    </h1>
    <div class="soa-mx-auto soa-relative">
      <div
        class="soa-grid soa-grid-cols-1 soa-gap-4"
        :style="{
          minWidth: '300px',
          width: `${displayWidth}px`
        }"
      >
        <div
          v-for="(variant, index) in variants"
          :key="`${route.params.component}-${variant.key}`"
        >
          <component
            :is="componentInstance"
            v-bind="variant.props"
          />
          <div
            class="soa-flex soa-flex-col soa-gap-4 soa-py-10"
          >
            <h2 class="soa-font-semibold soa-text-black">
              Props
            </h2>
            <div
              class="soa-grid soa-grid-cols-1 soa-gap-4 soa-py-4"
              :class="{
                'md:soa-grid-cols-2': displayWidth > 768,
                'lg:soa-grid-cols-3': displayWidth > 1024
              }"
            >
              <div
                v-for="(prop, idx) in foundComponent.variants[index].props"
                :key="`${prop.name}-${index}-${idx}`"
              >
                <div class="soa-inline-block">
                  <span
                    v-if="prop.type !== 'boolean'"
                    class="soa-mr-2 soa-text-black"
                  >{{ prop.name }}:</span>
                  <input
                    v-if="prop.type === 'string' || prop.type === 'number'"
                    v-model="foundComponent.variants[index].props[idx].value"
                    :inputmode="getInputmode(prop.type)"
                    :type="getInputType(prop.type)"
                    :label="prop.name"
                    :placeholder="prop.name"
                    class="soa-px-2 soa-py-1 soa-border-2 soa-rounded-lg soa-border-primary soa-border-solid placeholder:soa-text-gray-400 soa-text-black"
                  >
                </div>
              </div>
            </div>
          </div>
          <hr v-if="variants && index < (variants.length - 1)">
        </div>
      </div>
      <div
        class="soa-w-4 soa-h-8 soa-bg-secondary hover:soa-cursor-grab soa-absolute -soa-right-2 soa-top-1/2"
        draggable
        @dragstart="handleDragStart"
        @dragend="handleDragEnd"
        @drag="handleDrag"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { components as componentNames } from '#build/soa-components';
import { computed, onMounted, shallowRef, type Component, type HTMLAttributes, type InputTypeHTMLAttribute } from 'vue';
import type { StoryPropsTypes, ResolvedStoryConfig } from '../../types';
import { useRuntimeConfig, useSeoMeta } from '#imports';

defineOptions({
  name: 'SoaComponent'
});

const config = useRuntimeConfig();

const route = useRoute();
const componentInstance = shallowRef<Component>();
const foundComponent = ref<ResolvedStoryConfig | undefined>((componentNames as ResolvedStoryConfig[]).find(comp => comp.name === route.params.component));
const displayWidth = ref(foundComponent.value?.settings?.defaultWidth ?? 300);
const changingWidth = ref(false);
const startingPoint = ref<number>();

function handleDragStart(e: DragEvent) {
  startingPoint.value = e.clientX;
  changingWidth.value = true;
}

function handleDrag(e: DragEvent) {
  if (startingPoint.value && changingWidth.value && e.clientX !== 0) {
    displayWidth.value += e.clientX - startingPoint.value;
  }
  startingPoint.value = e.clientX;
}

function handleDragEnd(_e: DragEvent) {
  changingWidth.value = false;
}

const variants = computed(() => {
  return foundComponent.value?.variants.map(
    (comp, index) => ({
      key: index,
      props: Object.fromEntries(comp.props.map((item) => [item.name, item.value]))
    })
  );
});

function getInputType(type: StoryPropsTypes): InputTypeHTMLAttribute | undefined {
  if (type === 'string' || type === 'number') {
    return 'text';
  }
  if (type === 'boolean') {
    return 'checkbox';
  }
}

function getInputmode(type: StoryPropsTypes): HTMLAttributes['inputmode'] {
  if (type === 'number' ) {
    return 'numeric';
  }

  return 'text';
}

onMounted(async () => {
  if (foundComponent.value) {
    componentInstance.value = (await import(/* @vite-ignore */ foundComponent.value.component))['default'];
  }
});

useSeoMeta({
  title: config.public.soa.meta.title,
  description: config.public.soa.meta.description,
});
</script>