



$.ajax({
    type: "GET",
    url: "https://api.openweathermap.org/data/2.5/weather?" +
    "q=Portsmouth,us&appid=064e9a1e286f6e51c5c7c7dd2f6fc716",
    success: function (response) {
        console.log(response);
    }
});