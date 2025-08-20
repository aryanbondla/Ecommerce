<template>
  <div class="bg-gray-50">
    <div class="mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl font-bold text-gray-900 p-4">My Wishlist</h1>
        <span class="text-lg text-gray-600">({{ wishlistCount }} items)</span>
      </div>

      <div v-if="wishlistItems.length === 0" class="text-center flex flex-col items-center p-4 py-16">
        <HeartIcon class="w-24 h-24 text-gray-300 mx-auto mb-4" />
        <h2 class="text-2xl p-2 font-semibold text-black mb-2">Your wishlist is empty</h2>
        <p class="text-black p-2 mb-8">Save items you love for later</p>
        <router-link to="/products" class="p-4">
          <button class="bg-green-600 text-white rounded-md p-4">Browse Products</button>
        </router-link>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
          v-for="item in wishlistItems"
          :key="item.id"
          class="bg-white rounded-lg shadow-sm overflow-hidden group"
        >
          <router-link :to="`/product/${item.id}`" class="block">
            <div class="relative">
              <ProductImage
                :src="item.image"
                :alt="item.name"
                :hover="true"
                class="w-full h-48"
              />
            </div>
          </router-link>

          <div class="p-4">
            <router-link :to="`/product/${item.id}`">
              <h3 class="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-200 mb-2">
                {{ item.name }}
              </h3>
            </router-link>

            <p class="text-gray-600 text-sm mb-3 line-clamp-2">
              {{ item.description }}
            </p>

            <ProductPrice :price="item.price" class="mb-4" />

            <div class="flex items-center space-x-2">
              <AddToCartButton :product="item" :in-stock="item.inStock" class="flex-1" />

              <button
                @click="removeFromWishlist(item.id)"
                class="p-2 text-red-500 hover:text-red-700 border border-red-200 rounded-lg hover:bg-red-50 transition-colors duration-200 m-2"
              >
                <TrashIcon class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useWishlist } from '../composables/useWishlist'
import { HeartIcon, TrashIcon } from '@heroicons/vue/24/outline'
import ProductImage from '../components/product/ProductImage.vue'
import ProductPrice from '../components/product/ProductPrice.vue'
import AddToCartButton from '../components/product/AddToCartButton.vue'

const { wishlistItems, wishlistCount, removeFromWishlist } = useWishlist()
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
