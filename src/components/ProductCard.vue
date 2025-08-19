<template>
  <div class="card group shadow-lg rounded-md overflow-hidden">
    <router-link :to="`/product/${product.id}`" class="block">
      <div class="relative overflow-hidden">
        <ProductImage
          :src="product.image"
          :alt="product.name"
          class="w-full h-48"
        />
        <WishlistButton
          :product="product"
          class="absolute top-3 right-3"
          @click.prevent
        />
      </div>
    </router-link>

    <div class="p-4">
      <div class="flex items-start justify-between mb-2">
        <router-link :to="`/product/${product.id}`" class="flex-1">
          <h3 class="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-200 p-2">
            {{ product.name }}
          </h3>
        </router-link>
        <ProductPrice :price="product.price" />
      </div>

      <p class="text-gray-600 text-sm mb-4 line-clamp-2 p-2">
        {{ product.description }}
      </p>

      <div class="flex items-center justify-between">
        <span class="text-xs text-white bg-green-600 px-2 py-1 rounded-full uppercase tracking-wider p-2">
          {{ product.category }}
        </span>

        <AddToCartButton :product="product" :in-stock="product.inStock" />
      </div>
    </div>
  </div>
</template>

<script setup>
import ProductImage from './product/ProductImage.vue'
import ProductPrice from './product/ProductPrice.vue'
import AddToCartButton from './product/AddToCartButton.vue'
import WishlistButton from './product/WishlistButton.vue'

defineProps({
  product: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
