Vue.component('login-cp', {
    template: 
    `
    <div class="modal fade" id="login" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Login</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <label for="recipient-name" class="col-form-label">Email</label>
                            <input type="text" class="form-control" v-model="email">
                        </div>
                        <div class="form-group">
                            <label for="message-text" class="col-form-label">Password:</label>
                            <input type="password" class="form-control" v-model="password">
                        </div>
                    </form>
                    <div v-if="msgErr.length > 0" v-for="msg in msgErr">
                        <p style="color: red"> {{msg}} </p>
                    </div>
                    <div v-if="msgSc">
                        <p style="color: green"> {{msgSc}} </p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" v-on:click="login()">Login</button>

                </div>
            </div>
        </div>
    </div>
    `,
    props: ['getstremovefromparent'],
    data(){
        return{
            email: '',
            password: '',
            msgErr: [],
            msgSc: '',
            isLogin: ''
            
        }
    },
    methods: {
        login() {
            this.msgSc= ''
            this.msgErr = []
            if (!this.email) {
                this.msgErr.push('email is required')
            }

            if (!this.password) {
                this.msgErr.push('password is required')

            }

            if (this.msgErr.length < 1) {
                axios({
                        method: 'POST',
                        url: `${base_url}/signin`,
                        data: {
                            email: this.email,
                            password: this.password
                        }
                    })
                    .then((result) => {
                        this.msgErr = []
                        localStorage.setItem('token', result.data.token)
                        this.isLogin = localStorage.getItem('token')
                        this.msgSc = 'login succes'
                        localStorage.setItem('loginName', result.data.loginName)
                       
                        localStorage.setItem('loginAddress', result.data.loginAddress)
                        localStorage.setItem('loginPhone', result.data.loginPhone)
                    })
                    .catch((err) => {
                        if (err.response.data.msg) {
                            this.msgErr.push(err.response.data.msg)
                        }
                    });
            }

        },
    }, 
    watch: {
        isLogin(){
            this.$emit('islogin', this.isLogin)
        },

        getstremovefromparent(){
            this.password = '',
            this.email = '',
            this.msgErr = [],
            this.msgSc = ''
        }
    }
})