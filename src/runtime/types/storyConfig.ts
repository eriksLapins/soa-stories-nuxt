import type { Component } from "vue"

export type StoryPropsTypes = 'string' | 'number' | 'array' | 'object' | 'boolean'

export type StoryConfigProps = {
    value: unknown,
    type: StoryPropsTypes,
    subtype?: StoryPropsTypes,
    required?: boolean,
    nullable?: boolean,
    options?: unknown[],
}

export type StoryConfigVariant = {
    props: StoryConfigProps[],
    vModel: (string | "modelValue")[],
}

export type StoryConfig = {
    name?: string,
    component: Component,
    variants: StoryConfigVariant[]
}

export type ResolvedStoryConfig = {
    name?: string,
    component: string,
    variants: StoryConfigVariant[]
}