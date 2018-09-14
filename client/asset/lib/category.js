Vue.component('category-cp', {
    template: 
    `
    <div>
        <h1 class="my-4">Shop Name</h1>
        <div class="list-group">
            <a href="#" class="list-group-item" v-on:click="showJacket()">Jaket</a>
            <a href="#" class="list-group-item" v-on:click="showTshirt()">T- Shirt</a>
            <a href="#" class="list-group-item" v-on:click="showAccescories()">Accesories</a>
        </div>
    </div>
    `,
    props: ['items'],
    data(){
        return{
            itemToShow: []
        }
    },
    methods: {
        showJacketFirst(items) {
                this.itemToShow = []
                items.forEach(item => {
                    if (item.category == 'jacket') {
                        this.itemToShow.push(item)
                    }
                });
                this.$emit('addToShow', this.itemToShow)
            },

            showJacket() {
                this.itemToShow = []
                this.items.forEach(item => {
                    if (item.category == 'jacket') {
                        this.itemToShow.push(item)
                    }
                });
                this.$emit('addToShow', this.itemToShow)
            },
            showTshirt() {
                this.itemToShow = []
                this.items.forEach(item => {
                    if (item.category == 'tshirt') {
                        this.itemToShow.push(item)
                    }
                });
                this.$emit('addToShow', this.itemToShow)
            },
    
            showAccescories() {
                this.itemToShow = []
                this.items.forEach(item => {
                    if (item.category == 'accessories') {
                        this.itemToShow.push(item)
                    }
                });
                this.$emit('addToShow', this.itemToShow)
            },
    },

    created() {
        this.$emit('addToShowFun', this.showJacketFirst)
    },

})