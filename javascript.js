$.ajax({
    type: "GET",
    url: "https://api.openweathermap.org/data/2.5/forecast?q=Hooksett,us&appid=064e9a1e286f6e51c5c7c7dd2f6fc716&units=imperial&cnt=37",
    success: function (response) {
        console.log(response);
        // Creating the current weather
        var city = response.city.name;
        var temp = response.list[0].main.temp;
        var humidity = response.list[0].main.humidity;
        var wind = response.list[0].wind.speed;
        $("#current-city").text([city]);
        $("#current-temp").text("Temperature: " + [temp] + " °F");
        $("#current-humidity").text("Humidity: " + [humidity] + "%");
        $("#current-wind-speed").text("Wind speed: " + [wind] + " MPH");
        // Creating the 5 day weather forecast

        var card = $("<div class='card'>")
        card.attr("class", "inline");

        for (var x = 0; x < 4; x++) {
            var i = x * 8 + 5;
            var dayDiv = $("<div>");
            var dayDate = $("<h4>");
            var dayIconDiv = $("<img>");
            dayIcon = response.list[i].weather[0].icon;
            var dayTemp = $("<p>");
            var dayHumidity = $("<p>");
            dayDiv.attr("class", "bg-primary text-white col-md-3 border rounded inline");
            dayDate.text(response.list[i].dt_txt);
            dayIconDiv.attr("src", `http://openweathermap.org/img/wn/${dayIcon}@2x.png`);
            dayTemp.text("Temperature: " + [response.list[i].main.temp] + " °F");
            dayHumidity.text("Humidity: " + [response.list[i].main.humidity] + "%");
            dayDiv.append(dayDate, dayIconDiv, dayTemp, dayHumidity);
            card.append(dayDiv);
        };

        $("#five-day-forecast").append(card);
    }
});

$("#search-button").click(function () {
    cityQuery = $(".inputQuery").val();
    $.ajax({
        type: "GET",
        url: `https://api.openweathermap.org/data/2.5/forecast?q=${cityQuery},us&appid=064e9a1e286f6e51c5c7c7dd2f6fc716&units=imperial&cnt=37`,
        success: function (response) {
            console.log(response);
            // creating the input into an li in the history
            var newCard = $("<li>");
            newCard.attr("data-city", cityQuery);
            newCard.text([cityQuery]);
            newCard.addClass("list-group-item");
            newCard.attr("id", "history");
            $("#search-list").append(newCard);
            // pulling info from the responce and putting it on the page
            lat = response.city.coord.lat;
            lon = response.city.coord.lon;
            console.log(lat, lon);
            var city = response.city.name;
            var temp = response.list[0].main.temp;
            var humidity = response.list[0].main.humidity;
            var wind = response.list[0].wind.speed;
            $("#current-city").text([city]);
            $("#current-temp").text("Temperature: " + [temp] + " °F");
            $("#current-humidity").text("Humidity: " + [humidity] + "%");
            $("#current-wind-speed").text("Wind speed: " + [wind] + " MPH");
            // Creating the 5 day weather forecast

            var card = $("<div class='card'>")
            card.attr("class", "inline");

            for (var x = 0; x < 4; x++) {
                var i = x * 8 + 5;
                var dayDiv = $("<div>");
                var dayDate = $("<h4>");
                var dayIconDiv = $("<img>");
                dayIcon = response.list[i].weather[0].icon;
                var dayTemp = $("<p>");
                var dayHumidity = $("<p>");
                dayDiv.attr("class", "bg-primary text-white col-md-3 border rounded inline");
                dayDate.text(response.list[i].dt_txt);
                dayIconDiv.attr("src", `http://openweathermap.org/img/wn/${dayIcon}@2x.png`);
                dayTemp.text("Temperature: " + [response.list[i].main.temp] + " °F");
                dayHumidity.text("Humidity: " + [response.list[i].main.humidity] + "%");
                dayDiv.append(dayDate, dayIconDiv, dayTemp, dayHumidity);
                card.append(dayDiv);
            };

            $("#five-day-forecast").append(card);
        }
    });
});

$(document).on("click", "#history", function () {
    console.log(this);
    cityQuery = $(this).data("city");
    console.log(cityQuery);
    $.ajax({
        type: "GET",
        url: `https://api.openweathermap.org/data/2.5/forecast?q=${cityQuery},us&appid=064e9a1e286f6e51c5c7c7dd2f6fc716&units=imperial&cnt=37`,
        success: function (response) {
            console.log(response);
            $(".five-day-forecast").innerHTML = "";
            // pulling info from the responce and putting it on the page
            lat = response.city.coord.lat;
            lon = response.city.coord.lon;
            console.log(lat, lon);
            var city = response.city.name;
            var temp = response.list[0].main.temp;
            var humidity = response.list[0].main.humidity;
            var wind = response.list[0].wind.speed;
            $("#current-city").text([city]);
            $("#current-temp").text("Temperature: " + [temp] + " °F");
            $("#current-humidity").text("Humidity: " + [humidity] + "%");
            $("#current-wind-speed").text("Wind speed: " + [wind] + " MPH");
            // Creating the 5 day weather forecast

            var card = $("<div class='card'>")
            card.attr("class", "inline");

            for (var x = 0; x < 4; x++) {
                var i = x * 8 + 5;
                var dayDiv = $("<div>");
                var dayDate = $("<h4>");
                var dayIconDiv = $("<img>");
                dayIcon = response.list[i].weather[0].icon;
                var dayTemp = $("<p>");
                var dayHumidity = $("<p>");
                dayDiv.attr("class", "bg-primary text-white col-md-3 border rounded inline");
                dayDate.text(response.list[i].dt_txt);
                dayIconDiv.attr("src", `http://openweathermap.org/img/wn/${dayIcon}@2x.png`);
                dayTemp.text("Temperature: " + [response.list[i].main.temp] + " °F");
                dayHumidity.text("Humidity: " + [response.list[i].main.humidity] + "%");
                dayDiv.append(dayDate, dayIconDiv, dayTemp, dayHumidity);
                card.append(dayDiv);
            };

            $("#five-day-forecast").append(card);
        }
    });
})


