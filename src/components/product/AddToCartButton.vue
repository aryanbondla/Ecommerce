<template>
  <button
    @click="handleAddToCart"
    :disabled="!inStock || loading"
    class="text-white-600 bg-gray-600 text-md py-2 px-4 flex items-center justify-center cursor-pointer"
    :class="{ 'w-full': fullWidth }"
  >
    <ShoppingBagIcon v-if="!loading" class="w-4 h-4 mr-2 " />
    <div v-else class="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
    {{ loading ? 'Adding...' : (inStock ? 'Add to Cart' : 'Out of Stock') }}
  </button>
</template>

<script setup>
import { ref } from 'vue'
import { ShoppingBagIcon } from '@heroicons/vue/24/outline'
import { useCart } from '../../composables/useCart'

const props = defineProps({
  product: {
    type: Object,
    required: true
  },
  inStock: {
    type: Boolean,
    default: true
  },
  fullWidth: {
    type: Boolean,
    default: false
  }
})

const { addToCart } = useCart()
const loading = ref(false)

const handleAddToCart = async () => {
  loading.value = true
  await new Promise(resolve => setTimeout(resolve, 300))
  addToCart(props.product)
  loading.value = false
}
</script>
