<template>
  <router-link class="h-60 f-c-c" to="/">
    <img src="/vite.svg" class="h-40" />
    <h1
      v-show="!appStore.collapsed"
      class="ml-10 max-w-140 flex-shrink-0 text-24 color-primary"
      style="font-family: 方正姚体,serif"
    >
      {{ title }}
    </h1>
  </router-link>
</template>

<script setup>
import { useAppStore } from '@/store'
const title = import.meta.env.VITE_TITLE

const appStore = useAppStore()
</script>
