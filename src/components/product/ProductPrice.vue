<template>
  <div class="flex items-center space-x-2 p-2">
    <span class="text-lg font-bold text-red-700">
      ${{ price.toFixed(2) }}
    </span>
    <span v-if="originalPrice && originalPrice > price" class="text-sm text-gray-900 line-through">
      ${{ originalPrice.toFixed(2) }}
    </span>
  </div>
</template>

<script setup>
defineProps({
  price: {
    type: Number,
    required: true
  },
  originalPrice: {
    type: Number,
    default: null
  }
})
</script>
