import { ref, computed } from 'vue'

const cartItems = ref(JSON.parse(localStorage.getItem('cart')) || [])

export function useCart() {
  const addToCart = (product) => {
    const existingItem = cartItems.value.find(item => item.id === product.id)
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cartItems.value.push({ ...product, quantity: 1 })
    }
    saveCart()
  }

  const removeFromCart = (productId) => {
    cartItems.value = cartItems.value.filter(item => item.id !== productId)
    saveCart()
  }

  const updateQuantity = (productId, quantity) => {
    const item = cartItems.value.find(item => item.id === productId)
    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId)
      } else {
        item.quantity = quantity
        saveCart()
      }
    }
  }

  const clearCart = () => {
    cartItems.value = []
    saveCart()
  }

  const saveCart = () => {
    localStorage.setItem('cart', JSON.stringify(cartItems.value))
  }

  const cartTotal = computed(() => {
    return cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0)
  })

  const cartItemsCount = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.quantity, 0)
  })

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartItemsCount
  }
}
