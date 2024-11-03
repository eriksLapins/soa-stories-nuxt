<template>
  <header class="soa-h-10 soa-border-b-2 soa-border-solid soa-border-b-primary soa-bg-background">
    <div class="soa-container soa-mx-auto soa-px-4 soa-flex soa-items-center soa-justify-center soa-h-full">
      <NuxtLink
        to="/"
        class="soa-font-semibold soa-text-primary"
      >
        Showcase Template
      </NuxtLink>
    </div>
  </header>
  <div class="main-layout soa-bg-background">
    <slot />
  </div>
  <footer class="soa-w-full soa-h-10 soa-border-t soa-border-solid soa-border-primary soa-bg-background">
    <div class="soa-h-full soa-container soa-mx-auto soa-px-4 soa-flex soa-items-center soa-justify-between">
      <NuxtLink
        to="https://github.com/eriksLapins"
        class="soa-text-primary max-md:soa-text-sm"
        target="_blank"
        rel="noreferrer noopener"
        external
      >
        &copy Eriks Lapins 2024
      </NuxtLink>
      <NuxtLink
        to="https://github.com/eriksLapins/soa-showcase"
        class="hover:soa-underline soa-font-semibold soa-text-primary max-md:soa-text-sm"
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
  name: 'SoaLayout'
});
</script>

<style>
.main-layout {
    min-height: calc(100dvh - 5rem);
}
</style>
