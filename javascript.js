var priorSearches = [];
console.log(priorSearches);
if (localStorage.priorSearches) {
    // I was having some issues with local storage so I had to go back and dig through the internet to get this to work
    // I had this and the stringify on multiple lines and I think that had something to do with h=why it wasnt working before
    // source          https://stackoverflow.com/questions/3357553/how-do-i-store-an-array-in-localstorage
    // I already understood what each part does and why you need to do it, I was just stuck on syntax
    priorSearches = JSON.parse(localStorage.getItem("priorSearches"));
    console.log(priorSearches);
    for (var i = 0; i < priorSearches.length; i++) {
        var newCard = $("<li>");
        newCard.attr("data-city", priorSearches[i]);
        newCard.text([priorSearches[i]]);
        newCard.addClass("list-group-item");
        newCard.attr("id", "history");
        $("#search-list").append(newCard);
    }
};

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
        card.attr("class", "inline card");

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
    $(".card").remove();
    $.ajax({
        type: "GET",
        url: `https://api.openweathermap.org/data/2.5/forecast?q=${cityQuery},us&appid=064e9a1e286f6e51c5c7c7dd2f6fc716&units=imperial&cnt=37`,
        success: function (response) {
            console.log(response);
            // Setting local storage
            console.log(priorSearches);
            priorSearches.push(cityQuery);
            console.log(priorSearches);
            localStorage.setItem("priorSearches", JSON.stringify(priorSearches));
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
            card.attr("class", "inline card");

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
    $(".card").remove();
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

            var card = $("<div class='card'>");
            card.attr("class", "inline card");

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


