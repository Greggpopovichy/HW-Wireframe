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
            a.addClass("artist");
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

                 var artistDiv = $("<div>");
                 var artistImage = $("<img>");
                 artistImage.attr("src", results[i].images.fixed_height.url);
                 artistDiv.append(artistImage);
                 $("#artist-view").append(artistDiv);
             }
         });

     });
 };
    $(document).on("click", ".artist", addArtist);
};