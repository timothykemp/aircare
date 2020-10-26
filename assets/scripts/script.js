
$(document).ready(function () {
   
    var arr = JSON.parse(localStorage.getItem("city")) || [];

        $("#search-city").on("click", function (event) {
            event.preventDefault();
            var searchInput = $("#city-text").val().trim();
            console.log(searchInput);
            if (arr.indexOf(searchInput) === -1) { 
                createCitylist(searchInput);
                arr.push(searchInput);
                localStorage.setItem("city", JSON.stringify(arr));
            }

        });
    
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

