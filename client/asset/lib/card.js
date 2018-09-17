Vue.component('card-cp', {
    template: 
    `
        <div class="row">
            <div v-if="cardProps.itemToShow.length < 1">
                <h1>Items Not Found</h1>
            </div>
            <div class="col-lg-4 col-md-6 mb-4" v-for="item in cardProps.itemToShow" v-else>
                <div class="card h-100">
                    <a href="#">
                        <img class="card-img-top" v-bind:src="item.img" alt="">
                    </a>
                    <div class="card-body">
                        <h4 class="card-title">
                            <a href="#"> {{item.name}} </a>
                        </h4>
                        <h5> Price: {{item.price}} </h5>
                        <p class="card-text"> Stock: {{item.stock}} </p>
                        <button class="btn btn-dark my-2 my-sm-0 btn-sm" type="button" v-on:click="pushToCart(item)"
                            v-if="cardProps.token && item.stock > 0">Add To Cart</button>
                        <button class="btn btn-dark my-2 my-sm-0 btn-sm" type="button" disabled v-on:click="pushToCart(item)"
                            v-else-if="cardProps.token && item.stock < 1">Add To Cart</button>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>
                    </div>
                </div>
            </div>
        </div>
    `,

    props: ['cardProps'],
    data(){
        return{
            carts: []
        }
    },
    methods: {
        pushToCart(item) {
            this.totalPrice = 0
            item.qty = 1
            item.subTotal = item.price
            this.carts.push(item)
            this.carts.forEach((cart, index) => {
                if (index == this.carts.length - 1) {
                    cart.stock -= 1
                }
            });
            this.carts.forEach(cart => {
                this.totalPrice += cart.price
            });
        },
    },
    watch: {
        carts(){
            this.$emit('sentcarttomain', this.carts)
        },

        cardProps(){
            console.log('iniiiiiiiiiiiii',this.cardProps);
            
            this.cardProps
        }
    }
   
})