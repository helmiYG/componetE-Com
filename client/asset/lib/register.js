Vue.component('register-cp', {
    template: `
    <div class="modal fade" id="register" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">REGISTER</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <label for="recipient-name" class="col-form-label">Name:</label>
                            <input type="text" class="form-control" v-model="name">
                        </div>
                        <div class="form-group">
                            <label for="message-text" class="col-form-label">Address:</label>
                            <input type="text" class="form-control" v-model="address">
                        </div>
                        <div class="form-group">
                            <label for="recipient-name" class="col-form-label">Phone:</label>
                            <input type="text" class="form-control" v-model="phone">
                        </div>
                        <div class="form-group">
                            <label for="message-text" class="col-form-label">Email:</label>
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
                    <button type="button" class="btn btn-primary" v-on:click="register()">Submit</button>
                </div>
            </div>
        </div>
    </div>
    `,
    props: ['getstremoveregfromparent'],
    data() {
        return {
            name: '',
            address: '',
            phone: '',
            email: '',
            password: '',
            msgErr: [],
            msgSc: '',
        }
    },
    methods: {
        register() {
            this.msgSc = ''
            this.msgErr = []
            if (!this.name) {
                this.msgErr.push('name is required')
            }

            if (!this.email) {
                this.msgErr.push('email is required')
            }

            if (!this.address) {
                this.msgErr.push('address is required')
            }

            if (!this.phone) {
                this.msgErr.push('phone is required')
            }

            if (!this.password) {
                this.msgErr.push('password is required')
            }

            if (this.msgErr.length < 1) {
                axios({
                        method: 'POST',
                        url: base_url,
                        data: {
                            name: this.name,
                            email: this.email,
                            address: this.address,
                            phone: this.phone,
                            password: this.password
                        }
                    })
                    .then(() => {
                        this.msgSc = 'registrasi succes, please login now'
                    })
                    .catch((err) => {
                       
                        if (err.response.data.err.errors.email.message) {
                            this.msgErr.push('email is already in use')
                        }
                    });

            }

        },
    },

    watch: {
        getstremoveregfromparent(){
            this.name= ''
            this.address= ''
            this.phone= ''
            this.email= ''
            this.password= ''
            this.msgErr= []
            this.msgSc= ''
        }
    }



})