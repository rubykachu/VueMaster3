const app = Vue.createApp({
  data() {
    return {
      carts: [],
      reviews: [],
      premium: false,
    }
  },
  methods: {
    updateCart(variantId) {
      this.carts.push(variantId);
    },
    submitReview(review) {
      this.reviews.push(review);
    }
  },
  computed: {
    showProductIds() {
      return this.carts.join(',')
    },
    totalCart() {
      return this.carts.length;
    }
  }
})
