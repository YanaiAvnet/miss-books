export default {
    template: `
        <li class="book-preview">
            <ul>
                <img class="book-thumbnail-small" :src="book.thumbnail">
                <li><h3>{{book.title}}</h3></li>
                <li>{{price}}</li>
            </ul>
        </li>
    `,
    props: ['book'],
    data() {
        return {

        }
    },
    computed: {
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
        }
    }
}