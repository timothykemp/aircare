$(document).ready(function () {

    var arr = JSON.parse(localStorage.getItem("city")) || [];


    if (arr.length > 0) {
        airqualityMetrics(arr[arr.length - 1]);
        arr.forEach(name => {
            createCitylist(name);
        })
    }
    var state = "";
    $("#search-form").on("submit", function (event) {
        event.preventDefault();

        var searchInput = $("#city-text").val().trim();

        console.log(searchInput);
        var fullsearch = $("#city-text").val().trim();
        state = fullsearch.split(",");
        state = state[1].trim();
        console.log(state[1].trim());

        if (searchInput === "") {
            return;
        }

        if (arr.indexOf(searchInput) === -1) {
            createCitylist(searchInput);
            arr.push(searchInput);
            localStorage.setItem("city", JSON.stringify(arr));

            airqualityMetrics(searchInput);
            covid19Metrics(state);
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

    // Creates new list item for each search city with button to remove
    function createCitylist(name) {
        var id = 'btn' + name
        var li = $("<li>");
        var btn = $('<button>', {
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

        btn.addClass("delete is-small is-pulled-right");
        li.addClass("city-list-item");
        li.text(name + " ");
        li.append(btn);

        $("#city-list").append(li);

        li.on("click", function (event) {
            event.preventDefault();
            airqualityMetrics(name);
            covid19Metrics(state);

        });
    }


    function airqualityMetrics(cityName) {

        // var queryURL = "https://api.airvisual.com/v2/city?city=" + cityName+"&state=new york&country=usa&key=bc4dec27-7130-4a22-88ca-f37ecbcfc5f9";
        var queryURL = "https://api.weatherbit.io/v2.0/current/airquality?city=" + cityName + "&country=US&key=e5f946832cc34874b9250ae7016416e0";

        $.ajax({
            type: "GET",
            url: queryURL,
            dataType: "json",
            success: function (response) {
                console.log(response);

                $(".airInfo1").text("Carbon Monoxide (CO) : " + response.data[0].co);
                $(".airInfo2").text("Nitrogen Dioxide (NO2) : " + response.data[0].no2);
                $(".airInfo3").text("Ozone (O3) : " + response.data[0].o3);
                $(".airInfo4").text("Pollen Type: " + response.data[0].predominant_pollen_type);
                $(".airInfo5").text(response.data[0].predominant_pollen_type + " Level: " + response.data[0].mold_level);
                $(".airInfo6").text("Pollen Level Grass: " + response.data[0].pollen_level_grass);
                $(".airInfo7").text("Pollen Level Tree: " + response.data[0].pollen_level_tree);
                $(".airInfo8").text("Pollen Level Weed: " + response.data[0].pollen_level_weed);
            }
        });

    }
 
    
    function covid19Metrics(stateName) {
      
        // var queryURL = " https://api.covidtracking.com/v1/states/ca/current.json" + stateName;
        var queryURL = "https://api.covidtracking.com/v1/states/" + stateName +"/current.json"

        $.ajax({
            type: "GET",
            url: queryURL,
            dataType: "JSON",
            success: function (response) {
                console.log(response);
                $(".covidInfo1").text("positve: " + response.positive);
                $(".covidInfo2").text("negitive: " + response.negative);
                $(".covidInfo3").text("hospitalized: " + response.hospitalized);
                $(".covidInfo4").text("death: " + response.death);
                $(".covidInfo5").text("recovered: " + response.recovered);
            }
        });
    } 

    // City search using Google Maps API
    function initialize() {

        var options = {
            types: ['(cities)'],
            componentRestrictions: { country: "us" }
        };

        var input = document.getElementById('city-text');
        var autocomplete = new google.maps.places.Autocomplete(input, options);

        google.maps.event.addListener(autocomplete, 'place_changed', function () {
            var place = autocomplete.getPlace();

        });
    }

    google.maps.event.addDomListener(window, 'load', initialize);

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



    
    

// });
