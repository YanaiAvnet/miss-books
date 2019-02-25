import bookPreview from './book-preview-cmp.js'

export default {
    components: {
        bookPreview
    },
    template: `
        <section class="book-list">
            <ul>
                <book-preview
                    @click.native.stop="selectBook(book)"
                    v-for="book in books"
                    :key="book.id"
                    :book="book"
                    >
                </book-preview>
            </ul>
        </section>
    `,
    props: ['books'],
    data() {
        return {

        }
    },
    methods: {
        selectBook(book) {
            this.$emit('selected', book.id);
        }
    },
    computed: {

    }
}