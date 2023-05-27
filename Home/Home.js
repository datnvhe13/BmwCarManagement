$(function () {
  loadComponents();
  //
  loadCarsHomePage();
});

// function to load components
function loadComponents() {
  $(".header").load("./Header.html");
  $(".menu").load("./Menu.html");
  $(".carousel").load("./Carousel.html");
  // $(".container").load("./ListProduct.html");
  $(".information").load("./Information.html");
  $(".news").load("./News.html");
  $(".footer").load("./Footer.html");
}

// declare listCars[] is global variable
let listCars = [];
// function load cars from localStorage
function loadCarsHomePage() {
  $.ajax({
    type: "GET",
    url: "https://6435207983a30bc9ad5887af.mockapi.io/BmwCars",
    // data: "data",
    dataType: "JSON",
    success: function (response) {
      listCars = response;
      // loop
      for (let index = 0; index < listCars.length; index++) {
        $("#listCarsHome").append(`
        <!-- product 1 -->
        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 hasHover" >
          <!-- image -->
          <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <a href="../Home/product.html">
              <img src="../Asset/${listCars[index].image}" style="width: 100%; height: 240px;" alt="">
              </a>
            </div>
          </div>
          <!-- name -->
          <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <p style="text-align: center; margin-top: 8px;">${listCars[index].name}</p>
            </div>
          </div>
          <!-- price -->
          <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <p style="font-weight: bold; text-align: center;">${listCars[index].price} VND</p>
            </div>
          </div>
        </div>
        <!-- end product 1 -->
        
        `);
      }
    },
  });
}
