$(function () {
  loadComponents();
  loadCarsAdminPage();
  loadCategory();
});

// function to load components
function loadComponents() {
  $(".header").load("./Header.html");
  $(".carousel").load("./Carousel.html");
  $(".sidebar").load("./Sidebar.html");
  //$(".contentProduct").load("./ContentProduct.html");
  $(".footer").load("./Footer.html");
}

function test() {
  console.log("test !");
}

// function to create a new car
function addNewCar() {
  // get new information of new car from add new car modal
  var c_name = $("#Name").val();
  var c_price = $("#Price").val();
  var c_info = $("#Info").val();
  var c_detail = $("#detail").val();
  var c_image = getImageName($("#Image").val());
  var c_year = $("#year").val();
  var c_category = $("#category").val();

  // find categoryNameById
  var categoryName = listCategory.find((category) => category.id == c_category).name;
 
  // declare a new car
  var newCar = {
    name: c_name,
    price: c_price,
    information: c_info,
    detail: c_detail,
    image: c_image,
    yearOfManu: c_year,
    category: categoryName,
  };


  // use ajax and call API
  $.ajax({
    type: "POST",
    url: "https://6435207983a30bc9ad5887af.mockapi.io/BmwCars",
    data: JSON.stringify(newCar),
   dataType: "JSON",
    contentType: "application/json;charset=UTF-8",
    success: function (response) {

      alert("Add new successfully !");
      $("#close").click();
      location.reload();
    },
  });
}

// function to get image link
function getImageName(imageLink) {
  // transfer path to array
  var itemArray = imageLink.split("\\");
  // get last element
  var imageName = itemArray[itemArray.length - 1];
  return imageName;
}

// functiom reset form add new car
function handleResetForm() {
  // $("#myModal").trigger("reset");
  $("#Id").val("");
  $("#Name").val("");
  $("#Price").val("");
}

// functiom reset form add new car
function handleResetFormUpdate() {
  // $("#myModal").trigger("reset");
  $("#Id").val("");
  $("#Name_Update").val("");
  $("#Price_Update").val("");
}

// declare listCars[] is global variable
let listCars = [];
// function load data from localStorage to table
function loadCarsAdminPage() {
  // useAjax to call API
  $.ajax({
    type: "GET",
    url: "https://6435207983a30bc9ad5887af.mockapi.io/BmwCars",
    dataType: "JSON",
    success: function (response) {
      listCars = response;
      // loop
      for (let index = 0; index < listCars.length; index++) {
        $("#tbProductTable").append(`
          <tr>
              <td>${listCars[index].id}</td>
              <td>${listCars[index].name}</td>
              <td>${listCars[index].price}</td>
              <td>${listCars[index].information}</td>
              <td>${listCars[index].detail}</td>
              <td>${listCars[index].image}</td>
              <td>${listCars[index].yearOfManu}</td>
              <td>${listCars[index].category}</td>
              <td>
                  <button type="button" class="btn btn-primary"
                  data-toggle="modal" data-target="#myUpdateModal"
                   onclick="handleEditCar(${listCars[index].id})">Edit</button>
              </td>
              <td>
                  <button type="button" class="btn btn-danger" onclick="handleDeleteCar(${listCars[index].id})">Delete</button>
              </td>
          </tr>

          `);
      }
    },
  });
}

//global variable category
let listCategory = [];
// function load category car for add new and update modal
function loadCategory() {
  $.ajax({
    type: "GET",
    url: "https://6435207983a30bc9ad5887af.mockapi.io/BmwCarcategory",
    dataType: "JSON",
    success: function (response) {
      listCategory = response;
      // add new modal :
      for (let index = 0; index < listCategory.length; index++) {
        $("#category").append(`
        <option value="${listCategory[index].id}">${listCategory[index].name}</option>
        `);
      }
      // update modal :
      for (let index = 0; index < listCategory.length; index++) {
        $("#category_Update").append(`
        <option value="${listCategory[index].id}">${listCategory[index].name}</option>
        `);
      }
    },
  });
}

// function to delete car
function handleDeleteCar(idCarDelete) {
  // alert a box to confirm yes or no delete
  var confirmDelete = confirm("Bạn có muốn xóa sản phẩm này ?");

  if (confirmDelete) {
    //  use ajax and call API
    $.ajax({
      type: "DELETE",
      url: `https://6435207983a30bc9ad5887af.mockapi.io/BmwCars/${idCarDelete}`,
      dataType: "JSON",
      success: function (response) {
        // alert delete successfully
        alert("Delete successfully !");
        // reload
        location.reload();
      },
    });
  }
}

// function when click "Edit" button
function handleEditCar(idCarUpdate) {
   fillDataById(idCarUpdate);
}

// function update car
function handleUpdateCar() {
  // get information from update modal
  var u_Id = $("#Id_Update").val();
  var u_Name = $("#Name_Update").val();
  var u_Price = $("#Price_Update").val();
  var u_info = $("#Info_Update").val();
  var u_detail = $("#Detail_Update").val();
  var u_Image = getImageName($("#Image_Update").val());
  var u_year = $("#Year_Update").val();
  var u_category = $("#category_Update").val();

  // find categoryNameById
  var categoryName = listCategory.find((category) => category.id ==  u_category).name;

  //declare a car
  var newCar = {
    name: u_Name,
    price: u_Price,
    information: u_info,
    detail: u_detail,
    image: u_Image,
    yearOfManu: Number(u_year),
    category: categoryName,
  };

  console.log('newCar :', JSON.stringify(newCar));
  console.log('categoryName : ', categoryName);
  console.log('yearOfManu : ', Number(u_year));

  // use ajax and call APi
  $.ajax({
    type: "PUT",
    url: `https://6435207983a30bc9ad5887af.mockapi.io/BmwCars/${u_Id}`,
    data: JSON.stringify(newCar),
    dataType: "JSON",
    contentType: "application/json;charset=UTF-8",
    success: function (response) {

      alert("Update successfully !");
      location.reload();
    },
  });

}

// function fill data to update modal by id
function fillDataById(idCarUpdate) {
  // find index
  var index = listCars.findIndex((car) => car.id == idCarUpdate);
  // find categoryID
  var categoryID = listCategory.find(
    (category) => category.name == listCars[index].category
  ).id;

  // set value for textfield of update modal
  $("#Id_Update").val(idCarUpdate);
  $("#Name_Update").val(listCars[index].name);
  $("#Price_Update").val(listCars[index].price);
  $("#Info_Update").val(listCars[index].information);
  $("#Detail_Update").val(listCars[index].detail);
  $("#Year_Update").val(listCars[index].yearOfManu);
  $("#category_Update").val(categoryID);

}
