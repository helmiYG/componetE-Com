Vue.component('msg-sc', {
    template: 
    `
    <div class="alert alert-success alert-dismissible fade show" role="alert">
        <center>
            <strong>{{getmsgsc}}</strong>
        </center>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
        </button>
    </div>
    `,
    props: ['getmsgsc']
})