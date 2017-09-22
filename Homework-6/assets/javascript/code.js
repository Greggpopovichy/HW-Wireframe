window.onload = function() {

//array to hold artists and to add user selected artists
    var artists = ["Young Thug", "Future", "Andre 3000", "Big Boi", "Killer Mike"];
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
        $("#artistButtons").empty();
        
//getting value from artist-input. setting it to variable artist. adding input to artists array
        var artist = $("#artist-input").val().trim();
        artists.push(artist);
    });

    renderButtons();

//creating function to connect to giphy api

    var addArtist =  function(){
        $("button").on("click", function () {
         var artist = $(this).attr("data-name");
         var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + artist +
             "&apikey=zA6mzK0GwFwHWhIFz6gobGIq1HYOWtIL&limit=10";

         $.ajax({
             url: queryURL,
             method: "GET"
         }).done(function (response) {
             console.log(queryURL);
             var results = response.data;
//looping through api response, and dynamically creating dom elements to store data
             
             for (var i = 0; i < results.length; i++) {
                 var artistDiv = $("<div>");
                 var artistImage = $("<img>");
                 var rating = results[i].rating;
                 var p = $("<span>").text("Rating: " + rating);

                 artistImage.attr("src", results[i].images.fixed_height.url);
                 artistImage.css("padding", "5px");
                 artistDiv.append(artistImage);

                 $("#artist-view").prepend(artistDiv);
                 $("#artist-view").prepend(p);

/*Having trouble getting the gifs to pause.
My thought was to set artistImage attr = results[i].images.fixed_height_small_still.url and then write a conditional with a click event that changes the attr.
Implementing that has been a challenge.

                   for(var j = 0; j < results.length; j++){
                    if(true){
                        artistImage.attr("src", results[i].images.fixed_height_small_still.url);
                    }else{
                        artistImage.attr("src", results[i].images.fixed_height.url);
                        }
                    };
                    */
             }
             renderButtons();
         });

     });
 };
 //setting click event on document object to respond to user click. when user clicks artist buttons, run addArtist function
    $(document).on("click", ".artist", addArtist);
};
