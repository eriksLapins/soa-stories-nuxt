
<template>
  <div class="bg-soa-primary">
    <NuxtLink
      :to="$config.public.soa.standalone ? `/` : `/__stories`"
      class="underline"
    >
      Go to stories
    </NuxtLink>
  </div>
</template>