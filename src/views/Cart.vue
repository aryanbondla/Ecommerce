<template>
  <div class="min-h-screen bg-gray-50">
    <div class="mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl font-bold text-gray-900 p-4">Shopping Cart</h1>
        <span class="text-lg text-gray-600">({{ cartItemsCount }} items)</span>
      </div>

      <div v-if="cartItems.length === 0" class="text-center py-16 flex flex-col items-center p-4">
        <ShoppingBagIcon class="w-24 h-24 text-gray-300 mx-auto mb-4" />
        <h2 class="text-2xl font-semibold text-black mb-2 p-2">Your cart is empty</h2>
        <p class="text-black mb-8 p-2">Start shopping to add items to your cart</p>
        <router-link to="/products" class="p-4">
          <button class="bg-green-600 text-white rounded-md p-4 ">Continue Shopping</button>
        </router-link>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Cart Items -->
        <div class="lg:col-span-2 space-y-4">
          <div
            v-for="item in cartItems"
            :key="item.id"
            class="bg-white rounded-lg shadow-sm p-6 flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <router-link :to="`/product/${item.id}`" class="flex-shrink-0">
              <ProductImage
                :src="item.image"
                :alt="item.name"
                class="w-24 h-24 rounded-lg"
              />
            </router-link>

            <div class="flex-1 min-w-0">
              <router-link :to="`/product/${item.id}`">
                <h3 class="text-lg font-semibold text-gray-900 hover:text-primary-600 transition-colors duration-200">
                  {{ item.name }}
                </h3>
              </router-link>
              <p class="text-gray-600 text-sm mt-1">{{ item.description }}</p>
              <ProductPrice :price="item.price" class="mt-2" />
            </div>

            <div class="flex items-center space-x-4">
              <!-- Quantity Controls -->
              <div class="flex items-center space-x-2">
                <button
                  @click="updateQuantity(item.id, item.quantity - 1)"
                  class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  :disabled="item.quantity <= 1"
                >
                  <MinusIcon class="w-4 h-4" />
                </button>
                <span class="w-8 text-center font-medium">{{ item.quantity }}</span>
                <button
                  @click="updateQuantity(item.id, item.quantity + 1)"
                  class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                >
                  <PlusIcon class="w-4 h-4" />
                </button>
              </div>

              <!-- Remove Button -->
              <button
                @click="removeFromCart(item.id)"
                class="text-red-500 hover:text-red-700 p-2"
              >
                <TrashIcon class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>

            <div class="space-y-3 mb-6">
              <div class="flex justify-between">
                <span class="text-gray-600">Subtotal</span>
                <span class="font-medium">${{ cartTotal.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Shipping</span>
                <span class="font-medium">Free</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Tax</span>
                <span class="font-medium">${{ (cartTotal * 0.08).toFixed(2) }}</span>
              </div>
              <div class="border-t pt-3">
                <div class="flex justify-between">
                  <span class="text-lg font-semibold">Total</span>
                  <span class="text-lg font-semibold">${{ (cartTotal * 1.08).toFixed(2) }}</span>
                </div>
              </div>
            </div>

            <button class="btn-primary w-full mb-4">
              Proceed to Checkout
            </button>

            <button
              @click="clearCart"
              class="btn-secondary w-full"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCart } from '../composables/useCart'
import { ShoppingBagIcon, MinusIcon, PlusIcon, TrashIcon } from '@heroicons/vue/24/outline'
import ProductImage from '../components/product/ProductImage.vue'
import ProductPrice from '../components/product/ProductPrice.vue'

const { cartItems, cartTotal, cartItemsCount, updateQuantity, removeFromCart, clearCart } = useCart()
</script>
