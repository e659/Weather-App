//Today's Card Variables:
let today = document.getElementById("today");
todayDate = document.getElementById("today-date"),
    cityLocation = document.getElementById("location"),
    todayDegree = document.getElementById("today-degree"),
    todayIcon = document.getElementById("today-icon"),
    description = document.getElementById("today-description"),
    humidty = document.getElementById("humidty"),
    wind = document.getElementById("wind"),
    compass = document.getElementById("compass"),
    searchBar = document.getElementById("search-bar");

//Next Days Variables:
let nextDay = document.getElementsByClassName("nextDay"),
    nextDayIcon = document.getElementsByClassName("nextDay-icon"),
    maxDegree = document.getElementsByClassName("max-degree"),
    minDegree = document.getElementsByClassName("min-degree"),
    nextDayDescription = document.getElementsByClassName("nextDay-description");
//-------------------------------------------------------------------------------------
let monthName = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Spet', 'Oct', 'Nov', 'Dec'];
let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
let apiResponse;
let weatherData;
// get data from Api
async function getWeatherData(currentCity = 'cairo') {
    apiResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=572e08fb1d7547f58d8151525211205&q=${currentCity}&days=3`);
    weatherData = await apiResponse.json();
    console.log(weatherData)
    displayTodayWeather();
    displayNextDayWeather()
}
getWeatherData("cairo");
let date = new Date();

function displayTodayWeather() {
    today.innerHTML = `${days[date.getDay()]}`;
    todayDate.innerHTML = `${date.getDate()} ${monthName[date.getMonth()]}`;
    cityLocation.innerHTML = weatherData.location.name;
    todayDegree.innerHTML = weatherData.current.temp_c;
    todayIcon.setAttribute("src", `https:${weatherData.current.condition.icon}`);
    description.innerHTML = weatherData.current.condition.text;
    humidty.innerHTML = weatherData.current.humidity;
    wind.innerHTML = weatherData.current.wind_kph;
    compass.innerHTML = weatherData.current.wind_dir;

}
//nextDay
function displayNextDayWeather() {
    for (var i = 0; i < nextDay.length; i++) {
        nextDay[i].innerHTML = days[new Date(weatherData.forecast.forecastday[i + 1].date).getDay()];
        nextDayIcon[i].setAttribute('src', `https:${weatherData.forecast.forecastday[i+1].day.condition.icon}`)
        maxDegree[i].innerHTML = weatherData.forecast.forecastday[i + 1].day.maxtemp_c;
        minDegree[i].innerHTML = weatherData.forecast.forecastday[i + 1].day.mintemp_c;
        nextDayDescription[i].innerHTML = weatherData.forecast.forecastday[i + 1].day.condition.text;
    }
}
//--------------------------------------------------------
//search
searchBar.addEventListener("keyup", function() {
        currentCity = searchBar.value;
        getWeatherData(currentCity);
    })
    //--------------------------------------------
$(window).scroll(function() {
    let topOffset = $(window).scrollTop();
    let aboutOffset = $("#About").offset().top;
    if (topOffset > aboutOffset) {
        $("nav").css({ "backgroundColor": "rgba(49, 153, 171, 0.575)", "transition": "all .3s" });

    } else {
        $("nav").css("backgroundColor", "white");

    }
})