Vue.component('cart-cp', {
    template:

        `
    <div class="modal fade" id="cart" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">My Cart</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <table class="table">
                        <tr>
                            <th scope="row">Name</th>
                            <td> {{loginName}} </td>
                        </tr>
                        <tr>
                            <th scope="row">Address</th>
                            <td> {{loginAddress}} </td>
                        </tr>
                        <tr>
                            <th scope="row">Phone</th>
                            <td> {{loginPhone}} </td>
                        </tr>
                    </table>
                    <div v-if="cartsfromparent.carts.length < 1">
                        <h3>No Item to buy</h3>
                    </div>
                    <table class="table" v-if="cartsfromparent.carts.length > 0">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Items</th>
                                <th scope="col">Price</th>
                                <th scope="col">Qty</th>
                                <th scope="col">Total</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody v-if="cartsfromparent.carts.length > 0">
                            <tr v-for="(cart, index) in cartsfromparent.carts">
                                <th scope="row"> {{index+1}} </th>
                                <td> {{cart.name}} </td>
                                <td> {{cart.price}} </td>
                                <td> 1 </td>
                                <td> {{ cart.price }}</td>
                                <td>
                                    <button type="button" class="btn btn-danger btn-sm" v-on:click="cancel(index)">
                                        <i class="fas fa-ban"></i>
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="4">Total Price</td>
                                <td> {{totalPrice}} </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer" v-if="cartsfromparent.carts.length > 0">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click="buy()">Submit</button>
                    <!-- <p v-if="msgPush" style="color: green"> {{msgPush}} </p> -->
                </div>
            </div>
        </div>
    </div>
    `,
    props: ['cartsfromparent'],
    data() {
        return {
            loginName: '',
            loginAddress: '',
            loginPhone: '',
            totalPrice: 0,
            msgScBuy: ''
        }
    },

    methods: {
        buy() {
            this.cartsfromparent.carts.forEach(cart => {
                axios({
                    method: 'PUT',
                    url: base_url + '/items/buy',
                    headers: {
                        token: localStorage.getItem('token')
                    },
                    data: {
                        id: cart._id
                    }
                })
                    .then(() => {
                       
                    })
                    .catch((err) => {
                        console.log(err);

                    });
            });
            
            axios({
                method: 'POST',
                url: base_url + '/transactions',
                headers: {
                    token: localStorage.getItem('token')
                },
                data: {
                    itemCart: this.cartsfromparent.carts,
                    totalPrice: this.totalPrice
                }
            })
                .then(() => {
                 
                })
                .catch((err) => {
                    console.log(err);

                });
                this.msgScBuy = 'transaction succes'
                this.$emit('sentscbuy', this.msgScBuy)
            this.cartsfromparent.carts = []
            this.$emit('setnullcart', this.cartsfromparent.carts)
           
        },
        cancel(index) {
            let idItem = this.cartsfromparent.carts[index]._id
            this.totalPrice -= this.cartsfromparent.carts[index].price
            this.$emit('sentiditem', idItem)
            this.cartsfromparent.carts.splice(index, 1)
        },


    },
    watch: {
        cartsfromparent() {
            this.loginName = localStorage.getItem('loginName')
            this.loginAddress = localStorage.getItem('loginAddress')
            this.loginPhone = localStorage.getItem('loginPhone')
            this.totalPrice = 0
            this.cartsfromparent.carts.map(cart => {
                this.totalPrice += cart.price
            })
        }
    }
})