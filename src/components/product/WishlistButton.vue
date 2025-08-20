<template>
  <button
    @click="toggleWishlist"
    class="p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-md transition-colors duration-200 cursor-pointer hover:bg-white"
    :class="isInWishlist(product.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-500'"
  >
    <HeartIcon class="w-5 h-5" :class="isInWishlist(product.id) ? 'fill-current' : ''" />
  </button>
</template>

<script setup>
import { HeartIcon } from '@heroicons/vue/24/outline'
import { useWishlist } from '../../composables/useWishlist'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

const toggleWishlist = () => {
  if (isInWishlist(props.product.id)) {
    removeFromWishlist(props.product.id)
  } else {
    addToWishlist(props.product)
  }
}
</script>
