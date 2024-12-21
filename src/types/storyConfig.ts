import type { Component } from "vue";

export type StoryPropsTypes = 'string' | 'number' | 'array' | 'object' | 'boolean' | 'selection' | 'multiselect';

export type StoryConfigProps = {
  name: string,
  value: unknown,
  required?: boolean,
  nullable?: boolean,
} & ({
  type: 'string' | 'number' | 'boolean',
} | {
  type: 'array' | 'selection' | 'multiselect',
  subtype: 'object',
  key?: string,
  titleKey?: string,
  options: unknown[]
} | {
  type: 'array' | 'selection' | 'multiselect',
  subtype: 'string' | 'number' | 'array' | 'boolean' | 'selection' | 'multiselect',
  options: unknown[]
} | {
  type: 'object',
});

export type StoryConfigVariant = {
  props: StoryConfigProps[],
  vModel: (string | "modelValue")[],
};

export type StoryConfigGeneralSettings = {
  defaultWidth?: number;
};

export type StoryConfig = {
  name?: string,
  settings?: StoryConfigGeneralSettings,
  component: Component,
  variants: StoryConfigVariant[],
};

export type ResolvedStoryConfig = {
  name?: string,
  settings?: StoryConfigGeneralSettings,
  component: string,
  variants: StoryConfigVariant[]
};