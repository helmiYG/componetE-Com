Vue.component('filter-cp', {
    template: 
    `
    <div style="margin-top: 10px">
            <h3>Filter</h3>
            <div class="card">
                <article class="card-group-item">
                    <header class="card-header">
                        <h6 class="title">Range input </h6>
                    </header>
                    <div class="filter-content">
                        <div class="card-body">
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label>Min</label>
                                    <input type="number" name="pax" step="20000" class="form-control" id="inputEmail4"
                                        placeholder="0" v-model="min">
                                </div>
                                <div class="form-group col-md-6 text-right">
                                    <label>Max</label>
                                    <input type="number" name="pax" step="20000" class="form-control"
                                        placeholder="0" v-model="max">
                                </div>
                                <button type="button" class="btn btn-dark" v-on:click="filter()">filter</button>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
            <div class="card">
                <article class="card-group-item">
                    <header class="card-header">
                        <h6 class="title">Search by Item </h6>
                    </header>
                    <div class="filter-content">
                        <div class="card-body">
                            <div class="form-row">
                                <form class="form-inline" style="margin-bottom: 10px">
                                    <input class="form-control mr-sm-2" type="search" placeholder="Search"
                                        aria-label="Search" v-model="toSearch">
                                </form>
                                <button class="btn btn-dark my-2 my-sm-0" type="button" v-on:click="search()">Search</button>
                            </div>
                        </div>
                        <!-- card-body.// -->
                    </div>
                </article>
            </div>
    </div>
    `,

    props: ['items'],
    data(){
        return{
            itemToShow: [],
            min: '',
            max: '',
            toSearch: '',
        }
    },

    methods: {
        search() {
            this.itemToShow = []
            this.items.forEach(item => {
                if (item.name.indexOf(this.toSearch) > -1) {
                    this.itemToShow.push(item)
                }
            });
            this.$emit('addToShow', this.itemToShow)
        },

        filter() {
            this.itemToShow = this.items.filter(item => item.price <= this.max && item.price >= this.min)
            this.$emit('addToShow', this.itemToShow)
            this.min = ''
            this.max = ''
        },
    }
})