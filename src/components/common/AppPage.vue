
<template>
  <main class="cus-scroll h-full flex-col flex-1 bg-[#e9e9e9bf] dark:bg-#121212">
    <transition name="fade-slide" mode="out-in" appear>
      <main :class="{ 'flex-1': full }" class="m-12"><slot /></main>
    </transition>
    <slot v-if="$slots.footer" name="footer" />
    <footer class="bg-[#f6f9f8ff] dark:bg-#121212">
      <slot v-if="$slots.footer" name="footer" />
      <AppCard v-else-if="showFooter" class="py-12">
        <TheFooter />
      </AppCard>
    </footer>
    <n-back-top :bottom="20" />
  </main>
</template>

<script setup>
defineProps({
  full: {
    type: Boolean,
    default: false,
  },
  showFooter: {
    type: Boolean,
    default: false,
  },
})
</script>
