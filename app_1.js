const App_1 = {
    data() {
        return {
            title: 'Note list',
            placeholderString: 'Add note',
            inputValue: '',
            notes: ['Note 1', 'Note 2']
        };
    },
    methods: {
        // inputChangeHandler({target}) {
        //     this.inputValue = target.value;
        // },
        addNewNote() {
            if (this.inputValue !== '') {
                this.notes.push(this.inputValue);
                this.inputValue = '';
            }
        },
        // doubleCount() {
        //     return this.notes.length * 2;
        // },
        toUpperCase(item) {
            return item.toUpperCase();
        },
        removeNote(index) {
            this.notes.splice(index, 1);
        },
    },
    computed: {
        doubleCountComputed() {
            return this.notes.length * 2;
        },
    },
    watch: {
        inputValue(value) {
            if (value.length >= 10) this.inputValue = '';
            console.log(value);
        },
    },
};

Vue.createApp(App_1).mount('#app');