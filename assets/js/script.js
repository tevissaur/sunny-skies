// Element Selections
let searchButton = document.getElementById('search')
let cloud = function () {
    let cloud = document.createElement('div')
    cloud.classList.add('cloud', 'float')
    return cloud
}
let sun = function () {
    let sun = document.createElement('div')
    sun.classList.add('sun')
    return sun
}
let citiesDataList = document.getElementById('cities')
let searchInput = document.getElementById('city-input')
let todaysWeather = document.getElementById('todays-weather')



let searchHistory = function(pastSearches) {
    let searchHistoryButton = document.createElement('button')
    searchHistoryButton.classList.add('btn', 'btn-secondary')
    for (let i in JSON.parse(sessionStorage.getItem()))
    return searchHistoryButton
}

// API Url and Key
let baseUrl = 'https://api.openweathermap.org/data/2.5/onecall'
let APIkey = '99614a3bd71c4f4912965f0c6b55b111'


// City names w lat and lon data 
let cities
// Fetching JSON file
fetch('./assets/py_scripts/cities.json')
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        cities = data
        for (let i in cities) {
            let optionsElem = document.createElement('option')
            optionsElem.setAttribute('value', i)
            citiesDataList.appendChild(optionsElem)
        }
    })


// Generates the weather card for today's weather
function createWeatherCard(city, temp, wind, humidity, UVindex, weather) {
    let paramsArray = [temp, wind, humidity, UVindex, weather]
    let weatherCard = document.createElement('div')
    weatherCard.classList.add('card', 'my-5', 'm-auto', 'w-75')
    let cardHeader = document.createElement('div')
    cardHeader.classList.add('card-header')
    let cardTitle = document.createElement('h3')
    cardTitle.classList.add('card-title')
    cardTitle.textContent = city
    cardHeader.appendChild(cardTitle)
    // Will create animated weather illustrations
        // cardHeader.appendChild(sun())
        // cardHeader.appendChild(cloud())
    weatherCard.appendChild(cardHeader)
    let cardList = document.createElement('ul')
    cardList.classList.add('list-group', 'list-group-flush')
    for (let i in paramsArray) {
        let listItem = document.createElement('li')
        listItem.classList.add('list-group-item')
        listItem.style.textTransform = 'capitalize'
        if (paramsArray[i] === temp) {
            listItem.innerHTML = 'Temp: ' + paramsArray[i] + '&#176; F'
        }else if (paramsArray[i] === wind) {
            listItem.innerHTML = 'Wind Speed: ' + paramsArray[i] + ' MPH'
        }else if (paramsArray[i] === humidity) {
            listItem.innerHTML = 'Humidity: ' + paramsArray[i] + '%'
        }else if (paramsArray[i] === UVindex) {
            listItem.innerHTML = 'UV Index: ' + paramsArray[i] + ' of 10'
        }else if (paramsArray[i] === weather) {
            listItem.innerHTML = 'Sky Conditions: ' + paramsArray[i]
        }
        cardList.appendChild(listItem)
    }
    weatherCard.appendChild(cardList)
    todaysWeather.appendChild(weatherCard)
}
function createForecastCards(forecastData) {

}
// TO CONVERT UNIX EPOCH TO MS  =>  timeInS * 1000

// Sends request
// // TODO: Display the data to the DOM
searchButton.addEventListener('click', function (e) {
    e.preventDefault()
    try {
        let city = searchInput.value
        let current
        let lat = cities[city]['lat']
        let lon = cities[city]['lon']
        let customCall = `?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=imperial&appid=${APIkey}`
        // Grabs data from local storage if it exists
        if (sessionStorage.getItem(city)) {
            todaysWeather.innerHTML = ''
            data = JSON.parse(sessionStorage.getItem(city))
            current = data['current']
            console.log('Retrieved from session storage: ', JSON.parse(sessionStorage.getItem(city)))
            createWeatherCard(city, current.temp, current.wind_speed, current.humidity, current.uvi, current.weather[0].description)
        } else {
            todaysWeather.innerHTML = ''
            fetch(baseUrl + customCall)
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    current = data['current']
                    // If there are weather alerts, they will be displayed
                    if (data['alerts']) {
                        let alerts = data['alerts']
                    }
                    createWeatherCard(city, current.temp, current.wind_speed, current.humidity, current.uvi, current.weather[0].description)
                    sessionStorage.setItem(city, JSON.stringify(data))
                    console.log('Made API call: ', data)
                })

        }
    }
    catch (err) {
        console.log(err)
    }
    searchInput.value = ''
})