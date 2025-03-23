import type { Component } from "vue";

export type StoryPropsTypes = 'string' | 'number' | 'array' | 'object' | 'boolean' | 'selection' | 'multiselect' | 'addOnArray';

export type StoryPropsSimple = {
  type: 'string',
  value: string,
} | {
  type: 'number',
  value: number,
} | {
  type: 'boolean',
  value: boolean,
};

// primitive arrays
export type StoryPropsArraySimpleSelection = {
  type: 'selection',
} & ({
  subtype: 'string',
  options: string[],
  value: string,
} | {
  subtype: 'number',
  options: number[],
  value: number,
} | {
  subtype: 'boolean',
  options: boolean[],
  value: boolean,
});

export type StoryPropsArraySimpleMultiSelection = {
  type: 'multiselect',
} & ({
  subtype: 'string',
  options: string[],
  value: string[],
} | {
  subtype: 'number',
  options: number[],
  value: number[],
} | {
  subtype: 'boolean',
  options: boolean[],
  value: boolean[],
});

export type StoryPropsArrayNoSelection = {
  type: 'array' | 'addOnArray',
} & ({
  subtype: 'string',
  value: string[],
} | {
  subtype: 'number',
  value: number[],
} | {
  subtype: 'boolean',
  value: boolean[],
});

export type StoryPropsArraySimple = StoryPropsArraySimpleSelection | StoryPropsArraySimpleMultiSelection | StoryPropsArrayNoSelection;

// object arrays

export type StoryPropsArrayObjectSelection<T = unknown> = {
  type: 'selection',
  subtype: 'object',
  key?: string,
  titleKey?: string,
  options: T[],
};

export type StoryPropsArrayObjectMultiSelection<T = unknown> = {
  type: 'multiselect',
  subtype: 'object',
  key?: string,
  titleKey?: string,
  options: T[],
};

export type StoryPropsArrayObjectNoSelection<T = unknown> = {
  type: 'array' | 'addOnArray',
  subtype: 'object',
  key?: string,
  titleKey?: string,
  value: T[],
};

export type StoryPropsArrayObject<T = unknown> = StoryPropsArrayObjectSelection<T> | StoryPropsArrayObjectMultiSelection<T> | StoryPropsArrayObjectNoSelection<T>;

export type StoryPropsObject<T = unknown> = {
  type: 'object',
  value: T,
};

export type StoryPropsAny<T = unknown> = StoryPropsSimple | StoryPropsArrayObject<T> | StoryPropsArraySimple | StoryPropsObject<T>;

export type StoryConfigProps<T = unknown> = {
  name: string,
  value: unknown,
  required?: boolean,
  nullable?: boolean,
} & StoryPropsAny<T>;

export type StoryConfigVariant = {
  props: StoryConfigProps[],
  vModel?: (string | "modelValue")[],
};

export type StoryConfigGeneralSettings = {
  defaultWidth?: number,
  maxWidth?: number,
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
  variants: StoryConfigVariant[],
};