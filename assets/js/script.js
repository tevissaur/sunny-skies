// Element Selections
let elem = document.getElementById('search')
let cloud = document.getElementById('cloud')
let sun = document.querySelector('div.sun')
let citiesDataList = document.getElementById('cities')
// API Url and Keys
let currentWeatherBaseUrl = 'https://api.openweathermap.org/data/2.5/weather'
let oneCallBaseUrl = 'https://api.openweathermap.org/data/2.5/onecall'
let APIkey = '99614a3bd71c4f4912965f0c6b55b111'
let customWeatherCall = `?q=${city}&appid=${APIkey}`
let customOneCall = `?lat=${lat}&lon=${lon}&appid=${APIkey}`
// Unix code for 
let currentDay = moment().unix()
let cities = {"New York": {"lat": "40.6943", "lon": "-73.9249"}, "Los Angeles": {"lat": "34.1139", "lon": "-118.4068"}, "Chicago": {"lat": "41.8373", "lon": "-87.6862"}, "Miami": {"lat": "25.7839", "lon": "-80.2102"}, "Dallas": {"lat": "32.7936", "lon": "-96.7662"}, "Philadelphia": {"lat": "40.0077", "lon": "-75.1339"}, "Houston": {"lat": "29.7863", "lon": "-95.3889"}, "Atlanta": {"lat": "33.7627", "lon": "-84.4224"}, "Washington": {"lat": "38.9047", "lon": "-77.0163"}, "Boston": {"lat": "42.3188", "lon": "-71.0846"}, "Phoenix": {"lat": "33.5722", "lon": "-112.0891"}, "Seattle": {"lat": "47.6211", "lon": "-122.3244"}, "San Francisco": {"lat": "37.7562", "lon": "-122.4430"}, "Detroit": {"lat": "42.3834", "lon": "-83.1024"}, "San Diego": {"lat": "32.8312", "lon": "-117.1225"}, "Minneapolis": {"lat": "44.9635", "lon": "-93.2678"}, "Tampa": {"lat": "27.9942", "lon": "-82.4451"}, "Denver": {"lat": "39.7621", "lon": "-104.8759"}, "Brooklyn": {"lat": "40.6501", "lon": "-73.9496"}, "Queens": {"lat": "40.7498", "lon": "-73.7976"}, "Riverside": {"lat": "33.9381", "lon": "-117.3948"}, "Baltimore": {"lat": "39.3051", "lon": "-76.6144"}, "Las Vegas": {"lat": "36.2333", "lon": "-115.2654"}, "Portland": {"lat": "45.5372", "lon": "-122.6500"}, "San Antonio": {"lat": "29.4658", "lon": "-98.5253"}, "St. Louis": {"lat": "38.6358", "lon": "-90.2451"}, "Sacramento": {"lat": "38.5667", "lon": "-121.4683"}, "Orlando": {"lat": "28.4772", "lon": "-81.3369"}, "San Jose": {"lat": "37.3019", "lon": "-121.8486"}, "Cleveland": {"lat": "41.4767", "lon": "-81.6804"}, "Pittsburgh": {"lat": "40.4396", "lon": "-79.9762"}, "Austin": {"lat": "30.3004", "lon": "-97.7522"}, "Cincinnati": {"lat": "39.1413", "lon": "-84.5061"}, "Kansas City": {"lat": "39.1239", "lon": "-94.5541"}, "Manhattan": {"lat": "40.7834", "lon": "-73.9662"}, "Indianapolis": {"lat": "39.7771", "lon": "-86.1458"}, "Columbus": {"lat": "39.9862", "lon": "-82.9850"}, "Charlotte": {"lat": "35.2080", "lon": "-80.8304"}, "Virginia Beach": {"lat": "36.7335", "lon": "-76.0435"}, "Bronx": {"lat": "40.8501", "lon": "-73.8662"}, "Milwaukee": {"lat": "43.0642", "lon": "-87.9673"}, "Providence": {"lat": "41.8230", "lon": "-71.4187"}, "Jacksonville": {"lat": "30.3322", "lon": "-81.6749"}, "Salt Lake City": {"lat": "40.7777", "lon": "-111.9306"}, "Nashville": {"lat": "36.1715", "lon": "-86.7843"}, "Richmond": {"lat": "37.5295", "lon": "-77.4756"}, "Memphis": {"lat": "35.1046", "lon": "-89.9773"}, "Raleigh": {"lat": "35.8325", "lon": "-78.6435"}, "New Orleans": {"lat": "30.0687", "lon": "-89.9288"}, "Louisville": {"lat": "38.1663", "lon": "-85.6485"}}
// TO CONVERT UNIX EPOCH TO MS  =>  timeInS * 1000
for (let i  in cities) {
    let optionsElem = document.createElement('options')
    optionsElem.setAttribute('value', i)
    citiesDataList.appendChild(optionsElem)
    console.log(i, cities[i])
}
// fetch(currentWeatherBaseUrl + customWeatherCall)
//     .then(response => {
//         return response.json()
//     })
//     .then(data => {
//         console.log(data)
//     })

// fetch(oneCallBaseUrl + customOneCall)
//     .then(response => {
//         return response.json()
//     })
//     .then(data => {
//         console.log(data)
//     })



// // Sends request
// elem.addEventListener('click', function (e) {
//     e.preventDefault()

//     // Put in then() function after fetch is recieved
//     cloud.classList.toggle('away')
//     sun.classList.toggle('away')
//     sun.animat
// })