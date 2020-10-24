// This function handles events where one button is clicked
$("#city-search").click(function (event) {
    event.preventDefault();

    // This line grabs the input from the text box
    var city = $("#search-city").val().trim();

    // If form is empty, return early
    if (city === "") {
        return;
    }

    console.log('city :>> ', city);

})