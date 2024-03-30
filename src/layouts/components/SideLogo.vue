<template>
  <router-link class="h-60 f-c-c" to="/">
    <img src="@/assets/images/logo.jpg" height="35" class="mr-12 mt-14 ml-12" />
    <h3 v-show="!appStore.collapsed" class="f-c-c text-22 mt-14">
      <img src="@/assets/images/logo2.jpg" height="35"/>
    </h3>
  </router-link>
</template>

<script setup>
import { useAppStore } from '@/store'
const title = import.meta.env.VITE_TITLE

const appStore = useAppStore()
</script>
