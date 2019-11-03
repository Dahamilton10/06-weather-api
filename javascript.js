var lat = "";
var lon = "";




$.ajax({
    type: "GET",
    url: "https://api.openweathermap.org/data/2.5/weather?" +
        "q=Portsmouth,us&appid=064e9a1e286f6e51c5c7c7dd2f6fc716&units=imperial",
    success: function (response) {
        console.log(response);
        lat = response.coord.lat;
        lon = response.coord.lon;
        console.log(lat, lon);
        var city = response.name;
        var temp = response.main.temp;
        var humidity = response.main.humidity;
        var wind = response.wind.speed;
        $("#current-city").text([city]);
        $("#current-temp").text("Temperature: " + [temp] + " °F");
        $("#current-humidity").text("Humidity: " + [humidity] + "%");
        $("#current-wind-speed").text("Wind speed: " + [wind] + " MPH");
    }
});

$("#search-button").click(function () {
    var cityQuery = $(".inputQuery").val();
    $.ajax({
        type: "GET",
        url: `https://api.openweathermap.org/data/2.5/weather?q=${cityQuery},us&appid=064e9a1e286f6e51c5c7c7dd2f6fc716&units=imperial`,
        success: function (response) {
            console.log(response);
            var newCard = $("<li>");
            newCard.data("city", cityQuery);
            newCard.text([cityQuery]);
            newCard.addClass("list-group-item");
            $("#search-list").append(newCard);
            lat = response.coord.lat;
            lon = response.coord.lon;
            console.log(lat, lon);
            var city = response.name;
            var temp = response.main.temp;
            var humidity = response.main.humidity;
            var wind = response.wind.speed;
            $("#current-city").text([city]);
            $("#current-temp").text("Temperature: " + [temp] + " °F");
            $("#current-humidity").text("Humidity: " + [humidity] + "%");
            $("#current-wind-speed").text("Wind speed: " + [wind] + " MPH");
        }
    });
});