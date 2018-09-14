Vue.component('main-cp',{
    template: 
    `
    <div class="row">
    
            <div class="col-lg-3">

           <!-- ===============CATEGORY=========== -->
                <category-cp v-bind:items="items" @addToShowFun="addToShowFun" @addToShow="addToShow"></category-cp>
            <!-- =============== FILTER =========== -->
              <filter-cp v-bind:items="items" @addToShow="addToShow"></filter-cp>
            <!-- ============ /FILTER ============== -->

            </div>
            <!-- /.col-lg-3 -->

            <div class="col-lg-9">
                <carousel-cp></carousel-cp>
                <card-cp v-bind:cardProps="{itemToShow, token}"></card-cp>
            </div>
            <!-- /.col-lg-9 -->

        </div>

    `,

    data(){
        return {
            items: [],
            itemToShow: [],
            carts: [],
            totalPrice: 0,
            name: '',
            address: '',
            phone: '',
            email: '',
            password: '',
            isLogin: false,
            isLogout: false,
            token: false,
            isReg: '',
            msgErr: [],
            msgSc: '',
            stLogin: '',
            loginName: '',
            loginAddress: '',
            loginPhone: '',
            min: '',
            max: '',
            msgPush: '',
            showJacketFirst: null,
        }
    },
    methods: {
        addToShowFun(funcToShow){
            this.showJacketFirst = funcToShow
        },

        addToShow(itemToShow){
            this.itemToShow = itemToShow
        },

        
    },

    created() {
        let isToken = localStorage.getItem('token')
        if (isToken) {
            this.token = true
            axios({
                    method: 'GET',
                    url: base_url + '/users',
                    headers: {
                        token: localStorage.getItem('token')
                    }
                })
                .then((result) => {
                    this.loginName = result.data.loginName
                    this.loginAddress = result.data.loginAddress
                    this.loginPhone = result.data.loginPhone
                })
                .catch((err) => {
                    console.log(err);

                });
        }

        axios({
                method: 'GET',
                url: base_url + '/items'
            })
            .then((result) => {
                this.items = result.data
                this.showJacketFirst(this.items)
            })
            .catch((err) => {
                console.log(err);
            });


    },
})