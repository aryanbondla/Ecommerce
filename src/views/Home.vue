<template>
  <div class="min-h-screen">
    <section class="relative bg-gradient-to-br from-green-50 to-emerald-100 overflow-hidden">
      <div class="mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <div class="text-center lg:text-left">
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Tasty & Healthy
              <span class="text-primary-600 block">Evening Snacks</span>
            </h1>
            <p class="mt-6 text-lg text-gray-600 max-w-2xl">
              Discover our premium collection of organic and healthy snacks perfect for your evening cravings. From nuts and dried fruits to artisan treats, we have everything you need for a delicious and nutritious snacking experience.
            </p>
            <div class="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <router-link to="/products" class="btn-primary">
                Shop Now
              </router-link>
              <button class="btn-secondary">
                Learn More
              </button>
            </div>
          </div>


          <div class="relative">
            <div class="relative z-10">
              <img
                src="https://i.pinimg.com/1200x/44/38/db/4438dbdeb57b5a1fbad26d0f3f25efa3.jpg"
                alt="Fresh snacks, chips and mixtures"
                class="w-full h-auto rounded-2xl shadow-2xl text-[#000000]"
              >
            </div>

          </div>
        </div>
      </div>
    </section>

    <section class="py-16 bg-gray-50">
      <div class=" mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-red-600 mb-4 p-2">Our Products</h2>
          <p class="text-lg text-gray-600 p-2">Discover our premium selection of evening snacks</p>
        </div>


        <div class="flex flex-wrap justify-center gap-4 mb-8 p-4">
          <button
            v-for="category in categories.slice(0, 6)"
            :key="category.id"
            @click="selectedCategory = category.id"
            class="px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200"
            :class="selectedCategory === category.id
              ? 'bg-gray-900 text-white'
              : 'bg-white text-gray-900 hover:bg-gray-50 hover:text-gray-900'"
          >
            {{ category.name }}
          </button>
        </div>


        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <ProductCard
            v-for="product in filteredProducts.slice(0, 8)"
            :key="product.id"
            :product="product"
          />
        </div>

        <div class="text-center p-4">
          <router-link to="/products" class="btn-primary">
            <button class="border border-2 rounded-md text-white bg-green-600 p-3">View All Products</button>

          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { products, categories } from '../data/products'
import ProductCard from '../components/ProductCard.vue'

const selectedCategory = ref('all')

const filteredProducts = computed(() => {
  if (selectedCategory.value === 'all') {
    return products
  }
  return products.filter(product => product.category === selectedCategory.value)
})
</script>
