// Element Selections
let searchButton = document.getElementById('search')
let cloud = document.getElementById('cloud')
let sun = document.querySelector('div.sun')
let citiesDataList = document.getElementById('cities')
let searchInput = document.getElementById('city-input')
// API Url and Keys
let baseUrl = 'https://api.openweathermap.org/data/2.5/onecall'
let APIkey = '99614a3bd71c4f4912965f0c6b55b111'


// Unix code for today, might not need it
let currentDay = moment().unix()

// City names w lat and lon data 
let cities = { "New York": { "lat": "40.6943", "lon": "-73.9249" }, "Los Angeles": { "lat": "34.1139", "lon": "-118.4068" }, "Chicago": { "lat": "41.8373", "lon": "-87.6862" }, "Miami": { "lat": "25.7839", "lon": "-80.2102" }, "Dallas": { "lat": "32.7936", "lon": "-96.7662" }, "Philadelphia": { "lat": "40.0077", "lon": "-75.1339" }, "Houston": { "lat": "29.7863", "lon": "-95.3889" }, "Atlanta": { "lat": "33.7627", "lon": "-84.4224" }, "Washington": { "lat": "38.9047", "lon": "-77.0163" }, "Boston": { "lat": "42.3188", "lon": "-71.0846" }, "Phoenix": { "lat": "33.5722", "lon": "-112.0891" }, "Seattle": { "lat": "47.6211", "lon": "-122.3244" }, "San Francisco": { "lat": "37.7562", "lon": "-122.4430" }, "Detroit": { "lat": "42.3834", "lon": "-83.1024" }, "San Diego": { "lat": "32.8312", "lon": "-117.1225" }, "Minneapolis": { "lat": "44.9635", "lon": "-93.2678" }, "Tampa": { "lat": "27.9942", "lon": "-82.4451" }, "Denver": { "lat": "39.7621", "lon": "-104.8759" }, "Brooklyn": { "lat": "40.6501", "lon": "-73.9496" }, "Queens": { "lat": "40.7498", "lon": "-73.7976" }, "Riverside": { "lat": "33.9381", "lon": "-117.3948" }, "Baltimore": { "lat": "39.3051", "lon": "-76.6144" }, "Las Vegas": { "lat": "36.2333", "lon": "-115.2654" }, "Portland": { "lat": "45.5372", "lon": "-122.6500" }, "San Antonio": { "lat": "29.4658", "lon": "-98.5253" }, "St. Louis": { "lat": "38.6358", "lon": "-90.2451" }, "Sacramento": { "lat": "38.5667", "lon": "-121.4683" }, "Orlando": { "lat": "28.4772", "lon": "-81.3369" }, "San Jose": { "lat": "37.3019", "lon": "-121.8486" }, "Cleveland": { "lat": "41.4767", "lon": "-81.6804" }, "Pittsburgh": { "lat": "40.4396", "lon": "-79.9762" }, "Austin": { "lat": "30.3004", "lon": "-97.7522" }, "Cincinnati": { "lat": "39.1413", "lon": "-84.5061" }, "Kansas City": { "lat": "39.1239", "lon": "-94.5541" }, "Manhattan": { "lat": "40.7834", "lon": "-73.9662" }, "Indianapolis": { "lat": "39.7771", "lon": "-86.1458" }, "Columbus": { "lat": "39.9862", "lon": "-82.9850" }, "Charlotte": { "lat": "35.2080", "lon": "-80.8304" }, "Virginia Beach": { "lat": "36.7335", "lon": "-76.0435" }, "Bronx": { "lat": "40.8501", "lon": "-73.8662" }, "Milwaukee": { "lat": "43.0642", "lon": "-87.9673" }, "Providence": { "lat": "41.8230", "lon": "-71.4187" }, "Jacksonville": { "lat": "30.3322", "lon": "-81.6749" }, "Salt Lake City": { "lat": "40.7777", "lon": "-111.9306" }, "Nashville": { "lat": "36.1715", "lon": "-86.7843" }, "Richmond": { "lat": "37.5295", "lon": "-77.4756" }, "Memphis": { "lat": "35.1046", "lon": "-89.9773" }, "Raleigh": { "lat": "35.8325", "lon": "-78.6435" }, "New Orleans": { "lat": "30.0687", "lon": "-89.9288" }, "Louisville": { "lat": "38.1663", "lon": "-85.6485" }, "Oklahoma City": { "lat": "35.4676", "lon": "-97.5136" }, "Bridgeport": { "lat": "41.1918", "lon": "-73.1953" }, "Buffalo": { "lat": "42.9016", "lon": "-78.8487" }, "Fort Worth": { "lat": "32.7811", "lon": "-97.3473" }, "Hartford": { "lat": "41.7661", "lon": "-72.6834" }, "Tucson": { "lat": "32.1545", "lon": "-110.8782" }, "Omaha": { "lat": "41.2627", "lon": "-96.0522" }, "El Paso": { "lat": "31.8479", "lon": "-106.4309" }, "Honolulu": { "lat": "21.3294", "lon": "-157.8460" }, "McAllen": { "lat": "26.2273", "lon": "-98.2471" }, "Albuquerque": { "lat": "35.1053", "lon": "-106.6464" }, "Birmingham": { "lat": "33.5277", "lon": "-86.7987" }, "Sarasota": { "lat": "27.3386", "lon": "-82.5431" }, "Dayton": { "lat": "39.7797", "lon": "-84.1998" }, "Rochester": { "lat": "43.1680", "lon": "-77.6162" }, "Fresno": { "lat": "36.7831", "lon": "-119.7941" }, "Allentown": { "lat": "40.5961", "lon": "-75.4756" }, "Tulsa": { "lat": "36.1284", "lon": "-95.9042" }, "Cape Coral": { "lat": "26.6446", "lon": "-81.9956" }, "Concord": { "lat": "37.9722", "lon": "-122.0016" }, "Colorado Springs": { "lat": "38.8674", "lon": "-104.7606" }, "Charleston": { "lat": "32.8153", "lon": "-79.9628" }, "Springfield": { "lat": "42.1155", "lon": "-72.5395" }, "Grand Rapids": { "lat": "42.9620", "lon": "-85.6562" }, "Mission Viejo": { "lat": "33.6095", "lon": "-117.6550" }, "Albany": { "lat": "42.6664", "lon": "-73.7987" }, "Knoxville": { "lat": "35.9692", "lon": "-83.9496" }, "Bakersfield": { "lat": "35.3529", "lon": "-119.0359" }, "Ogden": { "lat": "41.2278", "lon": "-111.9682" }, "Baton Rouge": { "lat": "30.4418", "lon": "-91.1310" }, "Akron": { "lat": "41.0798", "lon": "-81.5219" }, "New Haven": { "lat": "41.3112", "lon": "-72.9246" }, "Columbia": { "lat": "34.0376", "lon": "-80.9037" }, "Mesa": { "lat": "33.4017", "lon": "-111.7180" }, "Palm Bay": { "lat": "27.9550", "lon": "-80.6627" }, "Provo": { "lat": "40.2457", "lon": "-111.6457" } }
for (let i in cities) {
    let optionsElem = document.createElement('option')
    optionsElem.setAttribute('value', i)
    citiesDataList.appendChild(optionsElem)
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
        let customCall = `?lat=${lat}&lon=${lon}&appid=${APIkey}`
        fetch(baseUrl + customCall)
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data)
            })
            cloud.classList.add('away')
            sun.classList.add('away')
    }
    catch(err) {
        console.log(err)
    }
})