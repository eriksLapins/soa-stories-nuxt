<template>
    <header class="h-10 border-b-2 border-solid border-b-soa-primary bg-soa-background">
        <div class="container mx-auto px-4 flex items-center justify-center h-full">
            <NuxtLink to="/" class="font-semibold text-soa-primary">
                Showcase Template
            </NuxtLink>
        </div>
    </header>
    <div class="main-layout bg-soa-background">
        <slot />
    </div>
    <footer class="w-full h-10 border-t border-solid border-soa-primary bg-soa-background">
        <div class="h-full container mx-auto px-4 flex items-center justify-between">
            <NuxtLink
                to="https://github.com/eriksLapins"
                class="text-soa-primary max-md:text-sm"
                target="_blank"
                rel="noreferrer noopener"
                external
            >
                &copy Eriks Lapins 2024
            </NuxtLink>
            <NuxtLink
                to="https://github.com/eriksLapins/soa-showcase"
                class="hover:underline font-semibold text-soa-primary max-md:text-sm"
                target="_blank"
                rel="noreferrer noopener"
                external
            >
                Showcase Github repo
            </NuxtLink>
        </div>
    </footer>
</template>

<script setup lang="ts">
defineOptions({
    name: 'defaultLayout'
});
</script>

<style>
.main-layout {
    min-height: calc(100dvh - 5rem);
}
</style>
