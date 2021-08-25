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


// API Url and Keys
let baseUrl = 'https://api.openweathermap.org/data/2.5/onecall'
let APIkey = '99614a3bd71c4f4912965f0c6b55b111'


// Unix code for today, might not need it
let currentDay = moment().unix()

// City names w lat and lon data 
let cities
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



function createWeatherCard(city, temp, wind, humidity, UVindex, weather) {
    let paramsArray = [temp, wind, humidity, UVindex, weather]
    let weatherCard = document.createElement('div')
    weatherCard.classList.add('card', 'm-5', 'w-50')
    let cardHeader = document.createElement('div')
    cardHeader.classList.add('card-header')
    let cardTitle = document.createElement('h3')
    cardTitle.classList.add('card-title')
    cardTitle.textContent = city
    cardHeader.appendChild(cardTitle)
    weatherCard.appendChild(cardHeader)
    let cardList = document.createElement('ul')
    cardList.classList.add('list-group', 'list-group-flush')
    for (let i in paramsArray) {
        let listItem = document.createElement('li')
        listItem.classList.add('list-group-item')
        listItem.textContent = i
        cardList.appendChild(listItem)
    }
    weatherCard.appendChild(cardList)
    todaysWeather.appendChild(weatherCard)
}
// TO CONVERT UNIX EPOCH TO MS  =>  timeInS * 1000

// Sends request
// TODO: Display the data to the DOM
searchButton.addEventListener('click', function (e) {
    e.preventDefault()
    try {
        let city = searchInput.value
        let lat = cities[city]['lat']
        let lon = cities[city]['lon']
        console.log(city)
        let customCall = `?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${APIkey}`
        fetch(baseUrl + customCall)
            .then(response => {
                return response.json()
            })
            .then(data => {
                // If there are weather alerts, they will be displayed
                if (data['alerts']) {
                    let alerts = data['alerts']
                }
                console.log(data)
            })
    }
    catch (err) {
        console.log(err)
    }
    searchInput.value = ''
})