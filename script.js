function getUnit() {
    let isChecked = document.getElementById("switchValue").checked;
    return isChecked
}

let lastCity = "Washington D.C."

let weather = {
    "apiKey": "b66ff9824239561c2a5cd92cf2ecfe38",
    fetchWeather: function(city) {
        getUnit();
        if (getUnit() === false) {
            fetch(
                "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + this.apiKey
            )
                .then(function(response) {
                    if (!response.ok) {
                        alert("Sorry, that location could not be found.");
                    }
                    else {
                        lastCity = city
                        return response.json()
                    }
                })
                .then(function(data) {
                    weather.displayWeather(data);
                })
        }
        else {
            fetch(
                "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey
            )
                .then(function(response) {
                    if (!response.ok) {
                        alert("Sorry, that location could not be found.");
                    }
                    else {
                        lastCity = city
                        return response.json()
                    }
                })
                .then(function(data) {
                    weather.displayWeather(data);
                })
        }
    },
    displayWeather: function(data) {
        const {name} = data;
        const {icon, description} = data.weather[0];
        const {temp, humidity} = data.main;
        const {speed} = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".description").innerText = description;
        if (getUnit() === false) {
            document.querySelector(".temp").innerText = temp + "°F";
        }
        else {
            document.querySelector(".temp").innerText = temp + "°C";
        }
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        if (getUnit() === false) {
            document.querySelector(".wind").innerText = "Wind Speed: " + speed + " mph";
        }
        else {
            document.querySelector(".wind").innerText = "Wind Speed: " + speed + " m/s";
        }
        document.querySelector(".weather").classList.remove("loading")
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "-nature')"
    },
    search: function() {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector("button").addEventListener("click", function() {
    if (document.querySelector(".search-bar").value.length === 0) {
        weather.fetchWeather(lastCity);
    }
    else {
        weather.search();
    }
});

document.querySelector(".search-bar").addEventListener("keyup", function(event) {
    if (event.key == "Enter") {
        if (document.querySelector(".search-bar").value.length === 0) {
            weather.fetchWeather(lastCity);
        }
        else {
            weather.search();
        }
    }
});

document.querySelector("#switchValue").addEventListener("click", function() {
    if (document.querySelector(".search-bar").value.length === 0) {
        weather.fetchWeather(lastCity);
    }
    else {
        weather.search();
    }

    let content = document.querySelector(".switch").title
    if (content == "Units (Imperial):") {
        document.querySelector(".switch").title = "Units (Metric):";
    }
    else {
        document.querySelector(".switch").title = "Units (Imperial):";
    }
});

weather.fetchWeather("Washington D.C.");