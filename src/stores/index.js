import { reactive } from 'vue'

export const store = reactive({
  user: null,
  cart: JSON.parse(localStorage.getItem('cart')) || [],
  wishlist: JSON.parse(localStorage.getItem('wishlist')) || [],

  // User methods
  login(user) {
    this.user = user
  },

  logout() {
    this.user = null
  },

  // Cart methods
  addToCart(product) {
    const existingItem = this.cart.find(item => item.id === product.id)
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      this.cart.push({ ...product, quantity: 1 })
    }
    this.saveCart()
  },

  removeFromCart(productId) {
    this.cart = this.cart.filter(item => item.id !== productId)
    this.saveCart()
  },

  updateCartQuantity(productId, quantity) {
    const item = this.cart.find(item => item.id === productId)
    if (item) {
      item.quantity = quantity
      if (quantity <= 0) {
        this.removeFromCart(productId)
      }
    }
    this.saveCart()
  },

  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart))
  },

  // Wishlist methods
  addToWishlist(product) {
    const exists = this.wishlist.find(item => item.id === product.id)
    if (!exists) {
      this.wishlist.push(product)
      this.saveWishlist()
    }
  },

  removeFromWishlist(productId) {
    this.wishlist = this.wishlist.filter(item => item.id !== productId)
    this.saveWishlist()
  },

  saveWishlist() {
    localStorage.setItem('wishlist', JSON.stringify(this.wishlist))
  },

  // Computed
  get cartTotal() {
    return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  },

  get cartItemsCount() {
    return this.cart.reduce((total, item) => total + item.quantity, 0)
  }
})
