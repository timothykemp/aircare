$(document).ready(function () {

    // City search using Google Maps API
    initializeGoogleMaps();

    function initializeGoogleMaps() {

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

    // Get stored data from localStorage and parse JSON strings to objects
    var storedCities = JSON.parse(localStorage.getItem("city")) || [];
    var storedStates = JSON.parse(localStorage.getItem("state")) || [];
    var state;
    var city;

    // If data is stored, display air quality metrics of most recent city
    if (storedCities.length > 0) {
        airQualityMetrics(storedCities[storedCities.length - 1], storedStates[storedStates.length - 1]);

        var cityData = JSON.parse(localStorage.getItem("city"));
        var stateData = JSON.parse(localStorage.getItem("state"));

        for (var i = 0; i < cityData.length; i++) {
            renderCities(cityData[i], stateData[i]);
        }
    }

    // If data is stored, display COVID-19 metrics of most recent state
    if (storedStates.length > 0) {
        covid19Metrics(storedStates[storedStates.length - 1]);
    }

    // Prevents user from searching null, pushes city and state to arrays
    $("#search-btn").click(function (event) {
        event.preventDefault();

        // This line grabs the input from the search box
        var cityState = $("#city-text").val().trim();

        // If form is empty, return early
        if (cityState === "") {
            return;
        }

        // Split cityState into city and state array
        var splitState = cityState.split(",");

        city = splitState[0].trim();
        state = splitState[1].trim();

        // Adding city from search box to array, get air and COVID-19 metrics
        if (storedCities.indexOf(cityState) === -1) {

            renderCities(city, state);

            localStorage.setItem("city", JSON.stringify(storedCities));
            localStorage.setItem("state", JSON.stringify(storedStates));

            airQualityMetrics(city, state);
            covid19Metrics(state);
        }

        // Calling function to reset search box to placeholder
        clearForm();

    });

    // Reset placeholder text in form
    function clearForm() {
        $("#city-text").each(function () {
            $(this).val("");
            x = 1;
        });
        $("#city-text").first().focus();
    }

    // Creates new list item for each search city with button to remove
    function renderCities(cityName, stateName) {
        var id = 'btn' + cityName
        var li = $("<li>");
        var btn = $('<button>', {
            id: id,

            // Logic to remove clicked city from site and local storage
            click: function () {
                $(this).parent().hide();
                var cityData = JSON.parse(localStorage.getItem("city"));
                var stateData = JSON.parse(localStorage.getItem("state"));

                if (cityData && stateData) {
                    var cData = cityData.filter(city => city !== cityName);
                    var sData = stateData.filter(state => state !== stateName);
                    var dataToRemove = ['city', 'state'];

                    dataToRemove.forEach(d =>
                        localStorage.removeItem(d));

                    localStorage.setItem('city', JSON.stringify(cData));
                    localStorage.setItem('state', JSON.stringify(sData));
                }

            }
        });

        btn.addClass("delete is-small is-pulled-right");
        li.addClass("city-list-item");
        li.text(cityName + ", " + stateName);
        li.append(btn);

        $("#city-list").append(li);

        // If city is clicked, change displayed metrics to that city
        li.on("click", function (event) {
            event.preventDefault();

            airQualityMetrics(cityName, stateName);
            covid19Metrics(stateName);

        });
    }

    // Get air quality metrics, clear existing, and build new data points
    function airQualityMetrics(cityName, stateName) {

        var queryURL = "https://api.weatherbit.io/v2.0/current/airquality?city=" + cityName + "&country=US&key=e5f946832cc34874b9250ae7016416e0";

        $.ajax({
            type: "GET",
            url: queryURL,
            dataType: "json",
            success: function (response) {
                console.log(response);

                $("#airHeader").empty();
                $("#airInfo1").empty();
                $("#airInfo2").empty();
                $("#airInfo3").empty();
                $("#airInfo4").empty();
                $("#airInfo5").empty();
                $("#airInfo6").empty();
                $("#airInfo7").empty();

                var airHeader = "Air Quality Metrics - " + cityName + ", " + stateName;
                var airInfo1 = response.data[0].co + " µg/m³";
                var airInfo2 = response.data[0].no2 + " µg/m³";
                var airInfo3 = response.data[0].o3 + " µg/m³";
                var airInfo4 = response.data[0].predominant_pollen_type;
                var airInfo5 = response.data[0].pollen_level_grass;
                var airInfo6 = response.data[0].pollen_level_tree;
                var airInfo7 = response.data[0].pollen_level_weed;

                $("#airHeader").append(airHeader);
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

    // Get COVID-19 metrics, clear existing, and build new data points
    function covid19Metrics(stateName) {

        var queryURL = "https://api.covidtracking.com/v1/states/" + stateName + "/current.json"

        $.ajax({
            type: "GET",
            url: queryURL,
            dataType: "JSON",
            success: function (response) {
                console.log(response);

                $("#covidHeader").text("COVID-19 Metrics of " + stateName);
                $(".covidInfo1").text("Positve: " + response.positive);
                $(".covidInfo2").text("Negative: " + response.negative);
                $(".covidInfo3").text("Hospitalized: " + response.hospitalized);
                $(".covidInfo4").text("Death: " + response.death);
                $(".covidInfo5").text("Recovered: " + response.recovered);
                $(".covidInfo6").text("Total COVID Case: " + response.total);

            }
        });
    }

});