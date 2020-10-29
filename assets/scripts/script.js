$(document).ready(function () {

    var arr = JSON.parse(localStorage.getItem("city")) || [];
    var arrState = JSON.parse(localStorage.getItem("state")) || [];
    var state ;
    var city ;
    if (arr.length > 0) {
        airqualityMetrics(arr[arr.length - 1], arrState[arrState.length - 1]);
        var cData = JSON.parse(localStorage.getItem("city"));
        var sData = JSON.parse(localStorage.getItem("state"));
        for (var i = 0; i < cData.length; i++) { 
            createCitylist(cData[i],sData[i]); 
        }

    }
    if (arrState.length > 0) { 
        covid19Metrics(arrState[arrState.length-1]);
    }
    
    $("#search-form").on("submit", function (event) {
        event.preventDefault();

        var searchInput = $("#city-text").val().trim();
        console.log(searchInput);

        var fullsearch = $("#city-text").val().trim();
        var splitstate = fullsearch.split(",");
        
        city = splitstate[0].trim();
        state = splitstate[1].trim();

        console.log(state.trim());
        console.log(city.trim());
        
        if (searchInput === "") {
            return;
        }

        if (arr.indexOf(searchInput) === -1) {
            createCitylist(city,state);
            arr.push(city);
            arrState.push(state);
            localStorage.setItem("city", JSON.stringify(arr));
            localStorage.setItem("state", JSON.stringify(arrState));
            airqualityMetrics(city,state);
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
    function createCitylist(name,statename) {
        var id = 'btn' + name
        var li = $("<li>");
        var btn = $('<button>', {
            id: id,
            click: function () {
                $(this).parent().hide();
                var localData = JSON.parse(localStorage.getItem("city"));
                var stateData = JSON.parse(localStorage.getItem("state"));
                if (localData && stateData) {
                    var data = localData.filter(city => city !== name);       
                    var stdata = stateData.filter(state => state !== statename);
                    var dataToRemove = ['city', 'state'];
                    
                    dataToRemove.forEach(d =>
                        localStorage.removeItem(d));
                    
                    localStorage.setItem('city', JSON.stringify(data));
                    localStorage.setItem('state', JSON.stringify(stdata));
                }
                
            }
        });

        btn.addClass("delete is-small is-pulled-right");
        li.addClass("city-list-item");
        li.text(name + "," + statename);
        li.append(btn);

        $("#city-list").append(li);
        console.log(name);
        console.log(statename);
        li.on("click", function (event) {
            event.preventDefault();
         
            airqualityMetrics(name, statename);
            covid19Metrics(statename);

        });
    }


    function airqualityMetrics(cityName,statename) {
        // var queryURL = "https://api.airvisual.com/v2/city?city=" + cityName+"&state=new york&country=usa&key=bc4dec27-7130-4a22-88ca-f37ecbcfc5f9";
        var queryURL = "https://api.weatherbit.io/v2.0/current/airquality?city=" + cityName + "," + statename +"&country=US&key=e5f946832cc34874b9250ae7016416e0";

        $.ajax({
            type: "GET",
            url: queryURL,
            dataType: "json",
            success: function (response) {
                console.log(response);
                
                $("#airHeader").text("Air Quality Metrics of " + cityName + ", " + statename);
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
                var nf = new Intl.NumberFormat();
                console.log(nf.format(response.positive));


                $("#covidHeader").text("COVID-19 Metrics of " + stateName);
                $(".covidInfo1").text("Positve: " + nf.format(response.positive));
                $(".covidInfo2").text("Negative: " + nf.format(response.negative));
                $(".covidInfo3").text("Hospitalized: " + nf.format(response.hospitalized));
                $(".covidInfo4").text("Death: " + nf.format(response.death));
                $(".covidInfo5").text("Recovered: " + nf.format(response.recovered));
                $(".covidInfo6").text("Total COVID Case: " + nf.format(response.total));
               
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
