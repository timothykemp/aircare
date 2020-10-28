$(document).ready(function () {
    
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

    // Listens for page load and initializes Google Maps
    google.maps.event.addDomListener(window, 'load', initialize);

    // Initialize array of cities 
    var cities = [];

    init();

    // Retrieve cities from local storage 
    function init() {

        // Get stored cities from localStorage and parse JSON string to object
        var storedCities = JSON.parse(localStorage.getItem("cities"));

        // If cities were retrieved from localStorage, update the cities array to it
        if (storedCities !== null) {
            cities = storedCities;
        }

        // Render cities to the DOM
        renderCities();
    }

    // Prevents user from submitting null and pushes city name to cities array
    $("#search-city").click(function (event) {
        event.preventDefault();

        // This line grabs the input from the search box
        var city = $("#city-text").val().trim();

        console.log('city :>> ', city);

        // If form is empty, return early
        if (city === "") {
            return;
        }

        if (cities.indexOf(city) === -1) {
            // Adding the city from the search box to our array
            cities.push(city);

            // Calling storeCities and renderCities which handle the processing of our cities array
            storeCities();
            renderCities(city);
        }

        // Calling function to reset search box to placeholder
        clearForm();

    });

    // Function for displaying cities list
    function renderCities() {

        // Deleting the cities prior to adding new cities
        // (this is necessary otherwise you will have repeat cities)
        $("#city-list").empty();

        // Looping through the array of cities
        for (var i = 0; i < cities.length; i++) {

            // Then dynamically generating <li> for each city in the array
            var cityName = $("<li>");
            // Adding a class of city-list-item to our list item
            cityName.addClass("city-list-item");
            // Providing the list item text
            cityName.text(cities[i]);

            // Creating button to add to list item
            var removeBtn = $("<button>");
            // Adding class of city-remove-button to button
            removeBtn.addClass("city-remove-button delete is-small is-pulled-right");

            // Appending button to list item
            cityName.append(removeBtn);
            // Adding the list item to the city list div
            $("#city-list").prepend(cityName);
        }

        var currentCity = cities[cities.length - 1];

        airQualityMetrics(currentCity);

       /*  $(".city-remove-button").click(function (event) {
            event.preventDefault;
            cityClick = $(this).parent().text();

            console.log('cityClick :>> ', cityClick);

            citiesEl = window.localStorage.key("cities");

            console.log('citiesEl :>> ', citiesEl);

            //localStorage.removeItem(cityClick);
            /* $(this).parent().hide();

            var getCities = JSON.parse(localStorage.getItem("cities"));
            if (getCities) {
                var data = getCities.filter(cities => cities !== cityClick);

                localStorage.setItem("cities", JSON.stringify(data));
            } 
        }); */

        // Change metrics to city name on click
        $(".city-list-item").click(function (event) {
            event.preventDefault;
            cityClick = $(this).text();
            airQualityMetrics(cityClick);
        });




    }

    // Store cities
    function storeCities() {
        // Stringify and set "cities" key in localStorage to cities array
        localStorage.setItem("cities", JSON.stringify(cities));
    }

    // Reset placeholder text in form
    function clearForm() {
        $("#city-text").each(function () {
            $(this).val("");
            x = 1;
        });
        $("#city-text").first().focus();

    }

    // Get air quality metrics, clear existing, and build new data points
    function airQualityMetrics(searchCity) {
       
        var queryURL = "https://api.weatherbit.io/v2.0/current/airquality?city=" + searchCity + "&country=US&key=e5f946832cc34874b9250ae7016416e0";

        $.ajax({
            type: "GET",
            url: queryURL,
            dataType: "json",
            success: function (response) {
                console.log(response);

                $("#airInfo1").empty();
                $("#airInfo2").empty();
                $("#airInfo3").empty();
                $("#airInfo4").empty();
                $("#airInfo5").empty();
                $("#airInfo6").empty();
                $("#airInfo7").empty();

                var airInfo1 = response.data[0].co + " µg/m³";
                var airInfo2 = response.data[0].no2 + " µg/m³";
                var airInfo3 = response.data[0].o3 + " µg/m³";
                var airInfo4 = response.data[0].predominant_pollen_type;
                var airInfo5 = response.data[0].pollen_level_grass;
                var airInfo6 = response.data[0].pollen_level_tree;
                var airInfo7 = response.data[0].pollen_level_weed;

                $("#airInfo1").append(airInfo1);
                $("#airInfo2").append(airInfo2);
                $("#airInfo3").append(airInfo3);
                $("#airInfo4").append(airInfo4);
                $("#airInfo5").append(airInfo5);
                $("#airInfo6").append(airInfo6);
                $("#airInfo7").append(airInfo7);
            }
        });

    }
    
    });







    /*     // Creates new list item for each search city with button to remove
        function createCityList(name) {
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
    
            });
        }
     */

