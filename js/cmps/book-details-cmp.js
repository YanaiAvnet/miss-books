import bookService from '../books-service.js'
import fullDescription from './full-description-cmp.js'

export default {
    components: {
        fullDescription
    },
    template: `
        <section class="book-details">
            <ul>
                <li v-show="book.listPrice.isOnSale"><div class="on-sale">50% Off!</div></li>
                <li>
                    <h2>{{book.title}}/{{authors}}</h2>
                </li>
                <li>
                    <h3>{{book.subtitle}}</h3>
                </li>
                <li><span :class="priceClass">{{price}}</span></li>
                <li>{{book.publishedDate}} {{bookAge}}</li>
                <full-description @close="closeDescription" :fulltext="book.description" v-if="isFullDescription"></full-description>
                <li v-else><p>{{description}}<span v-if="book.description.length > 100">... <button @click.stop="showFullDescription" class="text-btn">See More</button></span></p></li>
                <li>{{bookLength}}</li>
                <li>{{categories}}</li>
                <li><img class="book-thumbnail-large" :src="book.thumbnail"></li>
            </ul>
        </section>
    `,
    props: ['bookId'],
    data() {
        return {
            isFullDescription: false
        }
    },
    methods: {
        showFullDescription() {
            this.isFullDescription = true
        },
        closeDescription() {
            this.isFullDescription = false;
        }
    },
    computed: {
        book() {
            return bookService.getBookById(this.bookId);
        },
        authors() {
            return this.book.authors.join(', ');
        },
        categories() {
            return this.book.categories.join(', ');
        },
        price() {
            switch(this.book.listPrice.currencyCode) {
                case 'EUR': var currSymbol = '€';
                break;
                case 'USD': var currSymbol = '$';
                break;
                case 'ILS': var currSymbol = '₪';
                break;
            }
            return currSymbol + this.book.listPrice.amount;
        },
        bookLength() {
            if (this.book.pageCount >= 500) return 'Long Reading';
            else if (this.book.pageCount >= 200) return 'Decent Reading';
            else return 'Light Reading';
        },
        bookAge() {
            let bookAge = 2019 - this.book.publishedDate;
            if (bookAge > 10) return 'Veteran Book';
            else if (bookAge <= 1) return 'New!';
        },
        priceClass() {
            return {green: this.book.listPrice.amount < 20, red: this.book.listPrice.amount > 150}
        },
        description() {
            return this.book.description.substring(0, 99);
        }
    }
}

// "id": "OXeMG8wNskc",
// "title": "metus hendrerit",
// "subtitle": "mi est eros convallis auctor arcu dapibus himenaeos",
// "authors": [
//   "Barbara Cartland"
// ],
// "publishedDate": 1999,
// "description": "placerat nisi sodales suscipit tellus tincidunt mauris elit sit luctus interdum ad dictum platea vehicula conubia fermentum habitasse congue suspendisse",
// "pageCount": 713,
// "categories": [
//   "Computers",
//   "Hack"
// ],
// "thumbnail": "http://coding-academy.org/books-photos/20.jpg",
// "language": "en",
// "listPrice": {
//   "amount": 109,
//   "currencyCode": "EUR",
//   "isOnSale": false