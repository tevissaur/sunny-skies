// Element Selections
let searchButton = document.getElementById('search')
let citiesDataList = document.getElementById('cities')
let searchInput = document.getElementById('city-input')
let todaysWeather = document.getElementById('todays-weather')
let forecastEl = document.getElementById('forecast')
let cityForm = document.getElementById('city-form')

// Today's date
let date = moment().format('M/D/YYYY')

// TODO: Create a new button everytime someone searches, possibly with an array?
let searchHistoryButton
let searchHistory = searched => {
    let searchCount = 0
    if (searchCount < 5) {
        searchHistoryButton.classList.add('btn', 'btn-secondary')
        searchHistoryButton.innerText = searched
        searchHistoryButton.addEventListener('click', function(e) {
            e.preventDefault()
            search(history=true)
        })
        cityForm.appendChild(searchHistoryButton)
    }
    else {
        return
    }
}

// API Url and Key
let baseUrl = 'https://api.openweathermap.org/data/2.5/onecall'
let APIkey = '99614a3bd71c4f4912965f0c6b55b111'
let APIcalls = 0


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

// http://openweathermap.org/img/wn/${id}@2x.png
// Generates the weather card for today's weather
function createWeatherCard(city, temp, wind, humidity, UVindex, weather) {
    let paramsArray = [temp, wind, humidity, UVindex, weather]

    // Creating Elements
    let weatherCard = document.createElement('div')
    let cardHeader = document.createElement('div')
    let cardTitle = document.createElement('h2')
    let cardTitleImg = document.createElement('img')
    let cardTitleDate = document.createElement('h4')
    let cardList = document.createElement('ul')

    // Adding classes, textContent and attributes
    weatherCard.classList.add('card', 'my-5', 'm-auto', 'w-75', 'col-12')
    cardHeader.classList.add('card-header', 'row')
    cardTitleImg.classList.add('p-0', 'img-thumbnail')
    cardTitleImg.src = `http://openweathermap.org/img/wn/${weather.icon}.png`
    cardTitleDate.classList.add('card-title', 'col-12')
    cardTitle.classList.add('card-title', 'w-fit-content')
    cardTitle.textContent = city
    cardTitleDate.textContent = date
    cardList.classList.add('list-group', 'list-group-flush', 'row')

    // Append into DOM
    cardHeader.appendChild(cardTitle)
    cardHeader.appendChild(cardTitleImg)
    cardHeader.appendChild(cardTitleDate)
    weatherCard.appendChild(cardHeader)

    // Create list items
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
            listItem.innerHTML = 'UV Index: ' + paramsArray[i]
            listItem.setAttribute('id', 'UVindex')
        }else if (paramsArray[i] === weather) {
            listItem.innerHTML = 'Weather: ' + paramsArray[i].description
        }
        cardList.appendChild(listItem)
    }
    weatherCard.appendChild(cardList)
    todaysWeather.appendChild(weatherCard)
}
function createForecastCards(day, temp, wind, humidity, UVindex, weather) {
    let paramsArray = [temp, wind, humidity, UVindex, weather]
    console.log(day, temp, wind, humidity, UVindex, weather)
    

    // Creating Elements
    let weatherCard = document.createElement('div')
    let cardHeader = document.createElement('div')
    let cardTitleImg = document.createElement('img')
    let cardTitleDate = document.createElement('h4')
    let cardList = document.createElement('ul')

    // Adding classes, textContent and attributes
    weatherCard.classList.add('card', 'm-2', 'm-auto', 'col-sm-12', 'col-md-12', 'col-lg-2')
    cardHeader.classList.add('card-header', 'row')
    cardTitleImg.classList.add('p-0', 'img-thumbnail')
    cardTitleImg.src = `http://openweathermap.org/img/wn/${weather.icon}.png`
    cardTitleDate.classList.add('w-fit-content', 'mb-0', 'mt-1')
    cardTitleDate.textContent = day
    cardList.classList.add('list-group', 'list-group-flush', 'row')

    // Append into DOM
    cardHeader.appendChild(cardTitleDate)
    cardHeader.appendChild(cardTitleImg)
    weatherCard.appendChild(cardHeader)

    // Create list items
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
            listItem.innerHTML = 'UV Index: ' + paramsArray[i]
            listItem.setAttribute('id', 'UVindex')
        }else if (paramsArray[i] === weather) {
            listItem.innerHTML = 'Weather: ' + paramsArray[i].description
        }
        cardList.appendChild(listItem)
    }
    weatherCard.appendChild(cardList)
    forecastEl.appendChild(weatherCard)
}
// TO CONVERT UNIX EPOCH TO MS  =>  timeInS * 1000


function search(history=false) {
    let city
    try {
        if (history) {
            city = searchHistoryButton.innerText
        } else {
            city = searchInput.value
        }
        let current
        let forecast
        let lat = cities[city]['lat']
        let lon = cities[city]['lon']
        let customCall = `?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=imperial&appid=${APIkey}`
        // Grabs data from local storage if it exists
        if (sessionStorage.getItem(city)) {
            todaysWeather.innerHTML = ''
            forecastEl.innerHTML = ''
            data = JSON.parse(sessionStorage.getItem(city))
            current = data['current']
            forecast = data['daily']
            // If there are weather alerts, they will be displayed
            if (data['alerts']) {
                let alerts = data['alerts']
            }
            console.log('Retrieved from session storage: ', JSON.parse(sessionStorage.getItem(city)))
            createWeatherCard(city, current.temp, current.wind_speed, current.humidity, current.uvi, current.weather[0])
            for (let i = 1; i <= 5; i++) {
                let day = moment((forecast[i].dt) * 1000).format('M/D/YYYY')
                createForecastCards(day, forecast[i].temp.day, forecast[i].wind_speed, forecast[i].humidity, forecast[i].uvi, forecast[i].weather[0])
            }
        } else {
            todaysWeather.innerHTML = ''
            forecastEl.innerHTML = ''
            fetch(baseUrl + customCall)
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    current = data['current']
                    forecast = data['daily']
                    // If there are weather alerts, they will be displayed
                    if (data['alerts']) {
                        let alerts = data['alerts']
                    }
                    // Send today's weather
                    createWeatherCard(city, current.temp, current.wind_speed, current.humidity, current.uvi, current.weather[0])
                    // Send the forecast for 5 days
                    for (let i = 1; i <= 5; i++) {
                        let day = moment((forecast[i].dt) * 1000).format('M/D/YYYY')
                        createForecastCards(day, forecast[i].temp.day, forecast[i].wind_speed, forecast[i].humidity, forecast[i].uvi, forecast[i].weather[0])
                    }
                    sessionStorage.setItem(city, JSON.stringify(data))
                    // Need to keep track of amount of calls to API
                    APIcalls++
                    sessionStorage.setItem('APIcalls', APIcalls)
                    console.log(`Made API call #${JSON.parse(sessionStorage.getItem('APIcalls'))}: `, data)
                })

        }
    }
    catch (err) {
        console.log(err)
    }
    searchHistory(city)
    searchInput.value = ''
}
// Sends request
// // TODO: Display the data to the DOM
searchButton.addEventListener('click', function(e) {
    e.preventDefault()
    search()
})