Vue.component('carousel-cp', {
    template: 
    `
    <div id="carouselExampleIndicators" class="carousel slide my-4" data-ride="carousel">
        <ol class="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner" role="listbox">
            <div class="carousel-item active">
                <img class="d-block img-fluid" src="http://www.420official.com/assets/images/post/home-slideshow-1.jpg?v=7/21/2018%201:05:56%20PM&w=1900"
                    alt="First slide">
            </div>
            <div class="carousel-item">
                <img class="d-block img-fluid" src="http://www.420official.com/assets/images/post/home-slideshow-4.jpg?v=7/21/2018%201:07:20%20PM&w=1900"
                    alt="Second slide">
            </div>
            <div class="carousel-item">
                <img class="d-block img-fluid" src="http://www.420official.com/assets/images/post/home-slideshow-3.jpg?v=7/21/2018%201:06:44%20PM&w=1900"
                    alt="Third slide">
            </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>
    `
})