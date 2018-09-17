Vue.component('history-cp', {
    template: 
    `
    <div class="modal fade" id="history" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">My Transaction History</h5>
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
                    <table class="table" v-if="dataHistory.length > 0" v-for="(data, index) in dataHistory">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Items</th>
                                <th scope="col">Price</th>
                                <th scope="col">Qty</th>
                                <th scope="col">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row"> {{index+1}} </th>
                                <td>
                                    <span v-for="item in data.itemCart">
                                        <p> {{item.name}} </p>
                                    </span>
                                </td>
                                <td>
                                    <span v-for="item in data.itemCart">
                                        <p> {{item.price}} </p>
                                    </span>
                                </td>
                                <td>
                                    <span v-for="item in data.itemCart">
                                        <p> {{item.qty}} </p>
                                    </span>
                                </td>
                                <td>
                                    <span v-for="item in data.itemCart">
                                        <p> {{item.subTotal}} </p>
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="4">Total Price</td>
                                <td>{{data.totalPrice}}</td>
                            </tr>
                            <tr>
                                <td colspan="4">Transaction Date</td>
                                <td>{{data.createdAt}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div v-if="dataHistory.length < 1">
                        <h3>You dont have transaction history</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    props: ['gethistoryfromparent'],
    data(){
        return{
            dataHistory: [],
            loginName: '',
            loginAddress: '',
            loginPhone: ''
        }
    },
    methods: {
          getHistory() {
            axios({
                method: 'GET',
                url: base_url + '/transactions',
                headers: {
                    token: localStorage.getItem('token')
                }
            })
                .then((result) => {
                    let temp = result.data
                    temp.forEach(t => {
                        t.createdAt = this.convertDate(t.createdAt)
                    });
                    this.dataHistory = temp
                })
                .catch((err) => {
                    console.log(err);

                });
        },

        convertDate(date) {
            let day = date.slice(8, 10);
            let month = date.slice(6, 7);
            let year = date.slice(0, 4);
            if (month > 9) {
                month = `1${month}`;
            } else {
                month = `0${month}`
            }
            return day + "-" + month + "-" + year
        },
    },

    watch: {
        gethistoryfromparent(){
            this.getHistory()
            this.loginName = localStorage.getItem('loginName')
            this.loginAddress = localStorage.getItem('loginAddress')
            this.loginPhone = localStorage.getItem('loginPhone')
        }
    }
})