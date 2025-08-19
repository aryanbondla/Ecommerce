<script setup>
import { provide, ref } from 'vue'


import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
const searchQuery = ref('')

const handleSearch = (query) => {
  searchQuery.value = query
}

provide('searchQuery', searchQuery)
</script>

<template>
  <div>
    <Header @search="handleSearch" />
    <main>
      <router-view />
    </main>
    <Footer />
  </div>
</template>
