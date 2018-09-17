Vue.component('navbar-cp',{
    template: 
    `
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <a class="navbar-brand" href="#">Navbar</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item" v-if="token">
                        <a class="nav-link" href="#history" data-toggle="modal" data-target="#history" @click="getHistory">Transction History</a>
                    </li>
                </ul>
                <form class="form-inline my-2 my-lg-0">
                    <!-- <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"> -->
                    <button class="btn btn-outline-light" type="button" data-toggle="modal" data-target="#cart" v-if="token">
                        Cart {{getcartsfromparent.length}}
                        <i class="fa fa-shopping-cart" style="font-size:16px"></i>
                    </button>
                    <button class="btn btn-outline-light my-2 my-sm-0" type="button" v-if="token" v-on:click="logout()">Logout</button>
                    <button class="btn btn-outline-light my-2 my-sm-0" type="button" data-toggle="modal" data-target="#login"
                        v-if="!token" v-on:click="remove_stLogin()">Login</button>
                    <button class="btn btn-outline-light my-2 my-sm-0" type="button" data-toggle="modal" data-target="#register"
                        v-if="!token" v-on:click="remove_isReg()">Register</button>
                </form>
            </div>
        </nav>
    `,
    props: ['isloginfromparent', 'getcartsfromparent'],
    data(){
        return{
            email: '',
            password: '',
            token: false,
            msgErr: [],
            removeErr: '',
            isLogout: false,
            stRemoveLogin: true,
            stRemoveRegister: true,
            isHistory: true
        }
    },
    methods: {
        remove_stLogin() {
            if (this.stRemoveLogin) {
                this.$emit('stremovefromnavbar', this.stRemoveLogin)
                this.stRemoveLogin = false
            } else {
                this.$emit('stremovefromnavbar', this.stRemoveLogin)
                this.stRemoveLogin = true
            }
        },

        logout(){
            console.log('ini is logout',this.isLogout);
            if (this.isLogout) {
                this.isLogout = false
            } else {
                this.isLogout = true
            }
            localStorage.clear()
        },

        remove_isReg() {
            if (this.stRemoveRegister) {
                this.$emit('stremoveregfromnavbar', this.stRemoveRegister)
                this.stRemoveRegister = false
            } else {
                this.$emit('stremoveregfromnavbar', this.stRemoveRegister)
                this.stRemoveRegister = true
            }
        },

        getHistory(){
            if (this.isHistory) {
                this.$emit('sentishistory', this.isHistory)
                this.isHistory = false
            }else{
                this.$emit('sentishistory', this.isHistory)
                this.isHistory = true
            }
        }
    },
    watch: {
        isloginfromparent(){
            this.token = true
        },

        isLogout(){
            console.log('ini token navbar untuk ogout',this.token);
            
            this.token = false
            console.log('ini token navbar untuk ogout',this.token);
            
            this.$emit('islogout', this.token)
        },
    }
    
})