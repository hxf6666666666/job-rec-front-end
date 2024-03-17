<template>
  <router-link class="h-60 f-c-c" to="/">
    <img src="@/assets/images/logo.png" height="35" class="mr-12 mt-14 ml-12" />
    <h3 v-show="!appStore.collapsed" class="f-c-c text-22 text-#6a6a6a font-extrabold mt-14">
      {{ title }}
    </h3>
  </router-link>
</template>

<script setup>
import { useAppStore } from '@/store'
const title = import.meta.env.VITE_TITLE

const appStore = useAppStore()
</script>
