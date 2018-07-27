$(document).ready(function () {
  // Array of animal 
  var animals = ["lion", "tiger", "snake", "bee", "bear", "dog", "wolf", "cat", "cow", "duck"]
  var colors = ["purple", "pink", "red", "orange", "yellow", "olive", "green", "blue", "violet", "brown"]


  // Display animal in the button
  function animalButtons() {
    $("#buttons-area").empty();
    for (var i = 0; i < animals.length; i++) {
      var button = $("<button>");
      var randomColor = colors[Math.floor(Math.random() * colors.length)]
      button.addClass("btnClass ").css({ "border-color": randomColor, "background-color": "black" })
      button.attr("buttonName", animals[i]).css({ "color": randomColor })
      button.text(animals[i]);
      $("#buttons-area").append(button);
    }
  }  // End of the animalButtons function


  // Add new item to the item list
  $("#add-animal").on("click", function (event) {
    event.preventDefault();
    var animal = $("#animal-input").val().trim();
    if (animal === "") {
      alert("You left the link empty, Please enter an animal name then push the 'Add an animal' button")
      return false;
    }
    animals.push(animal);
    $("#animal-input").val("")
    animalButtons();
  });


  function displayAnimalInfo() {
    var animal = $(this).attr("buttonName")
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=Nf6AC5rFzRhteVH5i5N1a5EzGYqxwlt3"
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      $("#animal-view").empty();



      for (var j = 0; j < response.data.length; j++) {

        var imageDiv = $("<div>");
        imageDiv.addClass("imgClass");

        var pOne = $("<p>").text("Rating: " + response.data[j].rating);
        imageDiv.append(pOne);

        var image = $("<img>");
        image.attr("src", response.data[j].images.fixed_height_small_still.url);
        image.attr("data-still", response.data[j].images.fixed_height_small_still.url);
        image.attr("data-animate", response.data[j].images.fixed_height_small.url);
        image.attr("data-state", "still");
        image.addClass("imgClass");
        imageDiv.append(image);
        $("#animal-view").prepend(imageDiv);

      }

    });  // End of the response function

  }   // End of the displayAnimalInfo function



  $(document).on("click", ".btnClass", displayAnimalInfo);
  $(document).on("click", ".imgClass", function () {
    var state = $(this).attr('data-state');

    if (state == 'still') {
      $(this).attr('src', $(this).data('animate'));
      console.log(this)
      $(this).attr('data-state', 'animate');
    }

    else {
      $(this).attr('src', $(this).data('still'));
      $(this).attr('data-state', 'still');
    }


  })

  animalButtons();
});