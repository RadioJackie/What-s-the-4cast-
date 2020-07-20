

let cities = [""];

function displayWeatherInfo(city) {
    let APIKey = '554f896fa7e371698189deb9b4b589d9';//Tested key. Still working

    let queryCurrentURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + APIKey;
    let queryForecastURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + APIKey;

    //Request and response for current temperature, humidity and wind speed.
    $.ajax({
        url: queryCurrentURL,
        method: "GET"
    }).then(function (response) {
        let dataDiv = $("#data");
        dataDiv.html("<h1>" + response.name + ' (' + moment().format('M/D/YYYY') + ')' + "<img src='http://openweathermap.org/img/wn/" + response.weather[0].icon + ".png'>" + "</h1>");
        dataDiv.append("<p>Wind Speed: " + response.wind.speed + "</p>");
        dataDiv.append("<p>Humidity: " + response.main.humidity + "</p>");
        dataDiv.append("<p>Temperature: " + response.main.temp + ' F</p>');

        let lon = response.coord.lon;
        let lat = response.coord.lat;
        let queryUVUrl = 'https://api.openweathermap.org/data/2.5/uvi?appid=' + APIKey + '&lat=' + lat + '&lon=' + lon;

        // Request and response for uv index data
        $.ajax({
            url: queryUVUrl,
            method: "GET"
        }).then(function (response) {
            dataDiv.append("<p>UV Index: " + response.value + "</p>");
        });
        
        // Request and response for 5day forecast
        $.ajax({
            url: queryForecastURL,
            method: "GET"
        }).then(function (response) {
            for (let i = 6; i < response.list.length; i += 8) {

                let day = $("#day");
                day.prepend('<h4>' + response.list[i].dt_txt + '</h4>');
                day.prepend("<img src='http://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + ".png'>");
                day.prepend('<p>Temp: ' + response.list[i].main.temp + " F</p>");
                day.prepend('<p>Humidity: ' + response.list[i].main.humidity + ' %</p>');


            };
        });


    });


};


//Function for the render button
function renderButtons(city) {
    //$(".citiesDump").empty();

    let btn = $("<button>");//Dynamically adding the button

    btn.addClass("city-btn");//Adding a class to the button

    btn.attr("data-name", city);//Adding a data-attribute

    btn.text(city);//Adding text to the button

    $(".citiesDump").append(btn);//Inserts the button to the page

};


//When the search button is pressed this functions will be executed 
let searchBtn = $('#searchBtn');

searchBtn.on("click", function (event) {//the on click function
    event.preventDefault();//So the form does not refresh the page

    let city = $("#cityInput").val();//Get the input value from the user

    cities.push(city);//Push the value, aka city, into the array.

    renderButtons(city);//Execute the render button function with the value passed in

    displayWeatherInfo(city);//Execute the display info function with the value passed in
});

//Function to attach the data to the added city button
$(document).on("click", ".city-btn", function () {
    let city = $(this).attr("data-name");
    displayWeatherInfo(city);
});