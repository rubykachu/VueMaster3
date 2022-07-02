app.component('review-list', {
  template:
    /* html */
    `<div class="review-container" v-if="reviews.length">
      <h3>Reviews:</h3>
        <ul>
          <li v-for="(review, index) in reviews" :key="index">
            {{ review.name }} gave this {{ review.rating }} starts
            <br />
            {{ review.review }}
          </li>
        </ul>
      </div>`,
  props: {
    reviews: {
      type: Array,
      required: true
    }
  }
});
