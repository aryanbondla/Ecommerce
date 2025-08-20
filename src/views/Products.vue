<template>
  <div class="bg-gray-50">
    <div class="mx-auto px-4 sm:px-6 lg:px-8 py-8">

      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-4 p-2">Our Products</h1>
        <p class="text-lg text-gray-600 mx-auto p-2">
          Discover our premium collection of healthy and delicious evening snacks, carefully curated for your cravings.
        </p>
      </div>


      <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div class="flex flex-col lg:flex-row gap-4 items-center justify-between">

          <div class="relative flex-1 max-w-md">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search products..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
            <MagnifyingGlassIcon class="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
          </div>


          <div class="flex flex-wrap gap-2">
            <button
              v-for="category in categories"
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
        </div>


        <div class="mt-4 flex items-center gap-4">
          <span class="text-sm text-gray-600">Sort by:</span>
          <select
            v-model="sortBy"
            class="text-sm border-gray-300 text-black rounded-md focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="name">Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>


      <div v-if="filteredAndSortedProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <ProductCard
          v-for="product in filteredAndSortedProducts"
          :key="product.id"
          :product="product"
        />
      </div>


      <div v-else class="text-center py-12">
        <div class="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <MagnifyingGlassIcon class="w-12 h-12 text-gray-400" />
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
        <p class="text-gray-600">Try adjusting your search or filter criteria</p>
      </div>

      <div v-if="filteredAndSortedProducts.length > 0" class="mt-8 text-center">
        <p class="text-gray-600">
          Showing {{ filteredAndSortedProducts.length }} of {{ products.length }} products
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, inject } from 'vue'
import { products, categories } from '../data/products'
import ProductCard from '../components/ProductCard.vue'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'

const selectedCategory = ref('all')
const sortBy = ref('name')
const searchQuery = ref('')


const globalSearchQuery = inject('searchQuery')
if (globalSearchQuery && globalSearchQuery.value) {
  searchQuery.value = globalSearchQuery.value
}

const filteredAndSortedProducts = computed(() => {
  let filtered = products


  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter(product => product.category === selectedCategory.value)
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(product =>
      product.name.toLowerCase().includes(query)
    )
  }


  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy.value) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'name':
      default:
        return a.name.localeCompare(b.name)
    }
  })

  return sorted
})
</script>
