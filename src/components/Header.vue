<template>
  <header class="bg-white p-3 shadow-sm sticky top-0 z-50">
    <div class=" mx-2 md:mx-4 lg:mx-8 xl:mx-12 2xl:mx-16">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center">
          <router-link to="/" class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-lg"><img src="https://i.pinimg.com/736x/d0/9c/93/d09c935b4659a18e8bffb921cf8cbefd.jpg"/></span>
            </div>
            <span class="text-xl font-bold text-gray-900">SnackHub</span>
          </router-link>
        </div>

        <nav class="hidden md:flex space-x-8">
          <router-link
            v-for="link in navLinks"
            :key="link.name"
            :to="link.to"
            class="text-gray-600 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
            :class="{ 'text-primary-600 border-b-2 border-primary-600': $route.name === link.name }"
          >
            {{ link.label }}
          </router-link>
        </nav>


        <div class="flex items-center space-x-4">

          <router-link to="/cart" class="relative p-2 text-gray-600 hover:text-primary-600 transition-colors duration-200">
            <ShoppingBagIcon class="w-6 h-6" />
            <span v-if="cartItemsCount > 0" class="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {{ cartItemsCount }}
            </span>
          </router-link>

          <router-link to="/wishlist" class="relative p-2 text-gray-600 hover:text-primary-600 transition-colors duration-200">
            <HeartIcon class="w-6 h-6" />
            <span v-if="wishlistCount > 0" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {{ wishlistCount }}
            </span>
          </router-link>

          <!-- User Menu
          <div class="relative" v-click-outside="closeUserMenu">
            <button v-if="!isAuthenticated" @click="$router.push('/login')" class="text-black-600">
              Login
            </button>
            <div v-else class="relative">
              <button
                @click="userMenuOpen = !userMenuOpen"
                class="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-semibold"
              >
                {{ getUserInitials }}
              </button>
               User Dropdown -->
              <!-- <div v-if="userMenuOpen" class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2"> -->
                <!-- <div class="px-4 py-2 border-b">
                  <p class="text-sm font-medium text-gray-900">{{ user.name }}</p>
                  <p class="text-sm text-gray-500">{{ user.email }}</p>
                </div>
                <button @click="handleLogout" class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-black-100">
                  Logout
                </button>
              </div>
            </div>
          </div> -->

          <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden p-2 text-gray-600 hover:text-black-600">
            <Bars3Icon v-if="!mobileMenuOpen" class="w-6 h-6" />
            <XMarkIcon v-else class="w-6 h-6" />
          </button>
        </div>
      </div>

      <div v-if="mobileMenuOpen" class="md:hidden py-4 border-t">
        <div class="flex flex-col space-y-2">
          <router-link
            v-for="link in navLinks"
            :key="link.name"
            :to="link.to"
            @click="mobileMenuOpen = false"
            class="text-gray-600 hover:text-primary-600 px-3 py-2 text-base font-medium"
          >
            {{ link.label }}
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useCart } from '../composables/useCart'
import { useWishlist } from '../composables/useWishlist'
import {
  ShoppingBagIcon,
  HeartIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/vue/24/outline'
const { cartItemsCount } = useCart()
const { wishlistCount } = useWishlist()

const mobileMenuOpen = ref(false)
// const userMenuOpen = ref(false)

const navLinks = [
  { name: 'Home', label: 'Home', to: '/' },
  { name: 'Products', label: 'Products', to: '/products' },
  { name: 'About', label: 'About', to: '/about' },
  { name: 'Contact', label: 'Contact', to: '/contact' }
]

// const closeUserMenu = () => {
//   userMenuOpen.value = false
// }


defineEmits(['search'])
</script>
