<template>
  <p class="error-text" v-if="error">{{ error }}</p>
</template>

<script setup>
defineProps(['error'])
</script>

<style scoped>
.error-text {
  margin: 5px 0;
  color: #e02424;
}
</style>
