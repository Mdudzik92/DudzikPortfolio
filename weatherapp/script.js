var city = $("#cityChoice").val();
var key = "&appid=8439103e642ad3d44f7bafaa0e94e84f";

$("#searchButton").on("click", function () {city = $("#cityChoice").val();
	$("#cityChoice").val("");
	$.ajax({url:"https://api.openweathermap.org/data/2.5/weather?q= " + city + "&units=imperial" + key, type: "GET"}).then(function (data) {
		console.log(data);
		listCities();
		searchWeather(data);
		searchForecast(data);
	});
});

function listCities() {
	var listItem = $("<li>").addClass("list-group-item").text(city);
	$(".list").append(listItem);
}

function searchWeather(data) {
	var date = new Date();
	$("#citySearch").empty();
	var card = $("<div>").addClass("card");
	var cardBody = $("<div>").addClass("card-body");
	var city = $("<h4>").addClass("card-title").text(data.name);
	console.log(data.name);
	const cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString("en-US"));
	var image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
	console.log(data.weather[0].icon);
	var temp = $("<p>").addClass("card-text current-temp").text("Temperature: " + data.main.temp + " °F ");
	var humidity = $("<p>").addClass("card-text current-humidity").text(" Humidity: " + data.main.humidity + "%");
	console.log(data.main.humidity);
	var windSpeed = $("<p>").addClass("card-text current-wind-speed").text(" Wind Speed : " + data.wind.speed + "MPH");
	console.log(data.wind.speed);
	(lat = data.coord.lat), (lon = data.coord.lon);
	$.ajax({
		url:"https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + key, method: "GET"}).then(function (data) {console.log(data.value);
		var uvIndex = $("<p>").addClass("card-text current-uv").text(" UV index : " + data.value);
		city.append(cityDate, image); 
		cardBody.append(city, temp, humidity, windSpeed, uvIndex);
		card.append(cardBody);
		$("#citySearch").append(card)});
}

function searchForecast() {
	$.ajax({url:"https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial" + key, method: "GET"}).then(function (data) {console.log(data.list);
		var date = new Date();
		$("#forecast").empty();
		for (var i = 0; i < data.list.length; i++) {
			if (data.list[i].dt_txt.indexOf("12:00:00") !== -1) {
				var card = $("<div>").addClass("card col-md-2 ml-4 bg-dark text-white");
				var cardBody = $("<div>").addClass("card-body p-3 forecastBody");
				var cityDate = $("<h4>").addClass("card-title").text(moment(data.list[i].dt, "X").format("MMM Do"));
				var temp = $("<p>").addClass("card-text forecastTemp").text("Temp: " + data.list[i].main.temp + "°F ");
				var humidity = $("<p>").addClass("card-text forecastHumidity").text("Humidity: " + data.list[i].main.humidity + "%");
				var image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png");
				cardBody.append(cityDate, image, temp, humidity);
				card.append(cardBody);
				$("#forecast").append(card);
			}
		}
	});
}
