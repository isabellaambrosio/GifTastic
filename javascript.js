// Document Ready
$(document).ready(function() {

    // Toppic array
    var topics = ['Eddie Vedder', 'Kurt Cobain', 'Courtney Love', 'Amy Winehouse', 'Dave Grohl', 'Hayley Williams', 'Chirs Cornell'];

    // take the topics in this array and create buttons in HTML.
    // TODO - for loop that creates a button each time that it passes through the loop


    // function that creates buttons

    function createButton() {

        $("#buttonHere").empty();

        // Loop to create buttons
        for (var i = 0; i < topics.length; i++) {
            var button = $('<button>'); //Create button
            button.addClass('buttonClass'); //add class
            button.attr('data-button', topics[i]); //adding data-attribute
            button.text(topics[i]); //providing text to the button
            $("#buttonHere").append(button); //button shows on html

            console.log(button);

        }

    }
    // end of createButton function

    createButton();


    // Link giphy api to buttons

    // Event listener
    // these buttons are created dynamically, by js code (not in html)
    // need to listen like .singer-image below. see line 93.
    $(document).on("click", ".buttonClass", function() {
        var singer = $(this).attr("data-button");

        // URL to search Giphy with the singer's name
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            singer + "&api_key=dc6zaTOxFJmzC&limit=10";


        // AJAX request
        // Performing our AJAX GET request
        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .done(function(response) {
                console.log(response);

                var results = response.data;

                // Each time we loop through the result
                for (var i = 0; i < results.length; i++) {

                    // create a new div
                    var giphyDiv = $("<div>");

                    // create paragraph with rating
                    var p = $("<p>").text("Rating: " + results[i].rating);

                    //create image tag
                    var giphyImage = $("<img>");

                    // Setting the src attribute of the image to a property pulled off the result item
                    giphyImage.attr("src", results[i].images.original_still.url);
                    giphyImage.attr("data-still", results[i].images.original_still.url);
                    giphyImage.attr('data-animate', results[i].images.original.url);
                    giphyImage.attr('data-state', 'still');
                    giphyImage.addClass("singer-image");




                    // Appending the paragraph and image tag to the giphyDiv
                    giphyDiv.append(p);
                    giphyDiv.append(giphyImage);

                    // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                    $("#giphy").prepend(giphyDiv);
                }
            });

    });

    // On click listener for image
    $(document).on('click', ".singer-image", function() {
        console.log("test");

        var state = $(this).attr('data-state');
        console.log(state);


        if (state === "still") {
            var movingImg = $(this).attr("data-animate");
            $(this).attr("src", movingImg);
            $(this).attr("data-state", "animate");
        }
        else {
            var stillImg = $(this).attr("data-still");
            $(this).attr("src", stillImg);
            $(this).attr("data-state", "still");
        }

    })



    // Add a form to your page takes the value from a user input box and adds it into your `topics` array. Then make a function call that takes each topic in the array remakes the buttons on the page.
    // Create new button

    $("#add-singer").on("click", function(event) {
        event.preventDefault();

        // This line grabs the input from the textbox
        var newSinger = $("#singer-input").val().trim();


        // Adding the movie from the textbox to our array
        topics.push(newSinger);
        console.log(topics)


        $('#buttonHere').append(newSinger);


        // Calling renderButtons which handles the processing of our movie array
        createButton();

    });

});
// End of document.ready







// When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.

// When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.

// Under every gif, display its rating (PG, G, so on).
