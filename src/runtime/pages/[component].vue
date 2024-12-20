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
    <div class="soa-flex soa-justify-start soa-gap-10">
      <h1 class="soa-text-lg soa-font-semibold soa-text-black">
        {{ foundComponent?.name ?? componentInstance?.name }}
      </h1>
      <div>
        Width:
        <input
          v-model="displayWidth"
          type="range"
          min="300"
          max="1024"
          class="[&::-webkit-slider-thumb]:soa-appearance-none [&::-webkit-slider-thumb]:soa-bg-primary"
        >
      </div>
    </div>
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
          class="soa-border soa-border-solid soa-border-primary soa-p-4 soa-rounded-2xl"
        >
          <component
            :is="componentInstance"
            v-bind="variant.props"
          />
          <hr class="soa-mt-4">
          <div
            class="soa-flex soa-flex-col soa-gap-4 soa-py-4"
          >
            <h2 class="soa-font-semibold soa-text-black">
              Props
            </h2>
            <div
              class="soa-grid soa-grid-cols-1 soa-gap-4 soa-py-4"
            >
              <template
                v-for="(prop, idx) in foundComponent.variants[index].props"
                :key="`${prop.name}-${index}-${idx}`"
              >
                <div
                  v-if="prop.type !== 'object' && prop.type !== 'array'"
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
                    <!-- selection -->
                    <select
                      v-if="prop.type === 'selection'"
                      v-model="foundComponent.variants[index].props[idx].value"
                    >
                      <option
                        v-for="option in prop.options"
                        :key="(resolveSelectedOption(option, prop) as string)"
                        :value="resolveSelectedOption(option, prop)"
                      >
                        {{ resolveSelectedOption(option, prop) }}
                      </option>
                    </select>
                    <!-- multiselect -->
                    <div
                      v-if="prop.type === 'multiselect'"
                      class="soa-flex soa-gap-2"
                    >
                      <button
                        v-for="option in prop.options"
                        :key="(resolveSelectedOption(option, prop) as string)"
                        class="soa-rounded-lg soa-px-2 soa-py-1 soa-border soa-border-solid "
                        :class="{
                          'soa-bg-primary soa-text-white soa-border-transparent': (foundComponent.variants[index].props[idx].value as unknown[]).includes(option),
                          'soa-bg-white soa-border-primary soa-text-black': !(foundComponent.variants[index].props[idx].value as unknown[]).includes(option),
                        }"
                        @click="handleArrayClickUpdate(index, idx, resolveSelectedOption(option, prop))"
                      >
                        {{ resolveSelectedOption(option, prop) }}
                      </button>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
          <hr v-if="variants && index < (variants.length - 1)">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { components as componentNames } from '#build/soa-components';
import { computed, onMounted, shallowRef, watch, type Component, type HTMLAttributes, type InputTypeHTMLAttribute } from 'vue';
import type { StoryPropsTypes, ResolvedStoryConfig, StoryConfigProps } from '../../types';
import { useRuntimeConfig, useSeoMeta, useRoute } from '#imports';
import { ref } from 'vue';

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

function resolveSelectedOption(option: Record<string, unknown> | unknown, prop: StoryConfigProps) {
  if (('subtype' in prop && prop.subtype === 'object')) {
    if (prop.key) {
      return (option as Record<string, unknown>)[prop.key];
    } return option;
  }
  return option;
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
function handleArrayClickUpdate(index: number, idx: number, option: unknown) {
  const currentValue = foundComponent.value?.variants[index].props[idx].value as unknown[];
  const foundIndex = currentValue.findIndex(item => JSON.stringify(item) === JSON.stringify(option));
  if (foundIndex > -1) {
    (foundComponent.value?.variants[index].props[idx].value as unknown[]).splice(foundIndex, 1);
  } else {
    (foundComponent.value?.variants[index].props[idx].value as unknown[]).push(option);
  }
}

watch(displayWidth, (newValue) => {
  if (newValue < 300) {
    displayWidth.value = 300;
  }
});
useSeoMeta({
  title: config.public.soa.meta.title,
  description: config.public.soa.meta.description,
});
</script>