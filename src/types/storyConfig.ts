import type { Component } from "vue";

export type StoryPropsTypes = 'string' | 'number' | 'array' | 'object' | 'boolean';

export type StoryConfigProps = {
  name: string,
  value: unknown,
  type: StoryPropsTypes,
  subtype?: StoryPropsTypes,
  required?: boolean,
  nullable?: boolean,
  options?: unknown[],
};

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