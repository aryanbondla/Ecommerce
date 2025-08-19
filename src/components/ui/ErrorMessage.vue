<template>
  <div class="bg-red-50 border border-red-200 rounded-lg p-4">
    <div class="flex">
      <ExclamationTriangleIcon class="w-5 h-5 text-red-400" />
      <div class="ml-3">
        <p class="text-sm font-medium text-red-800">{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'

defineProps({
  message: {
    type: String,
    required: true
  }
})
</script>
