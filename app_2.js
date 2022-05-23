Vue.createApp({
    data: () => ({
        myHtml: '<h1>Vue 3 App</h1>',
        title: 'I am Groot',
        person: {
            firstName: 'One',
            lastName: '№',
            age: 1
        },
        items: [1, 2, 3, 4, 5, 6],
    }),
    methods: {
        addItem(event) {
            console.log('$refs', this.$refs);
            this.items.unshift(this.$refs.myInput.value);
            this.$refs.myInput.value = '';
            console.log(event.key);
        },
        remove(idx) {
            this.items.splice(idx, 1);
        },
        log(item) {
            console.log('You removed item:',item);
        },
    },
    // computed: {
    //     evenItems() {
    //         return this.items.filter(i => i % 2 === 0);
    //     },
    // }
}).mount('#app');