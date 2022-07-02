app.component('detail-product', {
  template:
    `<ul>
      <li v-for="detail in details">{{ detail }}</li>
    </ul>`,
  props: {
    details: {
      type: Array,
      required: true
    }
  }
})
