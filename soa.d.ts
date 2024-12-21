
declare module '#build/soa-components' {
  import type { StoryConfigProps } from "./src/types";
  
  export const { components = (componentNames as StoryConfigProps[]) };
}