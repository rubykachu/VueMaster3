app.component('display-product', {
  template:
    /*html*/
    `<div class="product-display">
      <div class="product-container">
        <div class="product-image">
          <img :src="product.image" :alt="product.name">
        </div>
        <div class="product-info">
          <h1>{{ product.name }} ({{ product.inventory }})</h1>
          <p v-if="product.inventory > 10">In Stock</p>
          <p v-else-if="product.inventory <= 10 && product.inventory > 0">Almost sold out!</p>
          <p v-else>Out of Stock</p>
          <p v-show="product.onSale">On Sale</p>
          <p>Shipping: {{ shipping }}</p>
          <detail-product :details="product.details"/>

          <ul>
            <li v-for="variant in product.variants" :key="variant.id" @mouseover="updateVariant(variant)"
              class="color-circle" :style="{ backgroundColor: variant.color }">
            </li>
          </ul>

          <button class="button" @click="addToCart" :disabled="!product.inStock"
            :class="{ disabledButton: !product.inStock }">Add to Cart</button>
        </div>
      </div>
    </div>`,
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      product: {
        name: 'Shock',
        image: './assets/images/socks_blue.jpeg',
        inventory: 10,
        details: ['50% cotton', '30% wool', '20% polyester'],
        onSale: true,
        inStock: true,
        premium: false,
        selectedVariant: {},
        variants: [
          { id: 100, color: 'green', image: './assets/images/socks_green.jpeg', quality: 10 },
          { id: 200, color: 'blue', image: './assets/images/socks_blue.jpeg', quality: 2 },
        ]
      }
    }
  },
  mounted() {
    this.product.selectedVariant = this.product.variants[0]
  },
  methods: {
    addToCart() {
      if (this.product.inventory == 0) {
        this.product.inStock = false;
      } else {
        this.$emit('add-to-cart', this.product.selectedVariant.id);
        this.product.inventory--;
      }
    },
    updateVariant(variant) {
      this.product.image = variant.image;
      this.product.inventory = variant.quality;
      this.product.selectedVariant = variant;
    },
  },
  computed: {
    shipping() {
      return this.premium ? 'free' : '2.99$'
    }
  }
})
