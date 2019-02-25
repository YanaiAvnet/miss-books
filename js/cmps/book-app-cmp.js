import booksService from '../books-service.js'
import bookDetails from './book-details-cmp.js'
import bookFilter from './book-filter-cmp.js'
import bookList from './book-list-cmp.js'

export default {
    components: {
        bookDetails,
        bookFilter,
        bookList
    },
    template: `
        <section class="book-app" @click="hideDetails">
            <header>
                <h1>Miss-Books</h1>
                <book-filter @filtered="setFilter"></book-filter>
            </header>
            <book-list :books="booksToShow" @selected="selectBook"></book-list>
            <book-details v-if="selectedBook" :class="{onscreen: isOnScreen}" :bookId="selectedBook"></book-details> 
        </section>
    `,
    data() {
        return {
            books: null,
            filter: {byName: '', fromPrice: 0, toPrice: Infinity},
            selectedBook: null,
            isOnScreen: false
        }
    },
    methods: {
        setFilter(filter) {
            console.log('setting filter:', filter);
            this.filter.byName = filter.byName || '';
            this.filter.fromPrice = filter.fromPrice || 0;
            this.filter.toPrice = filter.toPrice || Infinity;
        },
        selectBook(bookId) {
            if (this.selectedBook === bookId) this.isOnScreen = !this.isOnScreen;
            else setTimeout(() => this.isOnScreen = true, 0);
            this.selectedBook = bookId;
        },
        hideDetails() {
            this.isOnScreen = false;
        }
    },
    computed: {
        booksToShow() {
            return this.books.filter(book => {
                console.log(new RegExp(this.filter.byName).test(book.title &&
                    book.listPrice.amount <= this.filter.toPrice &&
                    new RegExp(this.filter.byName).test(book.title)));
                
                return (book.listPrice.amount >= this.filter.fromPrice &&
                        book.listPrice.amount <= this.filter.toPrice &&
                        new RegExp(this.filter.byName).test(book.title))
            });
        }
    },
    created() {
        this.books = booksService.getBooks();
    }
}