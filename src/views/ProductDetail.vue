<template>
  <div class="bg-gray-50">
    <Suspense>
      <template #default>
        <div v-if="product" class="mx-auto px-4 sm:px-6 lg:px-8 py-8">

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

            <div class="space-y-4">
              <div class="aspect-square bg-white rounded-lg overflow-hidden shadow-sm">
                <ProductImage
                  :src="product.image"
                  :alt="product.name"
                  class="w-full h-full"
                />
              </div>
            </div>

            <div class="space-y-6">
              <div>
                <h1 class="text-3xl font-bold text-gray-900 mb-2 p-2">{{ product.name }}</h1>
                <div class="flex items-center space-x-4 mb-4">
                </div>
                <ProductPrice :price="product.price" class="mb-4" />
              </div>

              <div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2 p-2">Description</h3>
                <p class="text-gray-600 leading-relaxed p-2">{{ product.description }}</p>
              </div>

              <div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2 p-2">Category</h3>
                <span class="inline-block px-3 py-1 rounded-full bg-green-600 text-white text-sm font-medium uppercase tracking-wider p-2">
                  {{ product.category }}
                </span>
              </div>

              <div class="flex items-center space-x-2 p-2">
                <span class="text-sm font-medium text-gray-900">Availability:</span>
                <span :class="product.inStock ? 'text-green-600' : 'text-red-600'" class="text-sm font-medium">
                  {{ product.inStock ? 'In Stock' : 'Out of Stock' }}
                </span>
              </div>


              <div class="space-y-4 p-2">
                <AddToCartButton :product="product" :in-stock="product.inStock" :full-width="true" />

                <div class="flex items-center space-x-4 p-2">
                  <button
                    @click="toggleWishlist"
                    class="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    :class="isInWishlist(product.id) ? 'text-red-600 border-red-300' : 'text-gray-600'"
                  >
                    <HeartIcon class="w-5 h-5" :class="isInWishlist(product.id) ? 'fill-current' : ''" />
                    <span>{{ isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist' }}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>


          <div class="mt-16">
            <h2 class="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <ProductCard
                v-for="relatedProduct in relatedProducts"
                :key="relatedProduct.id"
                :product="relatedProduct"
              />
            </div>
          </div>
        </div>
      </template>

      <template #fallback>
        <LoadingSpinner />
      </template>
    </Suspense>

    <ErrorMessage v-if="error" :message="error" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { products } from '../data/products'
import { useWishlist } from '../composables/useWishlist'
import { HeartIcon } from '@heroicons/vue/24/outline'
import ProductImage from '../components/product/ProductImage.vue'
import ProductPrice from '../components/product/ProductPrice.vue'
import AddToCartButton from '../components/product/AddToCartButton.vue'
import ProductCard from '../components/ProductCard.vue'
import LoadingSpinner from '../components/ui/LoadingSpinner.vue'
import ErrorMessage from '../components/ui/ErrorMessage.vue'

const route = useRoute()
const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

const product = ref(null)
const error = ref('')

const relatedProducts = computed(() => {
  if (!product.value) return []
  return products
    .filter(p => p.category === product.value.category && p.id !== product.value.id)
    .slice(0, 4)
})

const toggleWishlist = () => {
  if (isInWishlist(product.value.id)) {
    removeFromWishlist(product.value.id)
  } else {
    addToWishlist(product.value)
  }
}

onMounted(() => {
  const productId = parseInt(route.params.id)
  const foundProduct = products.find(p => p.id === productId)

  if (foundProduct) {
    product.value = foundProduct
  } else {
    error.value = 'Product not found'
  }
})
</script>
