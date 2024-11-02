import type { ResolvedStoryConfig } from "../runtime/types";

declare module '#soa' {
    const components: ResolvedStoryConfig[]
    export {
        components
    }
}