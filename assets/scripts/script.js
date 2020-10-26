$(document).ready(function () {

    var arr = JSON.parse(localStorage.getItem("city")) || [];
    var queryURL = " https://api.covidtracking.com/v1/us/current.json";
    $.ajax({
        type: "GET",
        url: queryURL,
        dataType: "JSON",
        success: function (response) {
            console.log(response);
        }
    });

    if (arr.length > 0) {
        arr.forEach(name => {
            createCitylist(name);
        })
    }


    $("#search-form").on("submit", function (event) {
        event.preventDefault();

        var searchInput = $("#city-text").val().trim();

        console.log(searchInput);

        if (searchInput === "") {
            return;
        }

        if (arr.indexOf(searchInput) === -1) {
            createCitylist(searchInput);
            arr.push(searchInput);
            localStorage.setItem("city", JSON.stringify(arr));
            // getCurrentConditions();
        }

        clearForm();
    })

    // Reset placeholder text in form
    function clearForm() {
        $("#city-text").each(function () {
            $(this).val("");
            x = 1;
        });
        $("#city-text").first().focus();

    }

    function createCitylist(name) {
        var id = 'btn' + name
        var li = $("<li >");
        var btn = $('<button />', {
            text: 'remove',
            id: id,
            click: function () {
                $(this).parent().hide();
                var localData = JSON.parse(localStorage.getItem("city"));
                if (localData) {
                    var data = localData.filter(city => city !== name);
                    localStorage.removeItem('city');
                    localStorage.setItem('city', JSON.stringify(data));
                }
            }
        });
        li.addClass("city-list-item");
        li.text(name).append(btn);
        $("#city-list").append(li);

        li.on("click", function (event) {
            event.preventDefault();
            name = $(this).text();
            console.log(name);
        });
    }

    function getCurrentConditions(response) {
        console.log(searchInput);
        getCurrentConditions();

    }

    var queryURL = " https://api.covidtracking.com/v1/us/current.json";

    $.ajax({
        type: "GET",
        url: queryURL,
        dataType: "JSON",
        success: function (response) {
            console.log(response);
        }
    });

    function getCurrentConditions(response) {

        $('#currentCity').empty();

        const card = $("<div>").addClass("card");
        const city = $("<h4>").addClass("card-title").text(response.name);
        const cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
        const positive = $("<p>").addClass("card-text current-positive").text("positive: ");
        const negitive = $("<p>").addClass("card-text current-negitive").text("negitive: ");
        const pending = $("<p>").addClass("card-text current-pending").text("pending: ");
        const death = $("<p>").addClass("card-text current-death").text("death: ");
        const recovered = $("<p>").addClass("card-text current-recovered").text("recovered: ");


        city.append(cityDate)
        card.append(city, positive, negitive, pending, death, recovered);
        $("#currentCity").append(card)

    }



    // var queryURL = "https://api.airvisual.com/v2/states?country=usa&key=bc4dec27-7130-4a22-88ca-f37ecbcfc5f9";
    // http://api.airvisual.com/v2/nearest_city?key=your_key

    // var queryURL = "https://api.airvisual.com/v2/nearest_city?key=bc4dec27-7130-4a22-88ca-f37ecbcfc5f9";
    // var queryURL = "https://api.weatherbit.io/v2.0/current/airquality?city=kansas city&postal_code=64106&country=US&key=e5f946832cc34874b9250ae7016416e0";

    // $.ajax({
    //     type: "GET",
    //     url: queryURL,
    //     dataType: "json",
    //     success: function (response) {
    //         console.log(response);

    //     }
    // });








});





// $(document).ready(function () {

//     var arr = JSON.parse(localStorage.getItem("city")) || [];

//         $("#search-city").on("click", function (event) {
//             event.preventDefault();
//             var searchInput = $("#city-text").val().trim();
//             console.log(searchInput);
//             if (arr.indexOf(searchInput) === -1) { 
//                 createCitylist(searchInput);
//                 arr.push(searchInput);
//                 localStorage.setItem("city", JSON.stringify(arr));
//             }

//         });

//     function createCitylist(name) { 
//         var id = 'btn' + name
//         var li = $("<li >");
//         var btn = $('<button />', {
//             text: 'remove',
//             id: id,
//             click: function () {
//                 $(this).parent().hide();
//                 var localData = JSON.parse(localStorage.getItem("city"));
//                 if (localData) {
//                     var data = localData.filter(city => city !== name);
//                     localStorage.removeItem('city');
//                     localStorage.setItem('city', JSON.stringify(data));
//                 }
//             }
//         });
//         li.addClass("city-list-item");
//         li.text(name).append(btn);
//         $("#city-list").append(li);
//     }



    // var queryURL = "https://api.airvisual.com/v2/states?country=usa&key=bc4dec27-7130-4a22-88ca-f37ecbcfc5f9";
    // http://api.airvisual.com/v2/nearest_city?key=your_key

    // var queryURL = "https://api.airvisual.com/v2/nearest_city?key=bc4dec27-7130-4a22-88ca-f37ecbcfc5f9";
    // var queryURL = "https://api.weatherbit.io/v2.0/current/airquality?city=kansas city&postal_code=64106&country=US&key=e5f946832cc34874b9250ae7016416e0";

    // $.ajax({
    //     type: "GET",
    //     url: queryURL,
    //     dataType: "json",
    //     success: function (response) {
    //         console.log(response);

    //     }
    // });








// });


