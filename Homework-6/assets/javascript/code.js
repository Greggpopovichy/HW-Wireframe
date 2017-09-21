window.onload = function() {

//array to hold user input artists
    var artists = [];
    console.log(artists);

//function to render user input into buttons
    function renderButtons() {
        $("#artistButtons").empty();

//looping through artists array and adding attributes. Appending buttons to artistButtons div
        for (var i = 0; i < artists.length; i++) {
            var a = $("<button>");
            a.addClass("artist btn btn-default");
            //a.css({"border-radius": "6px", "background-color": "red", "color": "whitesmoke"});
            a.attr("data-name", artists[i]);
            a.text(artists[i]);
            $("#artistButtons").append(a);
        }
    }

//click event to get user input
    $("#addArtist").on("click", function (event) {
        event.preventDefault();

        var artist = $("#artist-input").val().trim();
        artists.push(artist);
        console.log(artists);
        renderButtons();
    });
    renderButtons();

 var addArtist =  function(){
     $("button").on("click", function () {
         var artist = $(this).attr("data-name");
         var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + artist + "&apikey=77011c29b93045ac974ed011626e60fe&limit=10";

         $.ajax({
             url: queryURL,
             method: "GET"
         }).done(function (response) {
             console.log(queryURL);
             var results = response.data;
             for (var i = 0; i < results.length; i++) {
                 var artistDiv = $("<span>");
                 var artistImage = $("<img>");
                 artistImage.attr("src", results[i].images.fixed_height_small.url);
                 artistImage.css("padding", "5px");
                 artistDiv.append(artistImage);
                 $("#artist-view").append(artistDiv);
             }
         });

     });
 };

    /*$(".gif").on("click", function() {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });*/
    $(document).on("click", ".artist", addArtist);
};