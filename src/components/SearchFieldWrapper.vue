<template>
  <div class="search-field__wrapper">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'SearchFieldWrapper',
}
</script>

<style>
.search-field__wrapper {
  position: relative;
}
</style>
