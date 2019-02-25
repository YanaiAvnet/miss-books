import doubleSlider from './double-slider-cmp.js'

export default {
    components: {
        doubleSlider
    },
    template: `
        <section class="book-filter">
            <form @submit.prevent="doFilter">
                <label for="book-search">
                    <input type="text" name="book-search" placeholder="Search Book Title" v-model="byName">
                </label>
                <span class="range">{{fromPrice}}, {{toPrice}}</span>
                <double-slider @range="setRange"></double-slider>
                <button type="submit" class="text-btn">Search</button>
            </form>
        </section>
    `,
    data() {
        return {
            byName: '',
            fromPrice: 0,
            toPrice: 500
        }
    },
    methods: {
        doFilter() {
            this.$emit('filtered', {byName: this.byName, fromPrice: this.fromPrice, toPrice: this.toPrice})
        },
        setRange(min, max) {
            if (min > max) [min, max] = [max, min]
            this.fromPrice = parseInt(min/150*500)
            this.toPrice = parseInt(max/150*500)            
        }
    },
    computed: {

    }
}