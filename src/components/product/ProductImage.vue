<template>
  <div class="relative overflow-hidden rounded-lg">
    <img
      :src="src"
      :alt="alt"
      class="w-full h-full object-cover"
      @error="handleImageError"
    >
    <div v-if="loading"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  src: String,
  alt: String,
  hover: {
    type: Boolean,
    default: false
  }
})

const loading = ref(true)

const handleImageError = (event) => {
  event.target.src = 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=500'
}
</script>
