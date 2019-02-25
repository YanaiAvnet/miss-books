export default {
    template: `
    <div class="full-description">
        <p>{{fulltext}}</p>
        <button @click.stop="closeDescription" class="text-btn">See Less</button>
    </div>
    `,
    props: ['fulltext'],
    methods: {
        closeDescription() {
            this.$emit('close');
        }
    }
}