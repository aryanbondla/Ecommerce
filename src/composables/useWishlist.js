import { ref, computed } from 'vue'

const wishlistItems = ref(JSON.parse(localStorage.getItem('wishlist')) || [])

export function useWishlist() {
  const addToWishlist = (product) => {
    const exists = wishlistItems.value.find(item => item.id === product.id)
    if (!exists) {
      wishlistItems.value.push(product)
      saveWishlist()
    }
  }

  const removeFromWishlist = (productId) => {
    wishlistItems.value = wishlistItems.value.filter(item => item.id !== productId)
    saveWishlist()
  }

  const isInWishlist = (productId) => {
    return wishlistItems.value.some(item => item.id === productId)
  }

  const saveWishlist = () => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems.value))
  }

  const wishlistCount = computed(() => wishlistItems.value.length)

  return {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    wishlistCount
  }
}
